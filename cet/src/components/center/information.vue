<template>
  <div id="info">
    <div class="infoContainer">
      <div class="avatar wrapper">
        <label class="title">Avatar</label>
        <div class="avatar-img" :class="{hideClass:editFlag}">
          <img src="../../assets/common/avatar.jpg">
        </div>
        <!--编辑-->
        <div class="avatar-edit avatar-img" :class="{showClass:editFlag}">
          <img src="../../assets/common/avatar.jpg">
        </div>
      </div>
      <div class="loginname wrapper">
        <label class="title">LoginName</label>
        <span class="text" :class="{hideClass:editFlag}">{{userInfoAfter.userid}}</span>
        <input
          type="text"
          :value="userInfoAfter.userid"
          class="editItem infoItem disabledClass"
          :class="{showClass:editFlag}"
          readonly
          title="Disabled">
      </div>
      <!--后台字段为username-->
      <div class="nickname wrapper">
        <label class="title">NickName</label>
        <span class="text" :class="{hideClass:editFlag}">{{userInfoAfter.username}}</span>
        <input type="text"
               :value="userInfoAfter.username"
               placeholder="Please input your Nickname"
               class="editItem infoItem"
               :class="{showClass:editFlag}"
               v-model.trim="userInfoAfter.username"
               minlength="">
        <i class="editItem el-icon-error" :class="{errorShowClass:nicknameError}"></i>
        <span class="editItem errorTextClass" :class="{errorShowClass:nicknameError}">{{nicknameErrorInfo}}</span>
      </div>
      <div class="city wrapper">
        <label class="title">Location</label>
        <span class="text" :class="{hideClass:editFlag}">{{userInfoAfter.location}}</span>
        <el-form class="editItem" :class="{showClass:editFlag}">
          <el-form-item>
            <el-radio-group v-model="userInfoAfter.location">
              <el-radio label="广州本部"></el-radio>
              <el-radio label="肇庆校区"></el-radio>
              <el-radio label="清远校区"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <div class="phone wrapper">
        <label class="title">Mobile</label>
        <span class="text" :class="{hideClass:editFlag}">{{userInfoAfter.mobile}}</span>
        <input
          maxlength="11"
          max-length="11"
          v-model="userInfoAfter.mobile"
          type="text"
          :value="userInfoAfter.mobile"
          placeholder="Please input your phone number"
          class="editItem infoItem"
          :class="{showClass:editFlag}">
        <i class="editItem el-icon-error" :class="{errorShowClass:mobileError}"></i>
        <span class="editItem errorTextClass" :class="{errorShowClass:mobileError}">{{mobileErrorInfo}}</span>
      </div>
      <div class="level wrapper">
        <label class="title">Level</label>
        <span class="text" :class="{hideClass:editFlag}">{{userInfoAfter.readingLevel}}</span>
        <el-form class="editItem" :class="{showClass:editFlag}">
          <el-form-item>
            <el-radio-group v-model="userInfoAfter.readingLevel">
              <el-radio label="Senior high School"></el-radio>
              <el-radio label="cet4"></el-radio>
              <el-radio label="cet6"></el-radio>
              <el-radio label="Graduate Student"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <div class="motto wrapper">
        <label class="title">Motto</label>
        <span class="text" :class="{hideClass:editFlag}">{{userInfoAfter.motto}}</span>
        <textarea class="editItem" :class="{showClass:editFlag}" v-model="userInfoAfter.motto"></textarea>
        <i class="editItem el-icon-error" :class="{errorShowClass:mottoError}"></i>
        <span class="editItem errorTextClass" :class="{errorShowClass:mottoError}">{{mottoErrorInfo}}</span>
      </div>

      <div class="editWrapper iconClass" @click="editInfo" :class="{hideClass:editFlag}">
        <a><i class="el-icon-edit-outline"></i></a>
      </div>
      <div class="editItem saveWrapper iconClass" :class="{showClass:editFlag}">
        <a title="Save"><i class="el-icon-tickets" @click="saveInfo('save')"></i></a>
        <a title="Cancel"><i class="el-icon-close" @click="saveInfo('cancel')"></i></a>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Axios from 'axios'
  import {GetLocalUserId} from '../../lib/js/stroe.js'
  export default{
    data () {
      return {
        editFlag: false,
        // 从cookie中获取的userid
        userIdC: '',
        // 修改之后的数据
        userInfoAfter: {
          userid: '',
          location: '',
          readingLevel: '',
          username: '',
          mobile: '',
          motto: ''
        },
        // 原始数据
        userInfoBefore: {
          userid: '',
          location: '',
          readingLevel: '',
          username: '',
          mobile: '',
          motto: ''
        },
        mobileError: false,
        mobileErrorInfo: '',
        nicknameError: false,
        nicknameErrorInfo: '',
        mottoError: false,
        mottoErrorInfo: ''
      }
    },
    methods: {
      initGetUserInfo () {
        // 从cookie信息获取用户信息
        let userInfoLocal = GetLocalUserId()
        this.userIdC = userInfoLocal.userid
        if (this.userIdC === '') {
          this.$alert('用户信息登录超时，请重新登录', '登录提示', {
            confirmButtonText: 'OK',
            showClose: false,
            callback: action => {
              this.$router.push({path: '/login'})
              console.log(action)
            }
          })
          return false
        }
        Axios.get('/sys/user/personal?userId=' + this.userIdC).then((res) => {
          let personalResult = res.data
          if (personalResult.code === 201) {
            // 保存原始数据
            this.userInfoBefore = personalResult.data
            // 赋值数据
            for (let item in this.userInfoBefore) {
              this.userInfoAfter[item] = this.userInfoBefore[item]
            }
            // 以下方法会造成对象引用
            // this.userInfoAfter = personalResult.data
          } else {
            // 弹框提示
            this.$alert('获取用户信息失败，请重新退出登录网站', '登录提示', {
              confirmButtonText: 'Login',
              showClose: false,
              callback: action => {
                // this.$router.push({path: '/login'})
                console.log(action)
              }
            })
          }
        }).catch((error) => {
          console.log('error:' + error)
        })
      },
      editInfo: function () {
        this.editFlag = !this.editFlag
      },
      checkInfo () {
        if (this.userInfoAfter.username === '') {
          this.nicknameError = true
          this.nicknameErrorInfo = '必填'
          return false
        }
        if (this.userInfoAfter.username.length > 50 || this.userInfoAfter.username.length < 2) {
          this.nicknameError = true
          this.nicknameErrorInfo = '长度应在4~50字符内'
          return false
        }
        let re1 = /反共|反中国共产党|script|style/gi
        if (re1.test(this.userInfoAfter.username)) {
          this.nicknameError = true
          this.nicknameErrorInfo = '请填写正确的昵称'
          return false
        }
        this.nicknameError = false
        // 手机号码判断
        if (this.userInfoAfter.mobile === '') {
          this.mobileError = true
          this.mobileErrorInfo = '必填'
          return false
        }
        if (!(/^1[34578]\d{9}$/.test(this.userInfoAfter.mobile))) {
          this.mobileError = true
          this.mobileErrorInfo = '手机号码有误，请重新填写'
          return false
        }
        this.mobileError = false
        // 座右铭判断
        if (this.userInfoAfter.motto === '') {
          this.mottoError = true
          this.mottoErrorInfo = '必填'
          return false
        }
        let re2 = /反共|反中国共产党|script|style/gi
        if (re2.test(this.userInfoAfter.motto)) {
          this.mottoError = true
          this.mottoErrorInfo = '请填写座右铭'
          return false
        }
        if (this.userInfoAfter.motto.length > 50 || this.userInfoAfter.motto.length < 2) {
          this.mottoError = true
          this.mottoErrorInfo = '长度应在4~50字符内'
          return false
        }
        this.mottoError = false
        return true
      },
      saveInfo: function (item) {
        if (item === 'save') {
          // nickname判断
          let check = this.checkInfo()
          if (check) {
            let sysUserEntityVo = {
              'location': this.userInfoAfter.location,
              'mobile': this.userInfoAfter.mobile,
              'motto': this.userInfoAfter.motto,
              'readingLevel': this.userInfoAfter.readingLevel,
              'userid': this.userInfoAfter.userid,
              'username': this.userInfoAfter.username
            }
            Axios.post('/sys/user/updatePersonInfo', sysUserEntityVo).then((res) => {
              let updateResult = res.data
              if (updateResult.code === 201) {
                this.$message({
                  type: 'success',
                  message: '修改成功',
                  showClose: true
                })
                for (let item in this.userInfoAfter) {
                  this.userInfoBefore[item] = this.userInfoAfter[item]
                }
                // this.userInfoBefore = this.userInfoAfter
              } else {
                // alert('123')
                this.$message({
                  type: 'error',
                  message: updateResult.msg,
                  showClose: true
                })
              }
            }).catch((error) => {
              console.log('error' + error)
            })
            this.editFlag = !this.editFlag
          }
        } else {
          // 离开操作，提示，离开或者留下
          this.$confirm('此操作将不保存修改信息, 是否继续?', '提示', {
            confirmButtonText: '离开',
            cancelButtonText: '留下',
            type: 'warning'
          }).then(() => {
            // 回复修改之前的信息，复原
            for (let item in this.userInfoBefore) {
              this.userInfoAfter[item] = this.userInfoBefore[item]
            }
            // this.userInfoAfter = this.userInfoBefore
            this.editFlag = !this.editFlag
            // 清除错误提示信息
            this.mobileError = false
            this.nicknameError = false
            this.mottoError = false
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '继续修改信息'
            })
          })
        }
      }
    },
    mounted () {
      this.initGetUserInfo()
    }
  }
</script>

<style rel="stylesheet/stylus" lang="stylus">
  @import "../../style/components/info.styl";
</style>
