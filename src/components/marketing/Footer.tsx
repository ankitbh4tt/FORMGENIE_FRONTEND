import { Link } from "react-router-dom";
import { Wordmark } from "@/components/common/Logo";

const LINKS = [
  { label: "How it works", href: "#how" },
  { label: "Fields", href: "#fields" },
  { label: "FAQ", href: "#faq" },
];

/** A restrained footer. Every link leads somewhere real. */
export function Footer() {
  return (
    <footer className="hairline">
      <div className="frame grid gap-x-10 gap-y-8 py-12 md:grid-cols-12 md:py-14">
        <div className="md:col-span-5">
          <Link to="/" className="flex h-11 w-fit items-center rounded-control" aria-label="FormGenie home">
            <Wordmark />
          </Link>
          <p className="mt-3 max-w-[32ch] text-ui text-ink-muted">
            Describe a form in plain language. Publish it in a click. Read every answer in one calm place.
          </p>
        </div>

        <nav aria-label="Footer" className="md:col-span-3 md:col-start-7">
          <ul className="flex flex-col">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="link-quiet inline-flex min-h-10 items-center text-ui text-ink-muted hover:text-ink">
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <Link to="/dashboard" className="link-quiet inline-flex min-h-10 items-center text-ui text-ink-muted hover:text-ink">
                Sign in
              </Link>
            </li>
          </ul>
        </nav>

        <p className="text-small text-ink-faint md:col-span-12 md:border-t md:border-border md:pt-6">
          © {new Date().getFullYear()} FormGenie. A portfolio project.
        </p>
      </div>
    </footer>
  );
}
