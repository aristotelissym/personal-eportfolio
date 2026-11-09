/**
 * Loads and validates src/data/projects.json — edit that file to change the project cards.
 * Field docs live in projects.schema.json (editors pick it up via "$schema").
 */
import raw from './projects.json';

export type RepositoryHost = 'github' | 'gitlab';

export interface Project {
  kind: string;
  title: string;
  summary: string;
  tags: string[];
  period: string;
  /** Drawing revision letter, "A" unless set. */
  revision: string;
  repository?: { url: string; host: RepositoryHost | null };
  liveUrl?: string;
  caseStudyUrl?: string;
  image?: string;
}

const HOSTS: Record<RepositoryHost, true> = { github: true, gitlab: true };

function fail(where: string, message: string): never {
  throw new Error(`projects.json → ${where}: ${message}`);
}

function str(value: unknown, where: string, required: boolean): string | undefined {
  if (value === undefined && !required) return undefined;
  if (typeof value !== 'string' || value.trim() === '') fail(where, 'must be a non-empty string');
  return value;
}

function detectHost(url: string, explicit: unknown, where: string): RepositoryHost | null {
  if (explicit !== undefined) {
    if (typeof explicit !== 'string' || !(explicit in HOSTS)) fail(where, 'repositoryHost must be "github" or "gitlab"');
    return explicit as RepositoryHost;
  }
  let hostname: string;
  try {
    hostname = new URL(url).hostname;
  } catch {
    fail(where, `repository "${url}" is not a valid URL`);
  }
  if (hostname === 'github.com' || hostname.endsWith('.github.com')) return 'github';
  if (hostname === 'gitlab.com' || hostname.startsWith('gitlab.')) return 'gitlab';
  return null;
}

function parseProject(value: unknown, index: number): Project {
  if (typeof value !== 'object' || value === null) fail(`projects[${index}]`, 'must be an object');
  const p = value as Record<string, unknown>;
  const where = `projects[${index}]${typeof p.title === 'string' ? ` "${p.title}"` : ''}`;

  if (!Array.isArray(p.tags) || p.tags.some((t) => typeof t !== 'string')) fail(where, 'tags must be an array of strings');
  const repoUrl = str(p.repository, `${where}.repository`, false);

  return {
    kind: str(p.kind, `${where}.kind`, true)!,
    title: str(p.title, `${where}.title`, true)!,
    summary: str(p.summary, `${where}.summary`, true)!,
    tags: p.tags as string[],
    period: str(p.period, `${where}.period`, true)!,
    revision: parseRevision(p.revision, where),
    repository: repoUrl ? { url: repoUrl, host: detectHost(repoUrl, p.repositoryHost, where) } : undefined,
    liveUrl: str(p.liveUrl, `${where}.liveUrl`, false),
    caseStudyUrl: str(p.caseStudyUrl, `${where}.caseStudyUrl`, false),
    image: str(p.image, `${where}.image`, false),
  };
}

function parseRevision(value: unknown, where: string): string {
  if (value === undefined) return 'A';
  if (typeof value !== 'string' || !/^[A-Z]$/.test(value)) fail(`${where}.revision`, 'must be one capital letter, e.g. "B"');
  return value;
}

const data = raw as { projects?: unknown; slots?: unknown };
if (!Array.isArray(data.projects)) fail('projects', 'must be an array');

export const projects: Project[] = data.projects.map(parseProject);
/** One line each; shown as hazard-taped work-in-progress slots. */
export const projectSlots: string[] = Array.isArray(data.slots)
  ? data.slots.map((s, i) => str(s, `slots[${i}]`, true)!)
  : [];
