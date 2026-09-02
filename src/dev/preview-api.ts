/**
 * A fake backend for looking at the app without an account. Development only:
 * it is wired in by `isPreviewMode()` and never reaches a production build.
 * Open any app route with `?preview=1` (or `?preview=empty` for the first-visit
 * states) and every call the frozen API makes is answered from here.
 */
import type { FormField } from "@/components/form-fields/types";

const KEY = "formgenie-preview";

export function isPreviewMode(): boolean {
  if (!import.meta.env.DEV || typeof window === "undefined") return false;
  const q = new URLSearchParams(window.location.search).get("preview");
  if (q) sessionStorage.setItem(KEY, q);
  return !!sessionStorage.getItem(KEY);
}

const empty = () => sessionStorage.getItem(KEY) === "empty";

const CONTACT: FormField[] = [
  { label: "Full name", type: "text", required: true },
  { label: "Email address", type: "email", required: true },
  { label: "Service", type: "select", options: ["Design", "Engineering", "Consulting"] },
  { label: "Message", type: "textarea" },
];

const AMENDED: FormField[] = [
  { label: "Full name", type: "text", required: true },
  { label: "Email address", type: "email", required: true },
  { label: "Phone number", type: "text" },
  { label: "Service", type: "select", options: ["Design", "Engineering", "Consulting"], required: true },
  { label: "Message", type: "textarea" },
];

const FORMS = [
  { formId: "f1", title: "Get in touch", description: "The contact form on the studio site.", createdAt: "2026-08-12T10:00:00Z", schema: CONTACT },
  { formId: "f2", title: "Launch dinner RSVP", description: "Name, email, guests, and whether they can make it.", createdAt: "2026-08-20T10:00:00Z", schema: CONTACT.slice(0, 3) },
  { formId: "f3", title: "Workshop feedback", createdAt: "2026-08-29T10:00:00Z", schema: CONTACT.slice(0, 2) },
];

const RESPONSES = [
  ["Ines Caetano", "ines@studiocaetano.pt", "Design", "We are redoing our onboarding and would like a second pair of eyes."],
  ["Ravi Menon", "ravi.menon@nimbuslabs.in", "Engineering", "Looking for help moving a Django app to a managed database."],
  ["Hanna Lindqvist", "hanna@lindqvist.se", "Consulting", "Could we book a call next week about pricing?"],
  ["Tomás Herrera", "tomas@herrera.mx", "Design", ""],
  ["Aiko Tanaka", "aiko.t@kumo.jp", "Engineering", "Our checkout is slow on phones. Happy to share a recording."],
  ["Kwame Mensah", "kwame@mensah.gh", "Consulting", "We need a short audit before the next round."],
].map(([name, email, service, message], i) => ({
  responseId: `r${i + 1}`,
  createdAt: new Date(Date.UTC(2026, 7, 26 + i, 9 + i, 14)).toISOString(),
  responses: [
    { label: "Full name", value: name },
    { label: "Email address", value: email },
    { label: "Service", value: service },
    { label: "Message", value: message },
  ],
}));

const STATS = {
  totalForms: 3,
  totalResponses: 47,
  totalFields: 11,
  averageFieldsPerForm: 3.7,
  recentForms: FORMS.map((f) => ({ formId: f.formId, title: f.title, createdAt: f.createdAt, fieldCount: f.schema.length })),
  recentResponses: RESPONSES.slice(0, 3).map((r) => ({ responseId: r.responseId, formTitle: "Get in touch", createdAt: r.createdAt, responseCount: 4 })),
  formsByMonth: [
    { month: "Apr", count: 0 },
    { month: "May", count: 1 },
    { month: "Jun", count: 0 },
    { month: "Jul", count: 1 },
    { month: "Aug", count: 1 },
  ],
  responsesByMonth: [
    { month: "Apr", count: 0 },
    { month: "May", count: 6 },
    { month: "Jun", count: 9 },
    { month: "Jul", count: 14 },
    { month: "Aug", count: 18 },
  ],
  mostActiveForm: { formId: "f1", title: "Get in touch", responseCount: 31 },
};

const EMPTY_STATS = {
  totalForms: 0,
  totalResponses: 0,
  totalFields: 0,
  averageFieldsPerForm: 0,
  recentForms: [],
  recentResponses: [],
  formsByMonth: [],
  responsesByMonth: [],
  mostActiveForm: null,
};

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });
}

let installed = false;

/** Answers the frozen API from memory. Installs once. */
export function installPreviewApi() {
  if (installed || typeof window === "undefined") return;
  installed = true;
  const real = window.fetch.bind(window);

  window.fetch = async (input, init) => {
    const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
    const path = url.includes("/api/v1/") ? url.slice(url.indexOf("/api/v1/")) : null;
    if (!path) return real(input, init);
    const method = (init?.method ?? "GET").toUpperCase();

    if (path === "/api/v1/dashboard/stats") return json({ success: true, data: empty() ? EMPTY_STATS : STATS });
    if (path === "/api/v1/forms/all") return json({ success: true, forms: empty() ? [] : FORMS });
    if (path.startsWith("/api/v1/forms/public/")) {
      await delay(500);
      return json({ success: true, form: { title: "Get in touch", description: "Tell us a little about what you need and we will write back within a day.", schema: CONTACT } });
    }
    if (path.startsWith("/api/v1/responses/responses/")) return json({ success: true, responses: empty() ? [] : RESPONSES });
    if (path.startsWith("/api/v1/responses/submit/")) {
      await delay(900);
      return json({ success: true });
    }
    if (path === "/api/v1/ai/generate-form" && method === "POST") {
      await delay(2600);
      return json({ success: true, sessionId: "preview-session", schema: CONTACT });
    }
    if ((path === "/api/v1/ai/amend-form" || path === "/api/v1/ai/amend-session") && method === "POST") {
      await delay(2200);
      return json({ success: true, sessionId: "preview-session", schema: AMENDED });
    }
    if (path.startsWith("/api/v1/ai/session/")) return json({ success: true, schema: CONTACT });
    if (path === "/api/v1/forms/save-form") {
      await delay(800);
      return json({ success: true, formId: "f1" });
    }
    if (path.startsWith("/api/v1/forms/delete/")) return json({ success: true });
    if (path.startsWith("/api/v1/forms/amend/")) return json({ success: true, sessionId: "preview-session", form: { schema: CONTACT } });
    return json({ success: false, error: `No preview answer for ${path}` }, 404);
  };
}
