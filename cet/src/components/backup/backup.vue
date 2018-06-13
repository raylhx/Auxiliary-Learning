<template>
<div class="top" @click="getTop" v-show="isShow">
  <i class="el-icon-caret-top"></i>
</div>
</template>

<script type="text/ecmascript-6">
export default{
  data () {
    return {
      isShow: false,
      timer: null
    }
  },
  props: {
  },
  methods: {
    getTop () {
      this.timer = setInterval(function () {
        let osTop2 = document.documentElement.scrollTop || document.body.scrollTop
        let speed = Math.floor(-osTop2 / 6)
        document.documentElement.scrollTop = document.body.scrollTop = osTop2 + speed
        if (osTop2 === 0) {
          clearInterval(this.timer)
        }
      }, 30)
    },
    showIcon () {
      // 滚动条位置
      let osTop1 = document.documentElement.scrollTop || document.body.scrollTop
      // 用户可视区高度
      let clientHeight = document.documentElement.clientHeight
      if (osTop1 >= clientHeight) {
        this.isShow = true
      } else {
        this.isShow = false
      }
    }
  },
  mounted () {
    // 初始化加载给window配上scroll事件
    window.addEventListener('scroll', this.showIcon)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.showIcon)
  }
}
</script>

<style rel="stylesheet/stylus" lang="stylus">
.top
  background-color: #fff
  position: fixed
  right: 90px
  bottom: 60px
  width: 40px
  height: 40px
  border-radius: 20px
  cursor: pointer
  transition: .3s
  box-shadow: 0 0 6px rgba(0, 0, 0, .12)
  z-index: 5
  i
    color: #409eff
    display: block
    line-height: 40px
    text-align: center
    font-size: 18px

</style>
