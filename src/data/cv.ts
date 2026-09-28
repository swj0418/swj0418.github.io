// Structured CV used by /cv. Keep in sync with the PDF at public/cv.pdf.

export const education = [
  { degree: 'PhD in Computer Science', school: 'Vanderbilt University', when: 'December 2026 (expected)', note: 'Advisor: Matthew Berger' },
  { degree: 'MSc in Computer Science', school: 'Vanderbilt University', when: 'May 2020' },
  { degree: 'BA in Business Administration', school: 'Seokyeong University', when: 'March 2018' },
];

export interface Role {
  title: string;
  org: string;
  when: string;
  bullets: string[];
}

export const research: Role[] = [
  {
    title: 'PhD Researcher',
    org: 'Vanderbilt University',
    when: 'Jan 2021 – Present',
    bullets: [
      'Introduced a Bayesian framework that forecasts an LLM’s output distribution over structured Vega-Lite specifications from pre-generation hidden states, quantifying how much sampling variability is recoverable without repeated generation; identified channel binding as the main bottleneck across model scales (under review).',
      'Built an end-to-end evaluation framework for LLM-generated Vega-Lite visualizations (prompt construction, structured-output parsing, schema validation, rendering, feature-atom extraction); used it to quantify how raw data, metadata, summaries, and stated goals shape design choices across thousands of generations.',
      'Developed concept-based interpretability methods for identifying, comparing, and steering semantic directions in GANs and diffusion models via representation analysis and intervention-based evaluation; released as visual analytics systems (Concept Lens, CAN) at IEEE VIS, TVCG, and EuroVis.',
      'Designed a text-based transfer function workflow that maps natural-language descriptions to semantic regions in volume rendering (IEEE VIS 2024).',
      'Investigated LLM uncertainty calibration and persona-conditioned sampling to characterize how prompt framing shifts output distributions.',
    ],
  },
  {
    title: 'Research Intern',
    org: 'Lawrence Livermore National Laboratory',
    when: 'Jan 2023 – Aug 2023',
    bullets: [
      'Built a scalable visual analytics system for exploring 80,000+ diffusion-generated candidate material structures, enabling domain scientists to triage and prioritize outputs that would otherwise require manual review.',
      'Partnered with materials science researchers to design the generative-model-driven discovery workflow end-to-end, from sampling to expert-in-the-loop evaluation.',
    ],
  },
  {
    title: 'Senior Researcher',
    org: 'Korea Institute of Industry Convergence',
    when: 'Oct 2020 – Jan 2021',
    bullets: [
      'Applied NLP and computer-vision methods to construction-domain documents and imagery for automated task-name recognition, progress tracking, and work-trade classification.',
    ],
  },
  {
    title: 'Student Researcher',
    org: 'Tonglab, Vanderbilt University',
    when: 'Feb 2019 – Feb 2020',
    bullets: [
      'Developed a Gabor-filter-based CNN inspired by early visual cortex processing, improving noisy-image classification accuracy by 8–12% over standard baselines.',
    ],
  },
];

export const software: Role[] = [
  {
    title: 'Co-founder',
    org: 'MovTrack (mobile startup)',
    when: 'Oct 2018 – Jan 2020',
    bullets: ['Led backend, Android, and AWS deployment for an early-stage consumer mobile product; owned infrastructure across frontend, backend, and cloud.'],
  },
  {
    title: 'Software Engineer',
    org: 'KICM',
    when: 'Mar 2018 – Jul 2018',
    bullets: ['Built data-processing automation for construction management research and cost-estimation workflows.'],
  },
  {
    title: 'President',
    org: 'Korean Student and Scholars Association at Vanderbilt',
    when: 'Aug 2021 – Jul 2024',
    bullets: ['Led a 60-member graduate organization and organized 10+ academic, cultural, and community events.'],
  },
];

export const skills = [
  { area: 'ML / AI', items: 'PyTorch, Hugging Face Transformers, OpenAI API, scikit-learn, Stable Diffusion, GANs' },
  { area: 'Visualization', items: 'D3.js, Vega-Lite, Altair, ObservableHQ, React' },
  { area: 'Languages', items: 'Python, JavaScript, Java, C++, SQL' },
  { area: 'Infrastructure', items: 'AWS, Flask, PostgreSQL, MongoDB' },
];
