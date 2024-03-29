export function validateURL(url: string, required = true): boolean {
  let status = false;
  if (required && !url) {
    status = false;
  } else if (!required && !url) {
    status = true;
  } else {
    const re = new RegExp('^(https?:\\/\\/)?' // protocol
      + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' // domain name
      + '((\\d{1,3}\\.){3}\\d{1,3}))' // OR ip (v4) address
      + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' // port and path
      + '(\\?[;&a-z\\d%_.~+=-]*)?' // query string
      + '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    status = re.test(url);
  }
  return status;
}
