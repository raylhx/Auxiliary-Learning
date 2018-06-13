<template>
    <div id="app">
      <router-view></router-view>
    </div>
</template>

<script>
/* eslint-disable */
import {canvaFun} from './lib/canva/canvaFun.js'
export default {
  name: 'app'
}
</script>

<style rel="stylesheet/stylus" lang="stylus">
@import "style/index.styl";
#app
  width:100%
  height:auto
.loginFun
  width: calc(100vw)
  z-index:-1
  position:absolute
  left:0
  top:0

</style>
