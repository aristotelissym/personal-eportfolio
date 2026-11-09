export interface Certification {
  name: string;
  issuer: string;
  date: string;
  /** 2–3 letters on the nameplate tile; never a vendor logo. */
  monogram: string;
  /** Public credential URL. Leave out rather than pointing at "#". */
  credentialUrl?: string;
}

export const certifications: Certification[] = [
  {
    name: 'Solutions Architect – Associate',
    issuer: 'Amazon Web Services',
    date: 'Apr 2023',
    monogram: 'AWS',
  },
  {
    name: 'Cloud Digital Leader',
    issuer: 'Google Cloud',
    date: 'Nov 2023',
    monogram: 'GCP',
  },
  {
    name: 'Certified Scrum Product Owner',
    issuer: 'Scrum Alliance',
    date: 'Nov 2022',
    monogram: 'PO',
  },
  {
    name: 'DevOps School',
    issuer: 'Deutsche Telekom IT',
    date: 'Dec 2024',
    monogram: 'DT',
  },
];

export interface Degree {
  degree: string;
  school: string;
  detail?: string;
  /** e.g. "2015 – 2019"; omit while ongoing. */
  period?: string;
  ongoing?: boolean;
}

export const degrees: Degree[] = [
  {
    degree: 'M.Sc. Digital Culture, Smart Cities & Advanced IoT',
    school: 'University of Piraeus',
    ongoing: true,
  },
  {
    degree: 'B.Sc. Computer Science',
    school: 'Ionian University, Corfu',
    detail: 'Grade 8.17',
    period: '2015 – 2019',
  },
];

export const languages = [
  { name: 'Greek', level: 'Native' },
  { name: 'English', level: 'Professional' },
];
