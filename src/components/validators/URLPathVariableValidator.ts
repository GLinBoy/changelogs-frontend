export function validatePathVariable (variable: string, required = true): boolean {
  if (required && !variable) {
    return false
  } else if (!required && !variable) {
    return true
  } else {
    const re = /^[a-zA-Z0-9_-]*$/
    return re.test(variable)
  }
}
