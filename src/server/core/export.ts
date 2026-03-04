export function toCsv<T extends Record<string, unknown>>(rows: T[]): string {
  if (!rows.length) return '';
  const headers = Object.keys(rows[0]);
  const escaped = (value: unknown) => `"${String(value ?? '').replace(/"/g, '""')}"`;
  const lines = rows.map((row) => headers.map((header) => escaped(row[header])).join(','));
  return [headers.join(','), ...lines].join('\n');
}
