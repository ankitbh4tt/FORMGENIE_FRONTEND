import type { FormField } from "@/components/form-fields/types";
import type { ResponseRow } from "@/components/responses/ResponsesTable";

/**
 * Everything the homepage demonstrates, in one place. The examples are real
 * schemas rendered by the real renderer; the responses are sample data and say so.
 */

export interface DemoExample {
  id: string;
  label: string;
  prompt: string;
  title: string;
  fields: FormField[];
}

export const EXAMPLES: DemoExample[] = [
  {
    id: "contact",
    label: "Contact form",
    prompt: "A contact form with name, email, the service they need, and a message.",
    title: "Get in touch",
    fields: [
      { label: "Full name", type: "text", required: true },
      { label: "Email address", type: "email", required: true },
      { label: "Service", type: "select", options: ["Design", "Engineering", "Consulting"] },
      { label: "Message", type: "textarea" },
    ],
  },
  {
    id: "rsvp",
    label: "Event RSVP",
    prompt: "An RSVP for our launch dinner: name, email, how many guests, and whether they can make it.",
    title: "You are invited",
    fields: [
      { label: "Your name", type: "text", required: true },
      { label: "Email address", type: "email", required: true },
      { label: "Number of guests", type: "select", options: ["Just me", "2", "3", "4 or more"] },
      { label: "I can make it", type: "checkbox" },
    ],
  },
  {
    id: "feedback",
    label: "Feedback survey",
    prompt: "A short feedback survey with a star rating, what went well, the date of the visit, and an optional email.",
    title: "How did we do?",
    fields: [
      { label: "Overall rating", type: "rating", required: true },
      { label: "What went well?", type: "textarea" },
      { label: "Date of visit", type: "date" },
      { label: "Email address", type: "email" },
    ],
  },
  {
    id: "job",
    label: "Job application",
    prompt: "A job application with the role, a portfolio link, and a short introduction.",
    title: "Apply to join us",
    fields: [
      { label: "Full name", type: "text", required: true },
      { label: "Role", type: "select", options: ["Frontend", "Backend", "Design"], required: true },
      { label: "Portfolio link", type: "text" },
      { label: "Tell us about yourself", type: "textarea" },
    ],
  },
];

export const REFINE = {
  title: "Get in touch",
  before: [
    { label: "Full name", type: "text", required: true },
    { label: "Email address", type: "email" },
    { label: "Message", type: "textarea" },
  ] as FormField[],
  request: "Make email required and add a phone number after it.",
  reply: "Done. Email address is now required, and there is a phone number field after it.",
  after: [
    { label: "Full name", type: "text", required: true },
    { label: "Email address", type: "email", required: true },
    { label: "Phone number", type: "text" },
    { label: "Message", type: "textarea" },
  ] as FormField[],
};

export const SAMPLE_FIELDS = ["Full name", "Email address", "Service", "Message"];

export const SAMPLE_RESPONSES: ResponseRow[] = [
  {
    id: "r1",
    createdAt: "2026-08-28T09:14:00Z",
    values: {
      "Full name": "Ines Caetano",
      "Email address": "ines@studiocaetano.pt",
      Service: "Design",
      Message: "We are redoing our onboarding and would like a second pair of eyes.",
    },
  },
  {
    id: "r2",
    createdAt: "2026-08-28T15:42:00Z",
    values: {
      "Full name": "Ravi Menon",
      "Email address": "ravi.menon@nimbuslabs.in",
      Service: "Engineering",
      Message: "Looking for help moving a Django app to a managed database.",
    },
  },
  {
    id: "r3",
    createdAt: "2026-08-29T08:03:00Z",
    values: {
      "Full name": "Hanna Lindqvist",
      "Email address": "hanna@lindqvist.se",
      Service: "Consulting",
      Message: "Could we book a call next week about pricing?",
    },
  },
  {
    id: "r4",
    createdAt: "2026-08-30T11:27:00Z",
    values: {
      "Full name": "Tomás Herrera",
      "Email address": "tomas@herrera.mx",
      Service: "Design",
      Message: "",
    },
  },
  {
    id: "r5",
    createdAt: "2026-08-31T17:55:00Z",
    values: {
      "Full name": "Aiko Tanaka",
      "Email address": "aiko.t@kumo.jp",
      Service: "Engineering",
      Message: "Our checkout is slow on phones. Happy to share a recording.",
    },
  },
  {
    id: "r6",
    createdAt: "2026-09-01T07:31:00Z",
    values: {
      "Full name": "Kwame Mensah",
      "Email address": "kwame@mensah.gh",
      Service: "Consulting",
      Message: "We need a short audit before the next round.",
    },
  },
];

export const FIELD_TYPES: FormField[] = [
  { label: "Short text", type: "text" },
  { label: "Email", type: "email" },
  { label: "Number", type: "number" },
  { label: "Date", type: "date" },
  { label: "Dropdown", type: "select", options: ["Small", "Medium", "Large"] },
  { label: "Checkbox", type: "checkbox" },
  { label: "Multiple choice", type: "radio", options: ["Morning", "Afternoon"] },
  { label: "Rating", type: "rating" },
  { label: "File upload", type: "file" },
  { label: "Long text", type: "textarea" },
];

export const FAQS = [
  {
    q: "Do I need to know how to build forms?",
    a: "No. You describe what you want in plain language and FormGenie composes the fields, labels and types. If something is not right, you say so and it changes.",
  },
  {
    q: "What kinds of fields are supported?",
    a: "Short text, email, numbers, dates, dropdowns, checkboxes, multiple choice, long text, ratings and file uploads. That covers almost any form.",
  },
  {
    q: "How do people respond to my form?",
    a: "Every published form gets a clean public link. Send it anywhere. Responses appear in your dashboard the moment they are submitted.",
  },
  {
    q: "Is my data private?",
    a: "Your forms and responses live behind sign-in and are only visible from your own dashboard. Respondents only ever see the form itself.",
  },
  {
    q: "Can I change a form after publishing?",
    a: "Yes. Open it in the builder, ask for the change, and publish again. The link stays the same.",
  },
];
