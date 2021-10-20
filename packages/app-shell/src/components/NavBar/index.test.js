import { getQueryParameters, getLoginUrl } from './index'

describe('NavBar', () => {
  describe('getQueryParameters', () => {
    it('return undefined if no query parameters', () => {
      const params = getQueryParameters('http://buffer.com')
      expect(params).toBeUndefined()
    })
    it('return all query parameters', () => {
      const params = getQueryParameters('http://buffer.com?foo=foo&bar=bar')
      expect(params).toEqual('foo=foo&bar=bar')
    })
  })

  describe('getLoginUrl', () => {
    it('return a valid login url', () => {
      const url = getLoginUrl('http://publish.buffer.com?foo=foo&var=bar')
      expect(url).toEqual('https://login.buffer.com/login?redirect=https://publish.buffer.com&foo=foo&var=bar')
    })
  })
})

