<template>
  <div id="threshold-wrapper">
    <el-container>
      <el-header class="header-wrapper">
        <adminHeader></adminHeader>
      </el-header>
      <el-main>
        <div class="reading-wrapper">
          <div style="margin-bottom: 30px">
            <el-tag>文章单词的超纲率</el-tag>
            <el-slider
              v-model="threshold1"
              :min="10"
              :max="25"
              show-input>
            </el-slider>
          </div>
          <div>
            <el-tag>文章复杂句的比例</el-tag>
            <el-slider
              v-model="threshold2"
              :min="30"
              :max="45"
              show-input>
            </el-slider>
          </div>
        </div>
      </el-main>
    </el-container>

  </div>
</template>

<script type="text/ecmascript-6">
  import adminHeader from './adminHeader'
  export default {
    data () {
      return {
        threshold1: 10,
        threshold2: 30
      }
    },
    methods: {
    },
    mounted () {
      // this.getArticleContent()
      // 处理标题
    },
    components: {
      adminHeader
    }
  }
</script>

<style rel="stylesheet/stylus" lang="stylus">
  @import "threshold.styl";
</style>
