"use client";

import { useState } from "react";
import { ReportForm } from "./ReportForm";
import { ReportSubmitted } from "./ReportFormCompleted";

export function ReportWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  interface ReportData {
    // define the structure of your report data here
    [key: string]: unknown;
  }

  const [reportData, setReportData] = useState<ReportData>({});

  const handleStepComplete = async (data: unknown) => {
    if (typeof data === 'object' && data !== null) {
      setReportData({ ...reportData, ...data });
    }

    if (currentStep === 4) {
      return;
    }

    setCurrentStep((prev) => prev + 1);
  };

  return (
    <div className="rounded-2xl bg-zinc-900 p-8">
      {currentStep === 1 && <ReportForm onComplete={handleStepComplete} />}
      {currentStep === 2 && (
        <ReportSubmitted data={reportData} onComplete={handleStepComplete} />
      )}
    </div>
  );
}