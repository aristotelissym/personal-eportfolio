export interface Role {
  title: string;
  company: string;
  /** Display dates, e.g. "Apr 2025". `end: null` means current role. */
  start: string;
  end: string | null;
  location: string;
  /** Start with a verb; keep to what the CV says. */
  highlights: string[];
  tech: string[];
}

/** Most recent first. */
export const roles: Role[] = [
  {
    title: 'DevOps Engineer',
    company: 'T-Digital, Deutsche Telekom IT',
    start: 'Apr 2025',
    end: null,
    location: 'Thessaloniki, Greece',
    highlights: [
      'Lead infrastructure engineer for one of the first regional, custom-tailored AI tools for ticket management.',
      'Member of the AWS Team / System Team of the Gigabit Domain.',
      'Operate and maintain a multi-tenant B2B marketplace on Open Telekom Cloud (OTC).',
      'Orchestrate and administer Kubernetes clusters; analyse performance and ship corrective automation for availability and sustainability.',
      'Migrate enterprise solutions from on-prem to AWS.',
    ],
    tech: ['OTC', 'AWS', 'Kubernetes', 'Rancher', 'Docker', 'Terraform', 'Scalr', 'GitLab CI/CD', 'Bash'],
  },
  {
    title: 'IT Services & Operations Manager',
    company: 'T-Digital, Deutsche Telekom IT',
    start: 'Aug 2023',
    end: 'Apr 2025',
    location: 'Thessaloniki, Greece',
    highlights: [
      'Operated critical applications on AWS and Azure in Linux environments: incident management, cost reduction, availability.',
      'Analysed system performance and wrote corrective automation scripts.',
      'Migrated systems from on-prem infrastructure to AWS.',
      'Built a custom patch-management tool with Ansible and Bash.',
    ],
    tech: ['AWS', 'Azure', 'Ansible', 'Bash', 'Linux'],
  },
  {
    title: 'Senior Associate, Solution Engineer',
    company: 'Pfizer CDI',
    start: 'Oct 2020',
    end: 'Aug 2023',
    location: 'Thessaloniki, Greece',
    highlights: [
      'Technical lead for production systems: deployment automation, incident response and health checks.',
      'Product management, BAU activities and leading the support team.',
    ],
    tech: ['AWS', 'Docker', 'Bash', 'Linux'],
  },
];

/** Roles before cloud operations, shown collapsed. Most recent first. */
export const earlierRoles: Role[] = [
  {
    title: 'QA Automation Engineer',
    company: 'Kiss My Button PC',
    start: 'Jul 2020',
    end: 'Oct 2020',
    location: 'Thessaloniki, Greece',
    highlights: ['Built a test suite that ran unit tests against the front-end source code before it was committed to GitHub.'],
    tech: ['Mocha', 'Chai', 'Supertest', 'Git', 'JavaScript'],
  },
  {
    title: 'QA Manual Tester',
    company: 'Kiss My Button PC',
    start: 'Oct 2018',
    end: 'Jan 2020',
    location: 'Thessaloniki, Greece',
    highlights: ['Found and reported bugs at the staging stage.', 'Built integration tests as part of a BDD process.'],
    tech: ['Ghost Inspector', 'JavaScript'],
  },
  {
    title: 'Backend Web Developer',
    company: 'Buddha Libre Yoga Studio',
    start: 'Jul 2018',
    end: 'Aug 2018',
    location: 'Thessaloniki, Greece',
    highlights: ['Built and delivered a CRM web application in a team of three.'],
    tech: ['Django', 'JavaScript', 'jQuery', 'Git'],
  },
  {
    title: 'Postgraduate Student Member',
    company: 'Bi.He.Lab, Ionian University',
    start: 'Nov 2016',
    end: 'Sep 2019',
    location: 'Corfu, Greece',
    highlights: ['Built automated solutions to ease the day-to-day tasks of the biostatistician group.'],
    tech: [],
  },
];
