export function titleGenerator (title: string): string {
  return title.replace(/\s\s+/g, ' ').trim()
    .replace(/\s+/g, '-').toLowerCase()
}
