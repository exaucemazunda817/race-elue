// Validation et envoi des formulaires (inscription ebook / newsletter, contact, invitation).
// Règles : validation à la sortie du champ, puis à chaque saisie une fois le champ en erreur ;
// message d'erreur relié au champ par aria-describedby ; libellés toujours visibles.

export function emailError(value: string): string {
  const v = value.trim();
  if (!v) return 'Indique ton adresse e-mail.';
  if (!v.includes('@')) return "Il manque le @ dans ton adresse (ex. grace@exemple.com).";
  const [local, domain = ''] = v.split('@');
  if (!local) return "Il manque le début de l'adresse, avant le @.";
  if (!domain || !/\.[a-z]{2,}$/i.test(domain)) return "Il manque la fin de l'adresse (ex. .com).";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return "Cette adresse ne semble pas valide.";
  return '';
}

type Rule = (el: HTMLInputElement | HTMLTextAreaElement) => string;

export function setError(el: HTMLElement, msg: string) {
  const id = el.getAttribute('aria-describedby')?.split(' ').find((x) => x.endsWith('-err'));
  const box = id ? document.getElementById(id) : null;
  if (msg) {
    el.setAttribute('aria-invalid', 'true');
    if (box) { box.querySelector('[data-msg]')!.textContent = msg; box.classList.add('show'); }
  } else {
    el.removeAttribute('aria-invalid');
    box?.classList.remove('show');
  }
}

/** Branche la validation « à la sortie, puis à la saisie » sur un champ. Renvoie une fonction de vérification. */
export function watch(el: HTMLInputElement | HTMLTextAreaElement, rule: Rule) {
  let touched = false;
  const check = () => { const m = rule(el); setError(el, m); return !m; };
  el.addEventListener('blur', () => { if (el.value.trim()) touched = true; if (touched) check(); });
  el.addEventListener('input', () => { if (touched || el.getAttribute('aria-invalid') === 'true') check(); });
  el.addEventListener('change', () => { if (el instanceof HTMLInputElement && el.type === 'checkbox') check(); });
  return () => { touched = true; return check(); };
}

export async function postJSON(url: string, data: Record<string, unknown>) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(String(res.status));
}

// ---------- Formulaires d'inscription (ebook, newsletter, prochain numéro) ----------
document.querySelectorAll<HTMLFormElement>('form[data-subscribe]').forEach((form) => {
  const input = form.querySelector<HTMLInputElement>('input[type="email"]')!;
  const button = form.querySelector<HTMLButtonElement>('button[type="submit"]')!;
  const status = form.querySelector<HTMLElement>('[data-status]');
  const endpoint = form.dataset.endpoint || '';
  const after = form.dataset.after || 'merci'; // 'merci' : page de confirmation ; 'message' : message sur place
  const check = watch(input, (el) => emailError(el.value));

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!check()) { input.focus(); return; }
    const label = button.textContent;
    button.disabled = true;
    button.textContent = 'Envoi…';
    try {
      if (endpoint) {
        await postJSON(endpoint, { email: input.value.trim(), source: form.dataset.source || 'site' });
        if (after === 'merci') { location.href = '/merci'; return; }
        if (status) { status.hidden = false; status.dataset.kind = 'ok'; }
        form.reset();
      } else if (after === 'merci') {
        // Aucun service d'e-mail branché : l'ebook est proposé en téléchargement direct.
        location.href = '/merci?direct=1';
        return;
      } else if (status) {
        status.hidden = false;
        status.dataset.kind = 'fallback';
      }
    } catch {
      if (status) { status.hidden = false; status.dataset.kind = 'error'; }
    } finally {
      button.disabled = false;
      button.textContent = label;
    }
  });
});
