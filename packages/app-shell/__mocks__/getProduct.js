let product;

export function getActiveProductFromPath() {
  if (product) {
    return product;
  }

  return 'publish';
}

export function decorator(story, { parameters }) {
  if (parameters?.product) {
    product = parameters.product;
  }

  return story();
}
