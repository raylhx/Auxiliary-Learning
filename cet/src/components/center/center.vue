<template>
  <div id="personalCenter">
    <div class="sidebar">
      <div class="sidebarInner">
        <header class="sidebarSection">
          <div class="logo">
            <router-link to="/home"><img src="../../assets/common/logo.png"></router-link>
          </div>
          <div class="displayNames">
            <span class="nickName ellipsis">Hi ~</span>
            <span class="loginName ellipsis">{{userId}}</span>
          </div>
        </header>
        <div class="sidebarViewportContainer">
          <section class="sidebarViewport">
            <ul class="sidebarMenu">
              <li @click.stop.prevent="TakeLocation(0)" :class="{'on':liArr[0]}">
                <router-link to="/center/information">My information</router-link>
              </li>
              <li @click.stop.prevent="TakeLocation(1)" :class="{'on':liArr[1]}">
                <router-link to="/center/collection">My Collection</router-link>
              </li>
              <li @click.stop.prevent="TakeLocation(2)" :class="{'on':liArr[2]}">
                <router-link to="/center/uploadlist">My Upload</router-link>
              </li>
              <li @click.stop.prevent="TakeLocation(3)" :class="{'on':liArr[3]}">
                <router-link to="/center/setting">My Password</router-link>
              </li>
            </ul>
          </section>
        </div>
        <div class="sidebarUploadContainer">
          <!--<button>Upload it!</button>-->
          <UploadBtn></UploadBtn>
        </div>
      </div>
    </div>
    <div class="settingContent">
      <router-view></router-view>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import UploadBtn from '../uploadBtn/uploadBtn.vue'
  import {GetLocalUserId} from '../../lib/js/stroe'
  export default{
    data () {
      return {
        liArr: [true, false, false, false],
        userId: ''
      }
    },
    methods: {
      TakeLocation (item) {
        for (let i = 0; i < 4; i++) {
          this.liArr[i] = false
        }
        this.liArr[item] = true
      },
      initUserId () {
        let user = GetLocalUserId()
        this.userId = user.userid
      }
    },
    created () {
      this.initUserId()
    },
    components: {
      UploadBtn
    }
  }
</script>

<style rel="stylesheet/stylus" lang="stylus">
  @import "../../style/components/center.styl";
</style>
