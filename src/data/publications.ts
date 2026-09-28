// Every publication lives here. The Publications page, the CV page, project
// pages and BibTeX blocks are all generated from this list.
//
// `project` links a paper to a project page (src/content/projects/<slug>.mdx).
// Leave `bibtex` out to have it generated from the fields below.

export type PubType = 'journal' | 'conference' | 'preprint' | 'thesis' | 'regional';

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  venue: string; // full venue name
  venueShort: string; // compact label, e.g. "IEEE TVCG"
  year: number;
  type: PubType;
  status?: 'under-review';
  project?: string;
  volume?: string;
  number?: string;
  pages?: string;
  links?: {
    pdf?: string;
    arxiv?: string;
    doi?: string;
    publisher?: string;
    code?: string;
    video?: string;
    demo?: string;
  };
  note?: string;
  bibtex?: string;
}

export const publications: Publication[] = [
  {
    id: 'jeong2026forecasting',
    title: 'Bayesian Forecasting of LLM Outputs from Pre-Generation Hidden States',
    authors: ['Sangwon Jeong', 'et al.'],
    venue: 'Under review',
    venueShort: 'Under review',
    year: 2026,
    type: 'preprint',
    status: 'under-review',
    project: 'forecasting-llm-outputs',
  },
  {
    id: 'jeong2025conceptlens',
    title: 'Concept Lens: Visual Comparison and Evaluation of Generative Model Manipulations',
    authors: ['Sangwon Jeong', 'Mingwei Li', 'Matthew Berger', 'Shusen Liu'],
    venue: 'IEEE Transactions on Visualization and Computer Graphics',
    venueShort: 'IEEE TVCG',
    year: 2025,
    type: 'journal',
    project: 'concept-lens',
    links: {
      publisher: 'https://ieeexplore.ieee.org/document/10982415',
      code: 'https://github.com/swj0418/concept-lens',
    },
  },
  {
    id: 'jeong2024texttf',
    title: 'Text-based Transfer Function Design for Semantic Volume Rendering',
    authors: ['Sangwon Jeong', 'Jixian Li', 'Shusen Liu', 'Chris R. Johnson', 'Matthew Berger'],
    venue: 'IEEE Visualization and Visual Analytics (VIS), Short Papers',
    venueShort: 'IEEE VIS',
    year: 2024,
    type: 'conference',
    project: 'text-transfer-functions',
    links: {
      arxiv: 'https://arxiv.org/abs/2406.15634',
      video: 'https://www.youtube.com/watch?v=wtl-zKpboLg',
    },
  },
  {
    id: 'li2024can',
    title: 'CAN: Concept-aligned Neurons for Visual Comparison of Neural Networks',
    authors: ['Mingwei Li', 'Sangwon Jeong', 'Shusen Liu', 'Matthew Berger'],
    venue: 'Computer Graphics Forum (EuroVis)',
    venueShort: 'EuroVis',
    year: 2024,
    type: 'journal',
    volume: '43',
    number: '3',
    project: 'can',
    links: {
      doi: 'https://doi.org/10.1111/cgf.15085',
    },
  },
  {
    id: 'jeong2023conceptlens',
    title: 'Concept Lens: Visually Analyzing the Consistency of Semantic Manipulation in GANs',
    authors: ['Sangwon Jeong', 'Mingwei Li', 'Shusen Liu', 'Matthew Berger'],
    venue: 'IEEE Visualization and Visual Analytics (VIS), Short Papers',
    venueShort: 'IEEE VIS',
    year: 2023,
    type: 'conference',
    pages: '221--225',
    project: 'concept-lens',
    links: {
      arxiv: 'https://arxiv.org/abs/2406.19987',
      publisher: 'https://ieeexplore.ieee.org/document/10360889',
      video: 'https://www.youtube.com/watch?v=vGjovECYL2U',
    },
  },
  {
    id: 'jeong2022disentanglement',
    title: 'Interactively Assessing Disentanglement in GANs',
    authors: ['Sangwon Jeong', 'Shusen Liu', 'Matthew Berger'],
    venue: 'Computer Graphics Forum (EuroVis)',
    venueShort: 'EuroVis',
    year: 2022,
    type: 'journal',
    volume: '41',
    number: '3',
    project: 'disentanglement',
    links: {
      doi: 'https://doi.org/10.1111/cgf.14524',
      demo: 'https://old.observablehq.com/@swj0418/eurovis-2022',
    },
  },
  {
    id: 'jeong2021worktrade',
    title: 'Enhancing Work Trade Image Classification Performance Using a Work Dependency Graph',
    authors: ['Sangwon Jeong', 'Kichang Jeong'],
    venue: 'Korean Journal of Construction Engineering and Management',
    venueShort: 'KJCEM',
    year: 2021,
    type: 'regional',
    volume: '22',
    number: '1',
    links: { doi: 'https://doi.org/10.6106/KJCEM.2021.22.1.106' },
  },
  {
    id: 'jeong2020stringsim',
    title:
      'Comparing String Similarity Algorithms for Recognizing Task Names Found in Construction Documents',
    authors: ['Sangwon Jeong', 'Kichang Jeong'],
    venue: 'Korean Journal of Construction Engineering and Management',
    venueShort: 'KJCEM',
    year: 2020,
    type: 'regional',
    volume: '21',
    number: '6',
    links: { doi: 'https://doi.org/10.6106/KJCEM.2020.21.6.125' },
  },
  {
    id: 'jeong2020gabor',
    title:
      'Investigating Noise Robustness of Convolutional Neural Networks for Image Classification Using Gabor Filters',
    authors: ['Sangwon Jeong'],
    venue: "Master's thesis, Vanderbilt University",
    venueShort: 'MS Thesis',
    year: 2020,
    type: 'thesis',
  },
];

export const pubTypeLabel: Record<PubType, string> = {
  preprint: 'Under review',
  journal: 'Journal',
  conference: 'Conference',
  regional: 'Domestic journal',
  thesis: 'Thesis',
};

function bibAuthors(authors: string[]) {
  return authors.filter((a) => a !== 'et al.').join(' and ');
}

export function toBibtex(p: Publication): string | null {
  if (p.bibtex) return p.bibtex;
  if (p.status === 'under-review') return null;
  const isArticle = p.type === 'journal' || p.type === 'regional';
  const kind = p.type === 'thesis' ? 'mastersthesis' : isArticle ? 'article' : 'inproceedings';
  const doi = p.links?.doi?.replace(/^https?:\/\/(dx\.)?doi\.org\//, '');
  const fields: [string, string | undefined][] = [
    ['title', `{${p.title}}`],
    ['author', bibAuthors(p.authors)],
    [
      p.type === 'thesis' ? 'school' : isArticle ? 'journal' : 'booktitle',
      p.type === 'thesis' ? 'Vanderbilt University' : p.venue.replace(/ \(EuroVis\)$/, ''),
    ],
    ['year', String(p.year)],
    ['volume', p.volume],
    ['number', p.number],
    ['pages', p.pages],
    ['doi', doi],
  ];
  const body = fields
    .filter(([, v]) => v)
    .map(([k, v]) => `  ${k} = {${v}}`)
    .join(',\n');
  return `@${kind}{${p.id},\n${body}\n}`;
}

export function pubsForProject(slug: string) {
  return publications.filter((p) => p.project === slug);
}
