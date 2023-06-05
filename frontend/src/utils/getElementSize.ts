export interface ElementSize {
  height: number;
  width: number;
}

export function getElementSize(element: HTMLElement): {
  width: number;
  height: number;
} {
  const { width, height } = element.getBoundingClientRect();
  return { width, height };
}
