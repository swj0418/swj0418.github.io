export interface TeachingEntry {
  role: string;
  course: string;
  code?: string;
  term: string;
  institution: string;
  instructor?: string;
  url?: string;
  note?: string;
}

// Newest first.
export const teaching: TeachingEntry[] = [
  {
    role: 'Teaching Assistant',
    course: 'Data Visualization',
    code: 'CS 3891 / 5891',
    term: 'Spring 2022',
    institution: 'Vanderbilt University',
    instructor: 'Matthew Berger',
    url: 'https://matthewberger.github.io/teaching/vis/spring2022/',
  },
];
