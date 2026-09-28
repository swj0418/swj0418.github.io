# Adding demos

Every project page can show one "hero" demo (set in the project's frontmatter) plus any number of inline figures, videos, and charts in its body. Pick the lightest option that shows the idea.

| What you have | Use | Cost / upkeep |
|---|---|---|
| A screen recording | `demo: { kind: video }` or `<DemoVideo>` | Free, never breaks |
| A talk or fast-forward on YouTube | `demo: { kind: youtube }` or `<YouTube>` | Free, never breaks |
| An Observable notebook | `demo: { kind: iframe, src: https://observablehq.com/embed/@you/notebook }` | Free |
| A visual analytics system (React/D3 client + Python server) | Static build in `public/demos/<name>/` (see below) | Free, never breaks |
| Something that needs live model inference | A Hugging Face Space, embedded with `kind: iframe` | Free CPU tier; GPU costs money; idle Spaces sleep |
| A chart from your results | `<VegaLite spec={...} />` in the MDX body | Free |

## 1. Hero demo (frontmatter)

```yaml
# src/content/projects/my-project.mdx
demo:
  kind: iframe            # youtube | video | iframe
  src: /demos/concept-lens/
  title: Explore Concept Lens
  aspect: 16 / 10         # optional CSS aspect-ratio
  poster: /images/projects/concept-lens.jpg   # optional, shown behind the "Launch" card
  live: true              # adds the "live demo" badge on cards
```

Iframe demos load only when the visitor clicks **Launch demo**, so a heavy system never slows the page.

## 2. Inline pieces (MDX body)

```mdx
import Figure from '../../components/Figure.astro';
import DemoVideo from '../../components/DemoVideo.astro';
import YouTube from '../../components/YouTube.astro';
import DemoFrame from '../../components/DemoFrame.astro';
import VegaLite from '../../components/VegaLite.astro';

<Figure src="/images/projects/x.jpg" alt="…" caption="…" />
<DemoVideo src="/videos/x.mp4" poster="/videos/x.jpg" title="Brushing codes re-clusters the concepts" />
<YouTube id="vGjovECYL2U" title="VIS 2023 talk" />
<DemoFrame src="https://you-space.hf.space" title="Try it on your own prompt" />
<VegaLite specUrl="/data/channel-binding.vl.json" caption="…" />
```

Video tips: 15–60 s clips, 1280–1600 px wide, H.264 MP4, ideally under ~8 MB. Keep big files out of git history if you can (host on a Hugging Face dataset or release asset and link the URL).

## 3. Turning a research system into a static demo

Most of your systems are a React/D3 client talking to a local Django/Flask server that serves precomputed data. For a portfolio demo you rarely need the server — you need the answers it gives for a curated slice of data. `tools/static-demo/static-api.js` automates that:

1. **Copy the shim** into the client: `cp tools/static-demo/static-api.js <client>/src/`.
2. **Install it** at the very top of `<client>/src/index.js`:

   ```js
   import { installStaticApi } from './static-api';
   installStaticApi({
     mode: process.env.REACT_APP_DEMO_MODE, // 'record' | 'static' | unset = off
     apiPattern: /^https?:\/\/(127\.0\.0\.1|localhost):\d+\/conceptlens\//,
     assetPattern: /^https?:\/\/(127\.0\.0\.1|localhost):\d+\/served_data\//,
     staticBase: process.env.PUBLIC_URL + '/',
   });
   ```

3. **Record.** Start your server with one or two small, representative experiments. Run the client with `REACT_APP_DEMO_MODE=record npm start`, click through the selections you want visitors to explore, then run `__downloadSnapshots()` in the browser console. You get `snapshots.json`.
4. **Build.**

   ```bash
   PUBLIC_URL=/demos/concept-lens REACT_APP_DEMO_MODE=static npm run build
   mkdir -p <website>/public/demos/concept-lens
   cp -r build/* <website>/public/demos/concept-lens/
   cp snapshots.json <website>/public/demos/concept-lens/
   cp -r <server>/served_data/<experiment> <website>/public/demos/concept-lens/served_data/
   ```

5. **Point the project at it** with `demo: { kind: iframe, src: /demos/concept-lens/, live: true }`.

Requests that were never recorded return a 404 and a small "not included in this demo" notice rather than crashing, so it's worth adding a one-line hint in the demo (e.g. "try the *closed eyes* concept") that steers visitors to recorded paths.

For Concept Lens specifically, the client calls `/conceptlens/*` endpoints with POST bodies and loads images from `/served_data/<experiment>/codes/` and `/walked/`. Keep the experiment small (a few hundred images, resized to ~256 px JPEG) so the demo stays under ~50 MB; GitHub Pages sites should stay well under 1 GB.
