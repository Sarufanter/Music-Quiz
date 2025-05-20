"use client";
import Quiz from "./Quiz";
import React, { useState } from "react";
import { parseFilename } from "@/app/utils/parseFilename";

export interface Song {
  file: File;
  url: string;
  author: string;
  title: string;
  number: string | null;
  part: string | null;
  theme: string | null;
  name?: string | null;
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
          author: parsed.author,
          title: parsed.title,
          number: parsed.number,
          part: parsed.part,
          theme: parsed.theme,         
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
            <p>
              <strong>Автор :</strong> {song.author}
            </p>
            <p>
              <strong>Збірка:</strong> {song.title}
            </p>
            <p>
              <strong>Номер композиції:</strong> {song.number}
            </p>
            <p>
              <strong>Частина композиції:</strong> {song.part}
            </p>
            <p>
              <strong>Тема композиції:</strong> {song.theme}
            </p>
            <audio controls src={song.url} className="mt-2" />
          </li>
        ))}
      </ul>
      {songs.length >= 2 && <Quiz songs={songs} />}
    </div>
  );
};

export default FileUploader;
