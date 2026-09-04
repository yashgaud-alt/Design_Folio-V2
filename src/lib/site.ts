export const categories = [
  "All",
  "Motion",
  "Product",
  "Explainer",
  "Practice",
] as const;

export type Category = (typeof categories)[number];
export type WorkCategory = Exclude<Category, "All">;

export type Work = {
  slug: string;
  title: string;
  year: string;
  duration: string;
  categories: WorkCategory[];
  vimeoId: string;
  still: string;
  blurb: string;
  description: string;
  role: string;
};

export const profile = {
  name: "Yash Gaud",
  shortName: "Yash",
  role: "Motion designer & video editor",
  email: "yushgaud@gmail.com",
  vimeo: "https://vimeo.com/user258086591",
  philosophy: "Designing just enough",
  bio: "This is Yash. Currently a motion designer and a video editor. Primarily working on infographics and explainers. I am a big believer in high autonomy and communication. Staying with others throughout the project from beginning to the end.",
  socials: [
    { label: "Vimeo", href: "https://vimeo.com/user258086591" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/yashgaud" },
  ],
} as const;

export const works: Work[] = [
  {
    slug: "memos",
    title: "Memos",
    year: "2026",
    duration: "0:33",
    categories: ["Motion", "Product", "Practice"],
    vimeoId: "1216600166",
    still: "/works/memos.jpg",
    blurb:
      "Practice motion on a notes-app interface — timing, hierarchy, and restraint.",
    description:
      "A personal practice piece exploring motion and interaction against the Memos app interface. It is not commissioned work, and was not made for or with Memos. The UI is from the real product, used here only to study timing, hierarchy, and when to stop.",
    role: "Motion design",
  },
  {
    slug: "root-ai",
    title: "Root AI",
    year: "2026",
    duration: "0:31",
    categories: ["Motion", "Product"],
    vimeoId: "1213300072",
    still: "/works/root-ai.jpg",
    blurb:
      "A thirty-second product demo. Type, UI, and pacing for an AI surface.",
    description:
      "A short demo cut for Root AI. The job is to make a product feel inevitable in half a minute — type, interface motion, and no spare frames. Start to finish: idea, motion, edit.",
    role: "Motion design & edit",
  },
  {
    slug: "entry-level-jobs",
    title: "Entry Level Job Crises",
    year: "2026",
    duration: "0:49",
    categories: ["Motion", "Explainer"],
    vimeoId: "1204426063",
    still: "/works/entry-level.jpg",
    blurb:
      "Explainer on the junior-job crunch. Infographic motion, no leftover frames.",
    description:
      "An explainer on the entry-level job crunch. Infographic sequences, editorial pacing, and a start-to-finish cut from idea to published video. The picture only earns a place if it carries the argument.",
    role: "Motion design, edit, writing",
  },
];

export const skills = [
  { en: "Motion design", note: "Timing, type, interface animation" },
  { en: "Video editing", note: "Pace, cut, and sound" },
  { en: "Infographics", note: "Density, turned into sequence" },
  { en: "Explainers", note: "One idea. No leftover frames" },
  { en: "Writing", note: "Structure before pictures" },
  { en: "Production", note: "From first note to published cut" },
] as const;

export const nav = [
  { href: "work", label: "Work" },
  { href: "about", label: "About" },
  { href: "skills", label: "Skills" },
  { href: "contact", label: "Contact" },
] as const;

export function getWork(slug: string) {
  return works.find((work) => work.slug === slug);
}

export function neighbors(slug: string) {
  const index = works.findIndex((work) => work.slug === slug);
  if (index < 0) return { prev: undefined, next: undefined };
  return {
    prev: works[index - 1],
    next: works[index + 1],
  };
}
