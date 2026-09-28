import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const demo = z.object({
  // youtube: `src` is the video id · video: an mp4/webm path · iframe: any URL
  // (Observable, Hugging Face Space, or a static build in /public/demos/<name>/)
  kind: z.enum(['youtube', 'video', 'iframe']),
  src: z.string(),
  title: z.string().optional(),
  poster: z.string().optional(),
  aspect: z.string().optional(), // CSS aspect-ratio, e.g. "16 / 9"
  caption: z.string().optional(),
  live: z.boolean().optional(), // true = interactive demo (shows a "Live demo" badge)
});

const projects = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    summary: z.string(),
    theme: z.enum(['generative-interpretability', 'llm-behavior', 'scientific-vis']),
    venues: z.array(z.string()).default([]),
    year: z.number(),
    status: z.enum(['published', 'under-review', 'ongoing', 'internship']).default('published'),
    featured: z.boolean().default(false),
    order: z.number().default(100),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    coverPosition: z.string().optional(), // CSS object-position for card crops
    links: z
      .object({
        paper: z.string().optional(),
        arxiv: z.string().optional(),
        code: z.string().optional(),
        video: z.string().optional(),
        demo: z.string().optional(),
      })
      .default({}),
    demo: demo.optional(),
  }),
});

const notes = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, notes };
