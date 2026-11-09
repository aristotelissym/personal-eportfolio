export interface SkillGroup {
  title: string;
  /** Tool whose icon stands for the whole unit (see src/lib/tags.ts). */
  icon: string;
  /** In order of use, not alphabet. */
  items: string[];
  /** Items shown as patched cable tags: the platforms worked on most. */
  patched?: string[];
}

/** Rack units, from the layer I work in most. */
export const skillGroups: SkillGroup[] = [
  { title: 'Cloud', icon: 'Cloud', items: ['AWS', 'Azure', 'GCP', 'OTC'], patched: ['AWS', 'OTC'] },
  { title: 'Containers', icon: 'Docker', items: ['Kubernetes', 'Docker', 'Rancher', 'Helm'] },
  { title: 'Infrastructure as code', icon: 'Terraform', items: ['Terraform', 'Scalr', 'Ansible', 'YAML'] },
  { title: 'CI/CD', icon: 'GitLab CI/CD', items: ['GitLab CI/CD'] },
  {
    title: 'Programming',
    icon: 'JavaScript',
    items: ['Bash', 'Python', 'TypeScript', 'JavaScript', 'Angular', 'NestJS'],
  },
  { title: 'Systems', icon: 'Linux', items: ['Linux administration', 'Incident management'] },
];

export const interests: string[] = ['System architecture', 'Cloud computing', 'DevOps', 'IoT'];

export const workStyle: string[] = [
  'Ownership',
  'Root cause analysis',
  'Decision-making',
  'Cross-functional teams',
  'Collaboration',
  'Time management',
];
