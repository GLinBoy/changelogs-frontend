export function validateName(name: string): boolean {
  const re = /^[A-Za-z0-9 ]+$/;
  return re.test(name);
}
