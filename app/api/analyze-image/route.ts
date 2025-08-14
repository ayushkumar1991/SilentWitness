import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// Sleep helper
const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

// Extract retryDelay (in seconds) from Gemini API error details (RetryInfo)
function getRetryDelayMs(error: any, attempt: number) {
  // Default backoff: 2^attempt seconds with jitter, capped at 30s
  const baseMs = Math.min(1000 * Math.pow(2, attempt), 30_000);
  const jitter = Math.floor(Math.random() * 500);

  try {
    const details = error?.errorDetails || error?.details || error?.cause || [];
    // Gemini returns an array with objects including type google.rpc.RetryInfo
    const retryInfo = Array.isArray(details)
      ? details.find((d: any) => d?.["@type"]?.toString().includes("RetryInfo"))
      : undefined;
    if (retryInfo?.retryDelay) {
      // retryDelay like "20s" or "1.5s"
      const match = String(retryInfo.retryDelay).match(/([\d.]+)s/);
      if (match) {
        const serverMs = Math.max(0, Math.floor(parseFloat(match[1]) * 1000));
        // Respect server hint, add small jitter
        return serverMs + jitter;
      }
    }
  } catch {
    // fall through to default
  }
  return baseMs + jitter;
}

export async function POST(request: Request) {
  try {
    const { image } = await request.json();

    if (!image || typeof image !== "string" || !image.includes(",")) {
      return NextResponse.json(
        { error: "Invalid image payload" },
        { status: 400 }
      );
    }

    const [prefix, b64] = image.split(",");
    // Infer MIME if possible, default to jpeg for compatibility
    const mime =
      prefix.includes("image/") && prefix.includes(";base64")
        ? prefix.slice(prefix.indexOf(":") + 1, prefix.indexOf(";"))
        : "image/jpeg";

    // Trim whitespace/newlines from base64 to avoid invalid data
    const base64Data = (b64 || "").trim();
    if (!base64Data) {
      return NextResponse.json(
        { error: "Empty image data" },
        { status: 400 }
      );
    }

    // Use a Flash model with higher free-tier quotas
    // Alternatives: "gemini-2.5-flash-lite" for even more throughput, or enable billing for Pro
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); // higher free-tier headroom[7][10]

    const prompt =
      "Analyze this emergency situation image and respond in this exact format without any asterisks or bullet points:\n" +
      "TITLE: Write a clear, brief title\n" +
      "TYPE: Choose one (Theft, Fire Outbreak, Medical Emergency, Natural Disaster, Violence, or Other)\n" +
      "DESCRIPTION: Write a clear, concise description";

    // Retry generateContent on 429 RESOURCE_EXHAUSTED, honoring RetryInfo
    const maxRetries = 4;
    let lastError: any = null;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const result = await model.generateContent([
          prompt,
          {
            inlineData: {
              data: base64Data,
              mimeType: mime,
            },
          },
        ]);

        const text = await result.response.text();

        // Robust parsing across possible line breaks
        const titleMatch = text.match(/TITLE:\s*([^\n\r]+)/i);
        const typeMatch = text.match(/TYPE:\s*([^\n\r]+)/i);
        const descMatch = text.match(/DESCRIPTION:\s*([\s\S]+)/i);

        return NextResponse.json({
          title: titleMatch?.[1]?.trim() || "",
          reportType: typeMatch?.[1]?.trim() || "",
          description: descMatch?.[1]?.trim() || "",
        });
      } catch (err: any) {
        lastError = err;

        // Detect 429/RESOURCE_EXHAUSTED and retry
        const status =
          err?.status ||
          err?.response?.status ||
          err?.code ||
          err?.errorCode ||
          "";
        const message = String(err?.message || "");

        const is429 =
          status === 429 ||
          message.includes("429") ||
          message.toLowerCase().includes("too many requests") ||
          message.toLowerCase().includes("resource exhausted");

        if (is429 && attempt < maxRetries) {
          const delay = getRetryDelayMs(err, attempt);
          await sleep(delay);
          continue;
        }

        // Non-retryable or retries exhausted: break loop
        break;
      }
    }

    // If we land here, we failed after retries
    const isQuota =
      String(lastError?.message || "")
        .toLowerCase()
        .includes("quota") ||
      String(lastError?.message || "")
        .toLowerCase()
        .includes("too many requests") ||
      String(lastError?.message || "")
        .toLowerCase()
        .includes("resource exhausted");

    return NextResponse.json(
      {
        error: isQuota
          ? "Rate limit exceeded. Please try again shortly."
          : "Failed to analyze image",
      },
      { status: isQuota ? 429 : 500 }
    );
  } catch (error) {
    console.error("Image analysis error:", error);
    return NextResponse.json(
      { error: "Failed to analyze image" },
      { status: 500 }
    );
  }
}
