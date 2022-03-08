import { getQueryParameters, getLoginUrl, getLogoutUrl } from './index';

describe('NavBar', () => {
  describe('getQueryParameters', () => {
    it('return an empty strin if no query parameters', () => {
      const params = getQueryParameters('http://buffer.com');
      expect(params).toEqual('');
    });

    it('return all query parameters', () => {
      const params = getQueryParameters('http://buffer.com?foo=foo&bar=bar');
      expect(params).toEqual('&foo=foo&bar=bar');
    });
  });

  describe('getLoginUrl', () => {
    afterEach(() => {
      window.location.hash = '';
    });

    it('return a valid login url', () => {
      const url = getLoginUrl('http://publish.buffer.com');
      expect(url).toEqual(
        'https://login.buffer.com/login?redirect=https://publish.buffer.com'
      );
    });

    it('return a valid login url with params in the redirect url', () => {
      const url = getLoginUrl('http://publish.buffer.com?foo=foo&bar=bar');
      expect(url).toEqual(
        'https://login.buffer.com/login?redirect=https://publish.buffer.com&foo=foo&bar=bar'
      );
    });

    it('return a valid login url with a hash in the redirect url', () => {
      window.location.hash = '#planSelector';
      const url = getLoginUrl('https://account.buffer.com#planSelector');
      expect(url).toEqual(
        'https://login.buffer.com/login?redirect=https://account.buffer.com#planSelector'
      );
    });
  });

  describe('getLogoutUrl', () => {
    it('return a valid logout url', () => {
      const url = getLogoutUrl('http://publish.buffer.com');
      expect(url).toEqual(
        'https://login.buffer.com/logout?redirect=https://publish.buffer.com'
      );
    });

    it('return a valid logout url with params in the redirect url', () => {
      const url = getLogoutUrl('http://publish.buffer.com?foo=foo&bar=bar');
      expect(url).toEqual(
        'https://login.buffer.com/logout?redirect=https://publish.buffer.com&foo=foo&bar=bar'
      );
    });

    it('return a valid logout url with a hash in the redirect url', () => {
      window.location.hash = '#planSelector';
      const url = getLogoutUrl('https://account.buffer.com#planSelector');
      expect(url).toEqual(
        'https://login.buffer.com/logout?redirect=https://account.buffer.com#planSelector'
      );
    });
  });
});
