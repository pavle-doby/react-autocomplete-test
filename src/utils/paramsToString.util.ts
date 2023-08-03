/**
 * Converts an object of params to a string
 */
export function paramsToString(params: Record<string, any>): string {
  return new URLSearchParams(params).toString();
}
