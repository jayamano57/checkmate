export function appendZero(number: number) {
  const decimalPart = number.toString().split('.')[1];

  if (decimalPart && decimalPart.length === 1) {
    return number.toFixed(2);
  }

  return number;
}
