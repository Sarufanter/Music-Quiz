export interface ParsedSongInfo {
  composer: string;
  collection: string;
  compositionNumber: string | null;
  compositionPart: string | null;
  compositionTheme: string | null;
  filename: string | null;
}

export function fileparseName(filefilename: string): ParsedSongInfo | null {
  // 1. Видалити розширення
  let filename = filefilename.replace(/\.[^/.]+$/, "");

  // 2. Видалити початкову нумерацію
  filename = filename.replace(/^\d+[-_\s]+/, "");

  // 3. Заміна всіх роздільників на пробіли
  filename = filename.replace(/[-_\s]+/g, " ").trim();

  // 4. Розбити по словах
  const compositionParts = filename.split(" ");
  if (compositionParts.length < 2) return null;

  // 5. Визначити автора: якщо друге слово — одна літера або ініціал, то це прізвище + ініціал
  let composer = compositionParts[0];
  let restStartIndex = 1;

  if (/^[А-ЯҐЇЄІA-Z]\.?$/.test(compositionParts[1])) {
    composer += ` ${compositionParts[1]}`;
    restStartIndex = 2;
  }

  const rest = compositionParts.slice(restStartIndex);

  // 6. Регулярки
  const compositionNumberRegex = /№?\d+[а-я]*/i;
  const compositionPartRegex = /^\d+ч$/i;
  const compositionThemeRegex = /^(гп|основна|тема|хор|вступ|фінал|інтродукція)$/i;

  const compositionNumberIndex = rest.findIndex((p) => compositionNumberRegex.test(p));
  const compositionPartIndex = rest.findIndex((p) => compositionPartRegex.test(p));
  const compositionThemeIndex = rest.findIndex((p) => compositionThemeRegex.test(p));

  const compositionNumber = compositionNumberIndex !== -1 ? rest[compositionNumberIndex] : null;
  const compositionPart = compositionPartIndex !== -1 ? rest[compositionPartIndex] : null;
  const compositionTheme = compositionThemeIndex !== -1 ? rest[compositionThemeIndex] : null;

  const excludeIndices = [compositionNumberIndex, compositionPartIndex, compositionThemeIndex].filter(
    (i) => i !== -1
  );
  const collectioncompositionParts = rest.filter((_, i) => !excludeIndices.includes(i));
  const collection = collectioncompositionParts.join(" ");

  return {
    composer,
    collection,
    compositionNumber,
    compositionPart,
    compositionTheme,
    filename,
  };
}
