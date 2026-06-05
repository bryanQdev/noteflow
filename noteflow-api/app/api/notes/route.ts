import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { z } from 'zod';

const noteSchema = z.object({
  title: z.string().min(3),
  type: z.enum(['note', 'checklist', 'idea']),
  content: z.string().optional(),
  color: z.string().optional(),
});

export async function GET() {
  try {
    const notes = await query(`
      SELECT 
        n.*,
        COALESCE(json_agg(ci.* ORDER BY ci.created_at ASC) FILTER (WHERE ci.id IS NOT NULL), '[]'::json) as items,
        COALESCE(json_agg(nt.tag ORDER BY nt.created_at ASC) FILTER (WHERE nt.id IS NOT NULL), '[]'::json) as tags
      FROM notes n
      LEFT JOIN checklist_items ci ON n.id = ci.note_id
      LEFT JOIN note_tags nt ON n.id = nt.note_id
      GROUP BY n.id
      ORDER BY n.created_at DESC
    `);
    return NextResponse.json(notes);
  } catch (error) {
    console.error('Error en GET /api/notes:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = noteSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ errors: result.error.issues }, { status: 400 });
    }
    const { title, type, content, color } = result.data;
    const [note] = await query<any>(
      'INSERT INTO notes (title, type, content, color) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, type, content, color]
    );
    if (note) {
      note.items = [];
      note.tags = [];
    }
    return NextResponse.json(note, { status: 201 });
  } catch (error) {
    console.error('Error en POST /api/notes:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}