'use client';
import Quiz from './Quiz';
import React, { useState } from 'react';
import { parseFilename, ParsedSongInfo } from '@/app/utils/parseFilename';

interface Song {
  file: File;
  url: string;
  composerAndCollection: string;
  compositionNumber: string;
}

const FileUploader: React.FC = () => {
  const [songs, setSongs] = useState<Song[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const parsedSongs: Song[] = [];

    files.forEach((file) => {
      const parsed = parseFilename(file.name);
      if (parsed) {
        parsedSongs.push({
          file,
          url: URL.createObjectURL(file),
          composerAndCollection: parsed.composerAndCollection,
          compositionNumber: parsed.compositionNumber,
        });
      }
    });

    setSongs(parsedSongs);
  };

  return (
    <div className="p-4">
      <input
        type="file"
        accept=".mp3"
        multiple
        onChange={handleFileUpload}
        className="mb-4 border"
      />

      <ul className="space-y-2">
        {songs.map((song, index) => (
          <li key={index} className="p-4 border rounded shadow">
            <p><strong>Автор і збірка:</strong> {song.composerAndCollection}</p>
            <p><strong>Номер композиції:</strong> {song.compositionNumber}</p>
            <audio controls src={song.url} className="mt-2" />
          </li>
        ))}
      </ul>
      {songs.length >= 2 && <Quiz songs={songs} />}
    </div>
  );
};

export default FileUploader;
