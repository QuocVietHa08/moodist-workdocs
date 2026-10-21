const normalize = (text: string) =>
  text
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase();

export function filterSound(
  value: string,
  query: string,
  keywords: string[] = [],
) {
  const terms = normalize(query).trim().split(/\s+/);
  const text = normalize([value.replaceAll('-', ' '), ...keywords].join(' '));
  return terms.every(term => text.includes(term)) ? 1 : 0;
}
