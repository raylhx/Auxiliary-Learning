/**
 * Created by Ray on 2017/6/5.
 */

/*
 * 解析url参数
 * url   http://localhost:8080/?id=12345&a=b/seller
 * @example: ?id=12345&a=b
 * return  Object {id:12345,a:b}
 * */
export function urlParse () {
  // 得到url
  let url = window.location.search
  let obj = {}
  /* 定义一个正则表达式 */
  let reg = /[?&][^?&]+=[^?&]+/g
  // 用一个数组来装已经匹配好的字符串
  let arr = url.match(reg)
  // 前提是数组存在
  if (arr) {
    arr.forEach((item) => {
      // substring 是去掉？和 &符号，只需要内容，split就是根据等号来分割
      let tempArr = item.substring(1).split('=')
      let key = decodeURIComponent(tempArr[0])
      let val = decodeURIComponent(tempArr[1])
      obj[key] = val
    })
  }
  return obj
}

/*
*
* return Array
* */
export function getElementPosition (element) {
  let actualLeft = element.offsetLeft
  let actualTop = element.offsetTop
  let current = element.offsetParent
  let result = {
    left: 0,
    top: 0
  }
  while (current !== null) {
    actualLeft += current.offsetLeft
    actualTop += current.offsetTop
    current = current.offsetParent
  }
  result.left = actualLeft
  result.top = actualTop
  return result
}
export function HandelTitleString (id) {
  let arr = id.split('')
  let title = arr[2] + arr[3] + arr[4] + arr[5] + '-' + arr[6] + arr[7] + '-' + arr[8] + arr[9] + ' '
  return title
}
