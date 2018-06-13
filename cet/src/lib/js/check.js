/**
 * Created by Ray on 2018/2/24.
 */
export function CheckText (text) {
  let result = text
  result = result.replace(/["]+/g, '//"')
    .replace(/[&]+/g, '&amp;')
    .replace(/[<]+/g, '&lt;')
    .replace(/[>]+/g, '&gt;')
    .replace(/[.]+/g, '&#46;')
    .replace(/script+/gi, ' ')
    .replace(/style+/gi, ' ')
    .replace(/[\s]+/g, ' ')
  return result
}
export function RestoreText (text) {
  let result = text
  result = result.replace(/&lt;+/g, '<')
    .replace(/&gt;+/g, '>')
    .replace(/&#46;+/g, '.')
    .replace(/&amp;+/g, '&')
  return result
}
