export const DATES = {
  inMonthsFromNow(months) {
    const now = new Date()
    return new Date(now.setMonth(now.getMonth() + months));
  }
}

export function setCookie({ key, value, expires }) {
  document.cookie = `appshell_${key}=${value};domain=.buffer.com;path=/;expires=${expires.toUTCString()}`
}

export function getCookie({ key }) {
  const regex = new RegExp(`appshell_${key}=(\\w+)`, "g")
  const cookie = document.cookie.match(regex) || [null]
  const [k, value] = cookie[0]?.split("=") || [null, false] // eslint-disable-line no-unused-vars
  return value
}
