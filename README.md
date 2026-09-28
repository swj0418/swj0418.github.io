# swj0418.github.io

Personal site of Sangwon Jeong — built with [Astro](https://astro.build), deployed to GitHub Pages by GitHub Actions.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static site in dist/
```

## Where things live

| To change… | Edit |
|---|---|
| Name, tagline, bio, links, job-market line, headshot | `src/config.ts` |
| Research themes | `src/config.ts` → `themes` |
| Publications (feeds Publications, CV, project pages, BibTeX) | `src/data/publications.ts` |
| News | `src/data/news.ts` |
| Teaching | `src/data/teaching.ts` |
| CV page (HTML) | `src/data/cv.ts` · PDF: `public/cv.pdf` |
| A project page | `src/content/projects/<slug>.mdx` |
| Notes / blog posts | `src/content/notes/*.mdx` (see `example-note.mdx`) |
| Colors, type, spacing | `src/styles/global.css` (tokens at the top) |
| Demos | see [`docs/DEMOS.md`](docs/DEMOS.md) |

**Add a project:** copy an existing `.mdx` in `src/content/projects/`, change the frontmatter (`featured: true` puts it on the home page; `order` sorts it), and put images in `public/images/projects/`. Link papers to it with `project: '<slug>'` in `publications.ts`.

**Headshot:** save a square photo as `public/images/headshot.jpg` and set `photo: '/images/headshot.jpg'` in `src/config.ts`.

## Deploying (replaces the old AcademicPages site)

```bash
git clone https://github.com/swj0418/swj0418.github.io.git
cd swj0418.github.io
git switch -c academicpages-archive && git push -u origin academicpages-archive   # keep the old site on a branch
git switch master
git rm -r -q .                        # clear the old template
cp -r /path/to/this/folder/. .        # copy the new site in (includes .github/ and .gitignore)
git add -A && git commit -m "Rebuild site with Astro"
git push
```

Then in GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**. Every push to `master` (or `main`) rebuilds and deploys.

**Custom domain (optional):** add a `public/CNAME` file containing the domain, set it under Settings → Pages, and change `site` in `astro.config.mjs`.
