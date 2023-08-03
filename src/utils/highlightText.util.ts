/**
 * Highlight text in a string by wrapping `query` in <mark> tags.
 */
export function highlightText(text: string, query: string): string {
  const regexQuery = new RegExp(`(${query})`, "gi");
  return text.replace(regexQuery, "<mark>$1</mark>");
}
