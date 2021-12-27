export function validatePathVariable(variable: string, required = true): boolean {
  let status = false;
  if (required && !variable) {
    status = false;
  } else if (!required && !variable) {
    status = true;
  } else {
    const re = /^[a-zA-Z0-9_.-]*$/;
    status = re.test(variable);
  }
  return status;
}
