export function paramsToString(params: Record<string, any>): string {
  return new URLSearchParams(params).toString();
}
