<template>
  <div class="changeBG">
    <div id="upLoadList">
      <div class="container-wrapper">
        <div class="alert-wrapper" v-if="showUploadListTip">
          <el-alert
            title="小提示"
            type="info"
            :description="uploadListTip"
            :closable="false"
            show-icon>
          </el-alert>
        </div>
        <ul class="note-list">
          <li class="list" v-for="item in passageList">
            <router-link :to="'/center/upload/' + item.article_id" class="title" target="_blank">
              <p>Upload {{item.article_id}}</p>
            </router-link>
            <div class="content">
              <a class="avatar">
                <img src="../../assets/components/center/123.jpg">
              </a>
              <div class="abstract-wrapper">
                <div class="abstract">
                  <p>{{item.description}}..</p>
                </div>
                <div class="meta">
                  <span>Type <i>{{item.type}}</i></span>
                  <span>Count <i>{{item.countWords}}</i></span>
<!--                  <span>Source <i>{{item.source}}</i></span>
                  <span>Collect <i>{{item.collectednumber}}</i></span>
                  <span>Like <i>{{item.tagsnumber}}</i></span>-->
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <backup></backup>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  import Axios from 'axios'
  import backup from '../backup/backup.vue'
  export default{
    data () {
      return {
        passageList: [],
        typeId: 'cet4',
        totalList: 0,
        currentPage: 1,
        pageSize: 10,
        uploadListTip: '',
        showUploadListTip: false
      }
    },
    methods: {
      initUploadArticleGetList () {
        // 初始化获取个人上传列表
        Axios.post('/sys/user/uploadTextList').then((res) => {
          let listResult = res.data
          if (listResult.code === 201) {
            // 出现上传为空情况
            if (listResult.msg) {
              this.collectTip = listResult.msg
              this.showUploadListTip = true
            } else {
              // 上传文章不为空的情况
              this.showUploadListTip = false
              this.passageList = listResult.data
              this.showUploadListTip = false
            }
          } else {
            this.$message({
              type: 'error',
              message: listResult.msg,
              showClose: true
            })
          }
        }).catch((error) => {
          console.log(error)
        })
      }
    },
    components: {
      backup
    },
    mounted () {
      this.initUploadArticleGetList()
    }
  }
</script>

<style rel="stylesheet/stylus" lang="stylus">
  @import "../../style/components/upLoadList.styl";
</style>
