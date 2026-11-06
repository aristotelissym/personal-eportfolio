/** Markup that has already been escaped / is trusted. */
class SafeHtml {
  constructor(readonly value: string) {}
  toString(): string {
    return this.value;
  }
}

type Value = string | number | SafeHtml | null | undefined | false | readonly Value[];

const ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

const escape = (text: string): string => text.replace(/[&<>"']/g, (ch) => ESCAPES[ch] ?? ch);

function render(value: Value): string {
  if (value === null || value === undefined || value === false) return '';
  if (value instanceof SafeHtml) return value.value;
  if (Array.isArray(value)) return value.map(render).join('');
  return escape(String(value));
}

/** Tagged template: interpolated values are HTML-escaped unless they are themselves `html` results. */
export function html(strings: TemplateStringsArray, ...values: Value[]): SafeHtml {
  return new SafeHtml(strings.reduce((out, str, i) => out + str + (i < values.length ? render(values[i]) : ''), ''));
}

export type { SafeHtml };

/** Render markup into the element matching `selector`. */
export function mount(selector: string, content: SafeHtml): HTMLElement {
  const el = document.querySelector<HTMLElement>(selector);
  if (!el) throw new Error(`mount: no element matches "${selector}"`);
  el.innerHTML = content.value;
  return el;
}
