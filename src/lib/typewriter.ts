const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

interface TypewriterOptions {
  /** Base delay between typed characters (ms). */
  charDelay?: number;
  /** Pause before a new command starts typing (ms). */
  lineDelay?: number;
}

/**
 * Animates a fake terminal: each `.term-line` has its `.term-cmd` typed out,
 * and the output lines that follow appear once the command is "run".
 * The full text is in the HTML, so it stays readable without JS or with reduced motion.
 */
export async function typewriter(root: HTMLElement, { charDelay = 45, lineDelay = 380 }: TypewriterOptions = {}) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const lines = Array.from(root.children) as HTMLElement[];
  const commands = new Map<HTMLElement, string>();

  for (const line of lines) {
    line.classList.add('is-pending');
    const cmd = line.querySelector<HTMLElement>('.term-cmd');
    if (cmd) {
      commands.set(cmd, cmd.textContent ?? '');
      cmd.textContent = '';
    }
  }
  root.setAttribute('aria-busy', 'true');

  for (const line of lines) {
    line.classList.remove('is-pending');
    const cmd = line.querySelector<HTMLElement>('.term-cmd');
    const text = cmd ? commands.get(cmd) : undefined;

    if (cmd && text) {
      line.classList.add('is-typing');
      await sleep(lineDelay);
      for (const ch of text) {
        cmd.textContent += ch;
        await sleep(charDelay + Math.random() * 45);
      }
      await sleep(180);
      line.classList.remove('is-typing');
    } else {
      await sleep(70);
    }
  }

  root.removeAttribute('aria-busy');
}
