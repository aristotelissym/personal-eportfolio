// Shared entry: styles + behaviour common to every page.
import './styles/main.scss';

type Theme = 'light' | 'dark';
const THEME_KEY = 'theme';

function storedTheme(): Theme | null {
  try {
    const value = localStorage.getItem(THEME_KEY);
    return value === 'light' || value === 'dark' ? value : null;
  } catch {
    return null;
  }
}

function activeTheme(): Theme {
  return storedTheme() ?? (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
}

function initTheme(): void {
  const button = document.querySelector<HTMLButtonElement>('.theme-toggle');
  if (!button) return;
  const NAMES: Record<Theme, string> = { light: 'drafting paper', dark: 'blueprint' };

  const sync = () => {
    const next: Theme = activeTheme() === 'dark' ? 'light' : 'dark';
    button.setAttribute('aria-label', `Switch to ${NAMES[next]} (${next}) theme`);
  };

  button.addEventListener('click', () => {
    const next: Theme = activeTheme() === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      /* storage unavailable — theme still applies for this page view */
    }
    sync();
  });

  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', sync);
  sync();
}

function initNav(): void {
  const page = document.body.dataset.page;
  document.querySelectorAll<HTMLAnchorElement>('.as-nav__links a[data-page]').forEach((link) => {
    if (link.dataset.page === page) link.setAttribute('aria-current', 'page');
  });

  const toggle = document.querySelector<HTMLButtonElement>('.nav-menu');
  const links = document.getElementById('nav-links');
  if (!toggle || !links) return;

  const setOpen = (open: boolean) => {
    links.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? 'Close' : 'Menu';
  };

  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && links.classList.contains('is-open')) {
      setOpen(false);
      toggle.focus();
    }
  });
  // Close the menu after following an in-page link (e.g. contact).
  links.addEventListener('click', (event) => {
    if ((event.target as HTMLElement).closest('a')) setOpen(false);
  });
  window.matchMedia('(min-width: 901px)').addEventListener('change', (event) => {
    if (event.matches) setOpen(false);
  });
}

/** Whole years elapsed since an ISO year-month like "2020-10". */
function yearsSince(isoMonth: string): number {
  const [year = 0, month = 1] = isoMonth.split('-').map(Number);
  const now = new Date();
  return Math.floor(((now.getFullYear() - year) * 12 + (now.getMonth() + 1 - month)) / 12);
}

function initDates(): void {
  const year = String(new Date().getFullYear());
  document.querySelectorAll('[data-year]').forEach((el) => (el.textContent = year));
  document.querySelectorAll<HTMLElement>('[data-years-since]').forEach((el) => {
    const since = el.dataset.yearsSince;
    if (since) el.textContent = String(yearsSince(since));
  });
}

initTheme();
initNav();
initDates();
