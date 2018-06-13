// 存取两个函数
// 此函数通用
export function SaveToLocal (userid) {
  // 双下划线   localStorage.__user__用来存放
  let user = window.localStorage.__user__
  if (!user) {
    // 如果user不存的话
    user = {}
    user.userid = ''
  } else {
    user = JSON.parse(user)
    // user的不同,初始化为一个对象
    if (!user.token) {
      user.userid = ''
    }
  }
  user.userid = userid
  localStorage.__user__ = JSON.stringify(user)
}
// 获取localStorage的数据
export function GetLocalUserId () {
  let user = window.localStorage.__user__
  user = JSON.parse(user)
  return user
}
// def 是默认值
export function GetToken () {
  return localStorage.token || ''
}
export function SetToken (token) {
  localStorage.token = token
}
// 记住密码 修改cookie
export function SetCookie (username, pwd, exdays) {
  let exdate = new Date()
  exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays)

  window.document.cookie = 'username' + '=' + username + ';path=/;expires=' + exdate.toGMTString()
  window.document.cookie = 'password' + '=' + pwd + ';path=/;expires=' + exdate.toGMTString()
}

export function GetCookie () {
  let result = {
    username: '',
    pwd: ''
  }
  if (window.document.cookie.length > 0) {
    // 注意中间有空格
    let info = window.document.cookie.split('; ')
    for (let i = 0; i < info.length; i++) {
      let item = info[i].split('=')
      if (item[0] === 'username') {
        result.username = item[1]
      }
      if (item[0] === 'password') {
        result.pwd = item[1]
      }
    }
  }
  return result
}
// 清除cookie
export function ClearCookie () {
  SetCookie('', '', -1)
}
// 保存用户对每个文章的信息 包括点赞以及收藏
export function SvaeUserAInfo (userId, articleId, eventName, flag) {
  // let user = window.localStorage.__user__s
}
