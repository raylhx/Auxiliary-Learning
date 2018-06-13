<template>
  <div id="setting">
    <el-form :model="settingForm" status-icon :rules="validRule" ref="settingForm" label-width="150px">
      <el-form-item label="Old Password" prop="originPass">
        <el-input type="password" v-model="settingForm.originPass" auto-complete="off"
                  placeholder="Entry Old Password"></el-input>
      </el-form-item>
      <el-form-item label="New Password" prop="newPass">
        <el-input type="password" v-model="settingForm.newPass" auto-complete="off"
                  title="The code USES Numbers and letters" placeholder="Entry New Password"></el-input>
      </el-form-item>
      <el-form-item label="Confirm" prop="checkPass">
        <el-input type="password" v-model="settingForm.checkPass" auto-complete="off"
                  placeholder="Confirm Password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('settingForm')">Submit</el-button>
        <el-button @click="resetForm('settingForm')">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
  import Axios from 'axios'
  export default{
    data () {
      let validateOriginPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please entry old password'))
        } else {
          callback()
        }
      }
      let validatePass = (rule, value, callback) => {
        let reg = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,16}$/)
        if (value === '') {
          callback(new Error('Please entry new password'))
        } else if (reg.test(value) !== true) {
          callback(new Error('The code USES numbers and uppercase ,lowercase letters,length 6-16'))
        } else if (/\s+/g.test(value) === true) {
          callback(new Error('Not contain spaces'))
        } else {
          if (this.settingForm.checkPass !== '') {
            this.$refs.settingForm.validateField('checkPass')
          }
          callback()
        }
      }
      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please confirm password again'))
        } else if (value !== this.settingForm.newPass) {
          callback(new Error('Passwords do not match!'))
        } else {
          callback()
        }
      }
      return {
        settingForm: {
          newPass: '',
          checkPass: '',
          originPass: ''
        },
        validRule: {
          newPass: [
            {validator: validatePass, trigger: 'blur'}
          ],
          checkPass: [
            {validator: validatePass2, trigger: 'blur'}
          ],
          originPass: [
            {validator: validateOriginPass, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = {
              'pswd': this.settingForm.originPass,
              'newPswd': this.settingForm.newPass
            }
            Axios.put('/sys/user/updatePswd', params).then((res) => {
              let result = res.data
              if (result.code === 201) {
                this.$message({
                  type: 'success',
                  message: '修改成功，建议重新登录',
                  showClose: true
                })
              } else {
                this.$message({
                  type: 'error',
                  message: result.msg,
                  showClose: true
                })
              }
            }).catch((error) => {
              console.log(error)
            })
          } else {
            console.log('Error submit!!')
            return false
          }
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>

<style rel="stylesheet/stylus" lang="stylus">
  @import "../../style/components/setting.styl"
</style>
