import ShortUniqueId from 'short-unique-id';

export function getCheckId(): string {
  const uid = new ShortUniqueId({ length: 5 });

  return uid();
}
