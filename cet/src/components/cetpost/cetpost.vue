<template>
  <div id='cetpost'>
    <leftNav v-on:getMenuTag='ToGetList' requestType="cetpost"></leftNav>
    <div class='container'>
      <div class='carousel-wrapper'>
        <el-carousel :interval='4000' type='card' height='200px'>
          <el-carousel-item v-for='item in imageArray' :key='item'>
            <img :src='item' width="100%" height="100%">
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="main-wrapper">
        <div class="list-wrapper">
          <ul class="note-list">
            <div class="nav-wrapper">
              <i class="el-icon-location icon"></i>
              <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
                <el-breadcrumb-item>Post</el-breadcrumb-item>
                <el-breadcrumb-item>{{paramTag}}</el-breadcrumb-item>
              </el-breadcrumb>
            </div>
            <el-alert
              v-if="NoListTooltip"
              title="小提示"
              type="info"
              description="文章正在月球维修中，请稍后再试"
              show-icon>
            </el-alert>
            <li class="list" v-for="item in passageList">
              <router-link :to="'cetpost/analysis/' + item.title" class="title" target="_blank">
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
                    <span>Difficulty <i>{{item.type}}</i></span>
                    <span>Count <i>200</i></span>
                    <span>Source <i>人文社会</i></span>
                  </div>
                </div>
              </div>
            </li>
            <div class="page">
              <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="10"
                layout="total, prev, pager, next"
                :total="totalList">
              </el-pagination>
            </div>
          </ul>
        </div>
        <div class="rightNav">
          <div class="word-wrapper">
            <div class="title">Daily words</div>
            <div class="word">{{word.name}}</div>
            <div class="trans">
              <p>{{word.value}}</p>
            </div>
          </div>
          <UploadBtn></UploadBtn>
        </div>
      </div>
    </div>
    <backup></backup>
  </div>
</template>

<script type='text/ecmascript-6'>
  import Axios from 'axios'
  import leftNav from '../leftnav/leftnav.vue'
  import UploadBtn from '../uploadBtn/uploadBtn.vue'
  import backup from '../backup/backup.vue'
  import {HandelTitleString} from '../../lib/js/util.js'
  export default{
    data () {
      return {
        paramTag: 'All',
        user: '',
        imageArray: ['../../../static/cet4/carousel1.jpg', '../../../static/cet4/carousel2.jpg', '../../../static/cet4/carousel3.jpg', '../../../static/cet4/carousel4.jpg', '../../../static/cet4/carousel5.jpg', '../../../static/cet4/carousel6.jpg'],
        passageList: [],
        typeId: 'cetpost',
        totalList: 0,
        currentPage: 1,
        pageSize: 10,
        // 总数
        listAllData: [],
        word: {
          name: '',
          value: ''
        }
      }
    },
    methods: {
      GetRandomWord () {
        Axios.get('/sys/vocabularies/randomWord').then((res) => {
          // 防止后台出现没有值返回的情况
          if (res.data.length === 0) {
            this.word = {
              name: 'Convinced',
              value: 'adj. 确信的;深信的;有坚定信仰的'
            }
          }
          this.word = res.data
        }).catch((error) => {
          console.log(error)
        })
      },
      // 拿到子组件中的侧栏标签，用于发请求拿到list
      ToGetList (tag) {
        this.paramTag = tag
        let requestUrl = 'articles/cetpost/'
        if (/[a-z]+/gi.test(this.paramTag)) {
          // 年份请求地址
          Axios.post(requestUrl + tag).then((res) => {
            let result = res.data
            if (result.length > 0) {
              this.NoListTooltip = false
              this.listAllData = result
              this.totalList = result.length
              for (let i = 0; i < result.length; i++) {
                result[i].router = HandelTitleString(result[i].title)
              }
              this.currentPage = 1
              this.handleCurrentChange(1)
            } else {
              this.NoListTooltip = true
              this.passageList = []
              this.totalList = 0
            }
          }).catch((error) => {
            console.log(error)
          })
        } else {
          Axios.get(requestUrl + tag).then((res) => {
            let result = res.data
            if (result.length > 0) {
              this.NoListTooltip = false
              this.listAllData = result
              this.totalList = result.length
              for (let i = 0; i < result.length; i++) {
                result[i].router = HandelTitleString(result[i].title)
              }
              this.currentPage = 1
              this.handleCurrentChange(1)
            } else {
              this.NoListTooltip = true
              this.passageList = []
              this.totalList = 0
            }
          }).catch((error) => {
            console.log(error)
          })
          // 中图法请求地址
        }
      },
      // 当页数改变事件 默认页数大小是10
      handleSizeChange (val) {
        console.log(val)
      },
      // 当选择某页发生的变化 当前页默认是1
      handleCurrentChange (val) {
        let page = val
        let size = 10
        let temp = []
        let start = (page - 1) * size
        let end = (page - 1) * size + (size - 1)
        // 需要判断是否为最后一页
        if (page === Math.floor(this.totalList / 10 + 1)) {
          end = this.totalList - 1
        }
        for (let i = start; i <= end; i++) {
          temp.push(this.listAllData[i])
        }
        this.passageList = temp
      },
      initGetList () {
        // 初始化获取列表，不涉及参数
        // 接口参数可能还有待调整
        Axios.get('/articles/cetpost').then((res) => {
          let result = res.data
          this.listAllData = result
          this.totalList = result.length
          for (let i = 0; i < result.length; i++) {
            result[i].router = HandelTitleString(result[i].title)
          }
          this.currentPage = 1
          this.handleCurrentChange(1)
        }).catch((error) => {
          console.log(error)
        })
      }
    },
    components: {
      leftNav,
      UploadBtn,
      backup
    },
    created () {
      this.initGetList()
      // 获取随机单词
      this.GetRandomWord()
    }
  }
</script>

<style rel='stylesheet/stylus' lang='stylus'>
  /* @import '../../style/components/cetpost.styl'; */
  @import '../../style/components/cetCommon.styl';
</style>
