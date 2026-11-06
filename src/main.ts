// Shared entry: styles + behaviour common to every page.
import '@fortawesome/fontawesome-free/css/all.min.css';
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
  const icon = button.querySelector('i');

  const sync = () => {
    const next = activeTheme() === 'dark' ? 'light' : 'dark';
    button.setAttribute('aria-label', `Switch to ${next} theme`);
    if (icon) icon.className = `fa-solid ${next === 'light' ? 'fa-sun' : 'fa-moon'}`;
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
  document.querySelectorAll<HTMLAnchorElement>('.site-nav__link').forEach((link) => {
    if (link.dataset.page === page) link.setAttribute('aria-current', 'page');
  });

  const toggle = document.querySelector<HTMLButtonElement>('.nav-toggle');
  const nav = document.getElementById('site-nav');
  if (!toggle || !nav) return;
  const icon = toggle.querySelector('i');

  const setOpen = (open: boolean) => {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    if (icon) icon.className = `fa-solid ${open ? 'fa-xmark' : 'fa-bars'}`;
  };

  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) {
      setOpen(false);
      toggle.focus();
    }
  });
  // Close the menu after following an in-page link (e.g. ./contact).
  nav.addEventListener('click', (event) => {
    if ((event.target as HTMLElement).closest('a')) setOpen(false);
  });
  window.matchMedia('(min-width: 1024px)').addEventListener('change', (event) => {
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
