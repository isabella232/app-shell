function eventDispatcher(eventKey, detail) {
  const event = new CustomEvent(eventKey, {
    detail,
  })

  window.dispatchEvent(event)
}

export default eventDispatcher;
