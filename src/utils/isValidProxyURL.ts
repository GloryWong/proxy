export function isValidProxyURL(url: string) {
  const regexp =
    /^(?:(?:https?|socks5):\/\/)?(?:\w+:\w+@)?(?:[\w.-]+)(?::\d+)?\/?$/i;
  return regexp.test(url);
}
