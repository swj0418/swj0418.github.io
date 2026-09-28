// Site-wide profile. Most edits to "who I am" happen here.

export const site = {
  name: 'Sangwon Jeong',
  wordmark: 'sangwon jeong',
  title: 'Sangwon Jeong — Interpretability & LLM Evaluation',
  description:
    'PhD candidate at Vanderbilt University working on interpretability of generative models, LLM evaluation and forecasting, and visual analytics systems.',

  // One sentence, shown large on the home page.
  tagline:
    'I study what generative models represent, and build tools that make their behavior observable.',

  // Short bio paragraphs on the home page (plain text).
  bio: [
    'I’m a PhD candidate in Computer Science at Vanderbilt University, advised by Matthew Berger. My research sits between interpretability and visual analytics: concept-based methods for identifying, comparing, and steering semantic directions in GANs and diffusion models, and evaluation frameworks that measure — and forecast — how LLMs behave on structured outputs.',
    'My work has appeared in IEEE TVCG, IEEE VIS, and EuroVis. Before my PhD I co-founded a mobile startup and worked on NLP and computer vision for construction documents.',
  ],

  // Set `show: false` to hide the job-market line everywhere.
  jobMarket: {
    show: true,
    text: 'On the job market for Research & Applied Scientist roles in interpretability, LLM evaluation, and AI safety — graduating December 2026.',
  },

  // Optional headshot, e.g. '/images/headshot.jpg' (square, ≥ 400px). Leave null to hide.
  photo: null as string | null,

  email: 'sangwon.jeong@yahoo.com',
  links: {
    scholar: 'https://scholar.google.com/citations?user=LXQm0kYAAAAJ',
    github: 'https://github.com/swj0418',
    linkedin: 'https://www.linkedin.com/in/top1jeong/',
    cv: '/cv.pdf',
  },

  // The name as it appears in author lists; it gets highlighted.
  selfNames: ['Sangwon Jeong', 'S. Jeong'],
};

export const themes = [
  {
    id: 'generative-interpretability',
    title: 'Interpreting generative models',
    blurb:
      'Concept-based methods and visual analytics for finding, comparing, and steering semantic directions in GANs and diffusion models.',
  },
  {
    id: 'llm-behavior',
    title: 'Forecasting & evaluating LLM behavior',
    blurb:
      'Measuring what LLMs produce on structured outputs — and predicting it from hidden states before generation.',
  },
  {
    id: 'scientific-vis',
    title: 'Visualization systems for science',
    blurb:
      'Language-driven volume rendering and visual analytics for generative-model-driven discovery.',
  },
] as const;

export type ThemeId = (typeof themes)[number]['id'];
