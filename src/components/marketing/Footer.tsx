import { useNavigate } from "react-router-dom";
import { Wordmark } from "@/components/common/Logo";

const COLUMNS = [
  {
    heading: "Product",
    links: [
      { label: "How it works", href: "#how" },
      { label: "Features", href: "#features" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
    ],
  },
];

export function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="border-t border-border px-5 py-14 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 sm:flex-row sm:justify-between">
        <div className="max-w-xs">
          <button
            onClick={() => navigate("/")}
            className="rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <Wordmark />
          </button>
          <p className="mt-4 text-sm leading-relaxed text-ink-muted">
            Describe a form in plain English. Publish it instantly. Collect every
            response in one calm place.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-10 sm:gap-16">
          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <h3 className="text-[13px] font-medium text-ink">{col.heading}</h3>
              <ul className="mt-3 flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm text-ink-muted transition-colors hover:text-ink"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-border pt-6 sm:flex-row">
        <p className="text-[13px] text-ink-faint">
          © {new Date().getFullYear()} FormGenie. A portfolio project.
        </p>
        <p className="text-[13px] text-ink-faint">
          Designed &amp; built with care.
        </p>
      </div>
    </footer>
  );
}
