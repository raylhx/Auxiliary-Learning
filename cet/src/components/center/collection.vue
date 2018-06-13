<template>
  <div class="changeBG">
    <div id="collection">
      <div class="container-wrapper">
        <div class="alert-wrapper" v-if="showCollectTip">
          <el-alert
            title="小提示"
            type="info"
            :description="collectTip"
            :closable="false"
            show-icon>
          </el-alert>
        </div>
        <ul class="note-list">
          <li class="list" v-for="item in passageList">
            <router-link :to="'/cet4/analysis/' + item.title" class="title" target="_blank">
              <p> Reading comprehension in {{item.router}}</p>
            </router-link>
            <div class="content">
              <a class="avatar">
                <img src="../../assets/components/center/123.jpg">
              </a>
              <div class="abstract-wrapper">
                <div class="abstract">
                  <p>{{item.desription}}..</p>
                </div>
                <div class="meta">
                  <span>Count <i>{{item.countWords}}</i></span>
                  <span>Source <i>{{item.source}}</i></span>
                  <span>Collect <i>{{item.collectednumber}}</i></span>
                  <span>Like <i>{{item.tagsnumber}}</i></span>
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
  import {HandelTitleString} from '../../lib/js/util.js'
  export default{
    data () {
      return {
        passageList: [],
        typeId: 'cet4',
        totalList: 0,
        currentPage: 1,
        pageSize: 10,
        collectTip: '',
        showCollectTip: false
      }
    },
    methods: {
      initCollectArticleGetList () {
        // 初始化获取个人收藏列表
        Axios.post('/sys/users/collectArticleList').then((res) => {
          let listResult = res.data
          if (listResult.code === 201) {
            // 出现收藏为空情况
            if (listResult.msg) {
              this.collectTip = listResult.msg
              this.showCollectTip = true
            } else {
              // 收藏文章不为空的情况
              this.showCollectTip = false
              let listData = listResult.data
              for (let i = 0; i < listData.length; i++) {
                listData[i].router = HandelTitleString(listData[i].title)
              }
              this.passageList = listData
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
      this.initCollectArticleGetList()
    }
  }
</script>

<style rel="stylesheet/stylus" lang="stylus">
  @import "../../style/components/collection.styl";
</style>
