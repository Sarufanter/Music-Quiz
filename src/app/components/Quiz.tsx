'use client';

import React, { useEffect, useState } from 'react';

interface Song {
  file: File;
  url: string;
  composerAndCollection: string;
  compositionNumber: string;
}

interface QuizProps {
  songs: Song[];
}

const Quiz: React.FC<QuizProps> = ({ songs }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (songs.length < 2) return;
    generateQuestion();
  }, [songs]);

  const generateQuestion = () => {
    const randomIndex = Math.floor(Math.random() * songs.length);
    const correct = songs[randomIndex];

    const shuffled = [...songs]
      .filter((s) => s !== correct)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    const variants = [...shuffled, correct].sort(() => 0.5 - Math.random());

    setCurrentSong(correct);
    setOptions(variants.map((s) => s.compositionNumber));
    setSelected(null);
    setShowResult(false);
  };

  const handleAnswer = (answer: string) => {
    setSelected(answer);
    setShowResult(true);
  };

  if (!currentSong) return <p>Недостатньо пісень для вікторини.</p>;

  return (
    <div className="p-4 mt-6 border rounded shadow max-w-xl">
      <h2 className="text-xl font-semibold mb-4">Прослухай і вибери правильну композицію:</h2>

      <audio controls src={currentSong.url} className="mb-4" />

      <div className="space-y-2">
        {options.map((option, idx) => {
          const isCorrect = option === currentSong.compositionNumber;
          const isSelected = selected === option;

          let bg = "bg-white";
          if (showResult && isSelected) {
            bg = isCorrect ? "bg-green-100" : "bg-red-100";
          } else if (showResult && isCorrect) {
            bg = "bg-green-100";
          }

          return (
            <button
              key={idx}
              onClick={() => handleAnswer(option)}
              disabled={!!selected}
              className={`block w-full text-left px-4 py-2 border rounded ${bg} hover:bg-gray-100`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {showResult && (
        <div className="mt-4">
          {selected === currentSong.compositionNumber ? (
            <p className="text-green-700 font-semibold">✅ Правильно!</p>
          ) : (
            <p className="text-red-700 font-semibold">
              ❌ Неправильно. Правильна відповідь: <strong>{currentSong.compositionNumber}</strong>
            </p>
          )}
          <button
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={generateQuestion}
          >
            Наступне питання
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
