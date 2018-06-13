<template>
  <div id="login" @keyup.enter="login">
    <div class="login-wrapper">
      <div class="logo">
        <router-link to="/home"><img src="../../assets/common/logo.png"></router-link>
      </div>
      <div class="slider3D">
        <!--正常登陆-->
        <div class="login-container slider3D_change" :class="{slider3D_change_fadeLeft:isChange}">
          <div class="title">Login</div>
          <div class="login-form">
            <input type="text" name="loginName" class="username input-item" placeholder="Student ID" v-model="loginName">
            <input type="password" name="pwd" class="pwd input-item" placeholder="Password" v-model="loginPwd">
            <div class="captcha-wrapper">
              <input type="text" name="captcha" class="capt input-item" placeholder="Captcha" v-model="captchaTxt">
              <div class="cap-img" @click="getCaptcha">
                <img :src="captchaImg" title="Click refresh" alt="Captcha image" >
              </div>

            </div>
            <div class="detail">
              <div class="remember-btn">
                <input type="checkbox" id="remember" v-model="remember">
                <label for="remember">Remember me</label>
              </div>
              <div class="forget-btn">
                <a @click="transform3D">Mobile login →</a>
              </div>
            </div>
            <button class="login-btn" @click="login">Let's  go !</button>
          </div>
        </div>
        <!--:class="{slider3D_change_fadeRight:!isChange}"-->
        <!--手机登陆-->
        <div class="mobile-container slider3D_change" :class="{slider3D_change_fadeRight:!isChange}">
          <div class="title">Mobile</div>
          <!--暂时这样写着-->
          <!--<div class="text">We can reset your password if you forgot it,please contact management</div>-->
          <div class="mobile-login-form">
            <input type="text" name="loginName" class="username input-item" placeholder="Student ID" v-model="loginName">
            <el-tooltip class="item" effect="dark" content="请填写已绑定的手机号码,用于发送验证码" placement="bottom">
              <input type="text" name="phoneID" class="phoneID input-item" placeholder="Phone Number" v-model="phoneID">
            </el-tooltip>
            <!--<span class="tooltip-txt" v-if="tooltip1">{{tooltip1}}</span>-->
            <div class="mobile-captcha-wrapper">
              <input type="text" name="captcha" class="capt input-item" placeholder="Phone Captcha" v-model="captchaTxt">
              <div class="capBtn" @click="GetMobileCaptcha">
                <span>{{capTooltipTxt}}</span>
              <!--<span class="countTxt">{{counts}} s</span>-->
              </div>
            </div>
            <button class="login-btn" @click="MobileLogin">Let's  go !</button>
          </div>
          <div class="back-btn">
            <a @click="transform3D">← It's OK, I remembered</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Axios from 'axios'
import {SaveToLocal, SetToken, ClearCookie, GetCookie, SetCookie} from '../../lib/js/stroe.js'
const URL = 'http://localhost:8888/sr/'
export default{
  data () {
    return {
      isChange: false,
      captchaImg: URL + 'sys/captcha.jpg',
      loginName: '',
      loginPwd: '',
      captchaTxt: '',
      errorInfo: '',
      remember: false,
      phoneID: '',
      phoneCaptcha: '',
      // 验证学号挂钩电话号码的提示语
      tooltip1: '请填写已绑定的手机号码,用于发送验证码',
      tooltip2: '',
      capTooltipTxt: '发送验证码',
      counts: 60
    }
  },
  methods: {
    transform3D: function () {
      this.isChange = !this.isChange
    },
    getCaptcha () {
      this.captchaImg = this.captchaImg + '?img=' + Math.random()
    },
    login () {
      let resdata = ''
      let loginInfoEntity = {
        'captcha': this.captchaTxt,
        'password': this.loginPwd,
        'userid': this.loginName
      }
      // 判断用户名或者密码是否为空
      if (this.loginName === '' || this.loginPwd === '') {
        this.$message({
          showClose: true,
          message: 'Username or Password is required',
          type: 'error'
        })
        return false
      }
      // 判断验证码是否为空
      if (this.captchaTxt === '') {
        this.$message({
          showClose: true,
          message: 'Captcha code is required',
          type: 'error'
        })
        return false
      }
      if ((this.loginName !== '') || (this.loginPwd !== '') || (this.captchaTxt !== '')) {
        Axios.post('/sys/login/', loginInfoEntity).then((res) => {
          resdata = res.data
          if (resdata.code === 201) {
            // 进行跳转处理提示
            this.$message({
              showClose: true,
              message: 'Login successfully',
              type: 'success'
            })
            // 本地保存
            SetToken(resdata.token)
            SaveToLocal(resdata.userid)
            // 实现登陆跳转到首页
            this.$router.push({path: '/'})
            // 记住密码行为
            if (this.remember) {
              SetCookie(this.loginName, this.loginPwd, 7)
            } else {
              ClearCookie()
            }
          } else if (resdata.code === 405) {
            // 验证码不正确
            this.$message({
              showClose: true,
              message: resdata.msg,
              type: 'error'
            })
            this.captchaTxt = ''
            this.getCaptcha()
          } else if (resdata.code === 403 || resdata.code === 401 || resdata.code === 404) {
            // 403登陆用户名或者密码错误 401Unauthorized 未授权 404Not Found 账号不存在
            this.$message({
              showClose: true,
              message: resdata.msg,
              type: 'error'
            })
            this.loginPwd = ''
            this.loginName = ''
            this.captchaTxt = ''
            this.getCaptcha()
          } else {
            this.$message({
              showClose: true,
              message: 'Abnormal landing, please contact the management staff !',
              type: 'error'
            })
          }
        }).catch((error) => {
          console.log(error)
        })
      }
      return true
    },
    GetMobileCaptcha () {
      // 获取手机验证码
      this.$message({
        type: 'success',
        message: '已经发送验证码'
      })
    },
    MobileLogin () {
      // 手机登陆
    },
    initInfo: function () {
      // 加载页面 使用cookie填入信息
      let userInfo = GetCookie()
      this.loginName = userInfo.username
      this.loginPwd = userInfo.pwd
      this.remember = true
    }
  },
  computed: {

  },
  mounted () {
    // 初始化加载
    this.initInfo()
  }
}
</script>

<style rel="stylesheet/stylus" lang="stylus">
@import "../../style/components/login.styl";
</style>
