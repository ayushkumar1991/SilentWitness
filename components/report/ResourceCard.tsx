import Link from "next/link";

interface ResourceCardProps {
  title: string;
  description: string;
  link: string;
  icon: string; // Emoji or icon URL
}

export const ResourceCard = ({ title, description, link, icon }: ResourceCardProps) => {
  return (
    <div className="bg-zinc-900/50 rounded-2xl border border-white/5 p-6 hover:border-sky-500/20 transition-colors">
      <div className="flex items-center gap-4">
        <div className="text-2xl">{icon}</div>
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>
      <p className="mt-2 text-zinc-400">{description}</p>
      <Link
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center text-sky-400 hover:text-sky-300"
      >
        Learn More
        <svg
          className="w-4 h-4 ml-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      </Link>
    </div>
  );
};