export interface Certification {
  name: string;
  issuer: string;
  date: string;
  icon: string;
  /** Public credential URL. Leave out rather than pointing at "#". */
  credentialUrl?: string;
}

export const certifications: Certification[] = [
  {
    name: 'Solutions Architect – Associate',
    issuer: 'Amazon Web Services',
    date: 'Apr 2023',
    icon: 'fa-brands fa-aws',
  },
  {
    name: 'Cloud Digital Leader',
    issuer: 'Google Cloud',
    date: 'Nov 2023',
    icon: 'fa-brands fa-google',
  },
  {
    name: 'Certified Scrum Product Owner',
    issuer: 'Scrum Alliance',
    date: 'Nov 2022',
    icon: 'fa-solid fa-people-group',
  },
  {
    name: 'DevOps School',
    issuer: 'Deutsche Telekom IT',
    date: 'Dec 2024',
    icon: 'fa-solid fa-infinity',
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
