# FormGenie design system: "Editorial Paper", engineered

FormGenie is a form product: describe a form in plain language, it takes shape, you publish it, responses arrive.
The interface is warm paper, near-black ink, and one ink-blue accent. This document is the system behind it,
written so every screen, interaction, spacing decision, type decision and motion moment is made the same way.

**Creative north star: the form takes shape as you speak.** The product's own moment (describe, compose,
publish) is the hero of the marketing site and the signature of the app. Nothing decorative is added on top
of it.

## Principles

1. **The product is the hero.** The homepage demonstrates the real product: the same `FormRenderer`, the
   same field controls, the same responses table. No fake screenshots built from rectangles, no invented
   testimonials, no invented numbers. Sample data says it is sample data.
2. **Type has roles.** Fraunces speaks: the hero statement, one statement per marketing section, the
   respondent's form title, and "Your form is live." Inter works: everything read to decide or act, which is
   navigation, buttons, labels, field labels, tables, counts and the whole app. Every count is tabular.
3. **Surfaces, not cards.** Hairlines and space separate. A box appears only where a real object exists: the
   form itself (a sheet of paper), and layers that have left the page (dialogs, sheets, menus). Shadows belong
   to those two only. Radius: 8px on controls, 12px on panels, 16px on the sheet.
4. **Motion has jobs.** Five devices: `fg-in` (content arrives, 10px), `fg-wipe` (statements only),
   `fg-draw` (a rule draws across), `fg-compose` (fields compose into a form), and the compose line (a
   hairline drawing left to right with named states, in place of every spinner). Everything is transform,
   opacity and clip-path; entrances ease out; UI under 300ms; open is deliberate and close is quick; hover is
   an enhancement gated behind a fine pointer; reduced motion collapses everything to a 180ms fade.
5. **States are engineered.** Loading matches the final layout. Empty states say what to do next. Errors
   say what to do, beside the thing that needs doing, and never move the form. Working is not disabled:
   a control that is busy says so with `aria-busy` and keeps its colour. Success takes focus and says what
   has happened and what has not.
6. **Mobile is a composition.** Bottom sheets where a thumb is, side panels where a cursor is. The primary
   action is never below the fold inside a layer. 44px targets. The app's navigation is a bottom bar on a
   phone and a sidebar on a desktop.
7. **Copy is part of the system.** One label per intent: "Start building" enters the product, "Publish"
   publishes, "Share" shares, "View responses" opens responses. No em dashes or en dashes anywhere visible.
   At most one small uppercase label per section, and never one above every heading.

## Tokens

Defined CSS-first in `src/index.css` (Tailwind v4 `@theme`), light and dark.

- **Colour**: `--bg` paper, `--surface` sheet, `--surface-sunken`, `--ink`, `--ink-muted`, `--ink-faint`,
  `--border`, `--border-strong`, `--accent` (#2b4acb light, #7f93f6 dark), `--accent-soft`, plus
  success / warning / danger with soft variants. Nothing that carries meaning is under 4.5:1.
- **Type scale** (fluid): `display` clamp(2.5rem, 5.2vw, 4.5rem); `statement` clamp(1.875rem, 3vw, 2.75rem);
  `title` clamp(1.5rem, 2.2vw, 2rem); `h2` clamp(1.25rem, 1.6vw, 1.5rem); `h3` 1.0625rem; `lead`
  clamp(1.0625rem, 1.05vw, 1.1875rem); `body` 1rem; `ui` 0.9375rem; `small` 0.875rem; `label` 0.75rem
  uppercase tracked. Figures: tabular, 500 to 600.
- **Layout**: `--gutter` clamp(1.25rem, 4vw, 4rem); `--section` clamp(4.5rem, 8vw, 7.5rem); frame 80rem
  (marketing), 72rem (app). 12 columns at `lg`, one column below with an explicit order.
- **Motion**: `--ease-out` cubic-bezier(0.23, 1, 0.32, 1); `--ease-in-out` cubic-bezier(0.77, 0, 0.175, 1);
  `--ease-drawer` cubic-bezier(0.32, 0.72, 0, 1); `--ease-soft` cubic-bezier(0.2, 0.65, 0.25, 1);
  `--dur-fast` 140ms, `--dur-base` 240ms, `--dur-slow` 420ms, `--dur-long` 700ms. Press: scale(0.985).

## Journeys

- **Land**: statement, one line, one action, and the product composing a form beside it. Every example
  prompt is clickable; a visitor can type their own and carry it into the builder.
- **Understand**: three steps in a minute; change it by asking (a live amendment); every answer in one table;
  every field type, working; questions answered; one closing line.
- **Enter**: sign in on a page that still looks like FormGenie, then the app in the same paper and ink.
- **Build**: a conversation on the left, the form as a sheet on the right. Generation is a compose line
  with named states; the previous form stays visible while a change is made; new and changed fields are
  marked when they land. Publish opens one dialog, and success shows the link, not the public page.
- **Share and read**: a public form that is the same sheet; a thank-you that takes focus; responses in a
  table with search, sort and pages.

## Verification

`npm run build` (tsc + vite) and `npm run lint` must pass. Walk the landing page, sign-in, dashboard,
forms, builder, responses and the public form at 390 and 1440, light and dark, and with reduced motion.
