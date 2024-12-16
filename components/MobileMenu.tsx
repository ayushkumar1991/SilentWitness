import Link from "next/link";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Menu content */}
      <div className="fixed right-0 top-0 h-full w-64 bg-zinc-900 p-6 shadow-xl">
        <div className="flex flex-col space-y-6">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-white"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <nav className="flex flex-col space-y-4">
            <Link
              href="/submit-report"
              className="text-sm text-zinc-400 hover:text-white transition-colors"
              onClick={onClose}
            >
              Submit Report
            </Link>
            <Link
              href="/track-report"
              className="text-sm text-zinc-400 hover:text-white transition-colors"
              onClick={onClose}
            >
              Track Report
            </Link>
            <Link
              href="/how-it-works"
              className="text-sm text-zinc-400 hover:text-white transition-colors"
              onClick={onClose}
            >
              How It Works
            </Link>
            <Link
              href="/resources"
              className="text-sm text-zinc-400 hover:text-white transition-colors"
              onClick={onClose}
            >
              Resources
            </Link>
            <Link
              href="/contact"
              className="text-sm text-zinc-400 hover:text-white transition-colors"
              onClick={onClose}
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}