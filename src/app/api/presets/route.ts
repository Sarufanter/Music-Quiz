import { NextResponse } from 'next/server';
import db from '@/lib/prisma';

export async function POST(req: Request) {
  const body = await req.json();
  const { title, description, songs } = body;

  const preset = await db.songsPreset.create({
    data: {
      title,
      description,
      songs: {
        create: songs.map((s: any) => ({
          filename: s.filename,
          composer: s.composer,
          collection: s.collection,
          compositionNumber: s.compositionNumber,
          compositionPart: s.compositionPart,
          compositionTheme: s.compositionTheme,
          filePath: s.filePath,
        })),
      },
    },
    include: { songs: true },
  });

  return NextResponse.json(preset);
}
