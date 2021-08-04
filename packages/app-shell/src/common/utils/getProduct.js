export function getActiveProductFromPath() {
  const baseUrl = window?.location?.origin;
  const [, productPath] = baseUrl.match(/https*:\/\/(\w+)./) || [];
  return productPath;
}
