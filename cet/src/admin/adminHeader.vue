<template>
  <div class="admin-wrapper">
    <div class="logo">
      <router-link to="/"><img src="../assets/common/logo.png"></router-link>
    </div>
    <el-menu :default-active="activeIndex" class="el-menu-nav" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">
        <router-link to="/">Home</router-link>
      </el-menu-item>
      <el-menu-item index="1">
        <router-link to="/cet4">文章管理</router-link>
      </el-menu-item>
      <el-menu-item index="2">
        <router-link to="/cet6">用户管理</router-link>
      </el-menu-item>
<!--      <el-menu-item index="3">
        <router-link to="/cetpost">Post</router-link>
      </el-menu-item>
      <el-menu-item index="4">
        <router-link to="/center/information">Center</router-link>
      </el-menu-item>
      <el-menu-item index="5">
        <router-link to="/about">About</router-link>
      </el-menu-item>-->
      <!--<el-menu-item index="5"><router-link to="/login">Login</router-link>-->
      <!--</el-menu-item>-->
      <el-menu-item index="6"><a @click="Logout">退出</a></el-menu-item>
    </el-menu>
  </div>
  </el-header>
</template>

<script type="text/ecmascript-6">
  import {SetToken} from '../lib/js/stroe.js'
  import Axios from 'axios'
  export default{
    data () {
      return {
        activeIndex: '1'
      }
    },
    methods: {
      handleSelect (key, keyPath) {
      },
      // 点击退出
      Logout () {
        Axios.get('/sys/logout').then((res) => {
          console.log(res)
        }).catch((error) => {
          console.log(error)
        })
        let token = ''
        SetToken(token)
        this.$router.push({path: '/login'})
      }
    }
  }
</script>

<style rel="stylesheet/stylus" lang="stylus">
  @import "adminHeader.styl";
</style>
