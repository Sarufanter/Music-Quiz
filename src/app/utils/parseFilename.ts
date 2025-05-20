export interface ParsedSongInfo {
  author: string;
  title: string;
  number: string | null;
  part: string | null;
  theme: string | null;
  name: string | null;
}

export function parseFilename(filename: string): ParsedSongInfo | null {
  // 1. Видалити розширення
  let name = filename.replace(/\.[^/.]+$/, "");

  // 2. Видалити початкову нумерацію
  name = name.replace(/^\d+[-_\s]+/, "");

  // 3. Заміна всіх роздільників на пробіли
  name = name.replace(/[-_\s]+/g, " ").trim();

  // 4. Розбити по словах
  const parts = name.split(" ");
  if (parts.length < 2) return null;

  // 5. Визначити автора: якщо друге слово — одна літера або ініціал, то це прізвище + ініціал
  let author = parts[0];
  let restStartIndex = 1;

  if (/^[А-ЯҐЇЄІA-Z]\.?$/.test(parts[1])) {
    author += ` ${parts[1]}`;
    restStartIndex = 2;
  }

  const rest = parts.slice(restStartIndex);

  // 6. Регулярки
  const numberRegex = /№?\d+[а-я]*/i;
  const partRegex = /^\d+ч$/i;
  const themeRegex = /^(гп|основна|тема|хор|вступ|фінал|інтродукція)$/i;

  const numberIndex = rest.findIndex((p) => numberRegex.test(p));
  const partIndex = rest.findIndex((p) => partRegex.test(p));
  const themeIndex = rest.findIndex((p) => themeRegex.test(p));

  const number = numberIndex !== -1 ? rest[numberIndex] : null;
  const part = partIndex !== -1 ? rest[partIndex] : null;
  const theme = themeIndex !== -1 ? rest[themeIndex] : null;

  const excludeIndices = [numberIndex, partIndex, themeIndex].filter(
    (i) => i !== -1
  );
  const titleParts = rest.filter((_, i) => !excludeIndices.includes(i));
  const title = titleParts.join(" ");

  return {
    author,
    title,
    number,
    part,
    theme,
    name,
  };
}
