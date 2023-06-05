export function numberOrNull(number: number): number | null {
  return isNaN(number) ? null : number;
}
