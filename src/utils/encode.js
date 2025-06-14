export function encodeToBase64(str) {
    return window.btoa(unescape(encodeURIComponent(str)))
}
  