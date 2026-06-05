import { neon } from '@neondatabase/serverless';

let sqlInstance: ReturnType<typeof neon> | null = null;

function getSql() {
  if (!sqlInstance) {
    const url = process.env.DATABASE_URL;
    if (!url) {
      throw new Error("DATABASE_URL is not defined in the environment variables.");
    }
    sqlInstance = neon(url);
  }
  return sqlInstance;
}

export async function query<T = unknown>(text: string, params?: unknown[]): Promise<T[]> {
  const sql = getSql();
  const result = params ? await sql.query(text, params) : await sql.query(text);
  return result as T[];
}