const LANG_KEY = "lang"
const TOKEN_UNIT = 'unit'

export function getLang() {
  return window.localStorage.getItem(LANG_KEY)
}

export function setLang(lang) {
  window.localStorage.setItem(LANG_KEY, lang)
}

export function removeLang() {
  window.localStorage.removeItem(LANG_KEY)
}

export function getUnit() {
  return window.localStorage.getItem(TOKEN_UNIT)
}

export function setUnit(unit) {
  window.localStorage.setItem(TOKEN_UNIT, unit)
}

export function removeUnit() {
  window.localStorage.removeItem(TOKEN_UNIT)
}