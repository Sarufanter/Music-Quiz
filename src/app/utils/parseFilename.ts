export interface ParsedSongInfo {
    composerAndCollection: string;
    compositionNumber: string;
  }
  
  export function parseFilename(filename: string): ParsedSongInfo | null {
    // Видаляємо розширення
    const name = filename.replace(/\.[^/.]+$/, "");
  
    // Регулярка для виділення важливих частин
    const match = name.match(/^\d+-(.+)-(.+)$/);
    if (!match) return null;
  
    const composerAndCollection = match[1].trim();
    const compositionNumber = match[2].trim();
  
    return {
      composerAndCollection,
      compositionNumber,
    };
  }
  