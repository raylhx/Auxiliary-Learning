<template>
  <div id="analysis">
    <el-container>
      <el-header class="header-wrapper">
        <navHeader></navHeader>
      </el-header>
      <el-main>
        <div class="reading-wrapper">
          <div class="title">
            <h1 id="articleTitle">{{id}} Upload Article</h1>
            <div class="meta">
              <span>Type <i>{{articleInfo.type}}</i></span>
              <span>Count <i>{{articleInfo.countWords}}</i></span>
              <!--<span>Source <i>{{articleInfo.source}}</i></span>-->
              <!--              <span>Collect <i>{{articleInfo.collected_number}}</i></span>-->
              <!--              <span>Like <i>{{articleInfo.tags_number}}</i></span>-->
              <!--<el-switch v-model="collection" active-text="Collect" @change="ToggleCollect"></el-switch>-->
              <!--              <div class="switchBtn" @click="ToggleCollect">
                              <i class="icon_star-full" :class="{'active':collection}">Collect</i>
                            </div>-->
            </div>
          </div>
          <el-alert
            title="鼠标在句子上停留3秒以上会有好事发生哦~"
            type="success"
            show-icon
            close-text="知道了">
          </el-alert>
          <div class="article-wrapper">
            <p v-for="par in articleContent"><span id="GPS"></span>
              <span v-for="item in par" @mouseover="showAnalysis($event,item)"
                    @mouseleave="HandleTimeout()">{{item}}</span>
            </p>
          </div>

        </div>
      </el-main>
    </el-container>
    <transition name="el-zoom-in-top">
      <div id="plain"
           :class="[isShow?'displayPlain':'hidePlain']"
           class="text-wrapper"
           @mouseleave="ToggleShow"
           @mouseover="SuspensionDiv()">
        <div
          class="container"
          v-loading="loading"
          element-loading-text="Loading"
          element-loading-spinner="el-icon-loading">
          <div class="text" v-html="markText">{{markText}}</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import navHeader from '../header/navheader'
  import {getElementPosition, HandelTitleString} from '../../lib/js/util'
  import Axios from 'axios'
  export default {
    data () {
      return {
        id: this.$route.params.aId,
        // collection: false,
        userRate: null,
        readonly: false,
        // favourite: false,
        isShow: false,
        loading: true,
        timerId: 0,
        articleContent: [],
        leftP: 0,
        markText: '',
        // title: '',
        isHoverDiv: false,
        articleInfo: {
          collected_number: 0,
          countWords: 0,
          source: '',
          tags_number: 0,
          type: '',
          article_content: ''
        }
        // 点赞是否频繁
        // collectClick: true,
        // favouriteClick: true
      }
    },
    methods: {
      // 点击收藏按钮触发
      ToggleCollect () {
        if (this.collectClick) {
          this.collectClick = false
          this.collection = !this.collection
          Axios.get('/sys/users/collectArticle?articleId=' + this.id + '&flag=' + this.collection).then((res) => {
            let collectResult = res.data
            if (collectResult.code === 201) {
              this.$message({
                type: 'success',
                message: collectResult.msg,
                showClose: true
              })
            } else if (collectResult.code === 202) {
              this.$message({
                type: 'success',
                message: collectResult.msg,
                showClose: true
              })
            } else {
              this.$message({
                type: 'error',
                message: collectResult.msg,
                showClose: true
              })
            }
          }).catch((error) => {
            console.log(error)
          })
          let timer1 = setTimeout(() => {
            this.collectClick = true
          }, 5000)
          console.log(timer1)
        } else {
          this.$message({
            type: 'warning',
            message: '亲，请稍后再点哦~'
          })
        }
      },
      ToggleFavorite () {
        // 根据用户id显示对应的赞的颜色
        if (this.favouriteClick) {
          this.favouriteClick = false
          this.favourite = !this.favourite
          Axios.get('/sys/users/tagArticle?articleId=' + this.id + '&flag=' + this.favourite).then((res) => {
            let collectResult = res.data
            if (collectResult.code === 201) {
              this.$message({
                type: 'success',
                message: collectResult.msg,
                showClose: true
              })
            } else if (collectResult.code === 202) {
              this.$message({
                type: 'success',
                message: collectResult.msg,
                showClose: true
              })
            } else {
              this.$message({
                type: 'error',
                message: collectResult.msg,
                showClose: true
              })
            }
          }).catch((error) => {
            console.log(error)
          })
          let timer2 = setTimeout(() => {
            this.favouriteClick = true
          }, 5000)
          console.log(timer2)
        } else {
          this.$message({
            type: 'warning',
            message: '亲，请稍后再点哦~'
          })
        }
      },
      // 判断用户行为
      SuspensionDiv () {
        this.isHoverDiv = true
      },
      // 处理显示
      ToggleShow () {
        this.isShow = !this.isShow
        // 打印取消的情况
        this.loading = true
        this.isHoverDiv = false
      },
      // 处理定时器
      HandleTimeout () {
        clearTimeout(this.timerId)
      },
      // 显示悬浮div
      showAnalysis (event, sentence) {
        // 设置显示坐标position
        // 因为用户在使用网页的时候容易移动窗口大小，导致无法定位，所以每次显示悬浮框都需要重新定位
        this.initPosition()
        let elePosition = getElementPosition(event.currentTarget)
        let plain = document.getElementById('plain')
        this.timerId = setTimeout(() => {
          // 处理操作，显示以及加载
          this.isShow = true
          this.loading = true
          plain.style.top = elePosition.top + 24 + 'px'
          plain.style.left = this.leftP + 'px'
          // 设置定时器
          Axios.get('/sentence/analaze?sentence=' + sentence).then((res) => {
            let result = res.data
            if (result.code === 201) {
              this.loading = false
              this.TakeMark(sentence, result.data)
            } else {
              this.loading = true
              this.$message({
                message: '加载出错',
                type: 'error',
                showClose: true
              })
            }
          }).catch((error) => {
            console.log('error' + error)
          })
        }, 1500)
      },
      getArticleContent () {
        let params = this.$route.params.aId
        Axios.post('/sys/user/uploadTextList/' + params).then((res) => {
          let userArticleResult = res.data
          if (userArticleResult.code === 201) {
            this.articleInfo = userArticleResult.data
            let data = this.articleInfo.article_content
            // 文本处理
            let result = data.split('***')
            for (let i = 0; i < result.length; i++) {
              result[i] = result[i].split('*')
            }
            this.articleContent = result
          } else {

          }
        }).catch((error) => {
          console.log('error:' + error)
        })
      },
      // 添加标记
      TakeMark (origin, info) {
        // 返回信息
        let entity = info
        // 处理原始句子k
        let re1 = /[']+/g
        let re2 = /[,]+/g
        let re3 = /["]+/g
        let originText = origin.replace(re1, function (str) {
          let result = ''
          for (let j = 0; j < str.length; j++) {
            result += ' \''
          }
          return result
        })
        originText = originText.replace(re2, function (str) {
          let result = ''
          for (let j = 0; j < str.length; j++) {
            result += ' ,'
          }
          return result
        })
        originText = originText.replace(re3, function (str) {
          let result = ''
          for (let j = 0; j < str.length; j++) {
            result += '" '
          }
          return result
        })
        originText = originText.split(' ')
        let markClass = ''
        let targetArr = []
        let target = ''
        let subscript = []
        // 从句处理变量
        let clausesTxt = ''
        // 从句开始下标 从句结束下标
        let clausesStart = 0
        let clausesEnd = 0
        for (let i = 0; i < entity.length; i++) {
          // 取出entity的每个子项item
          // 首先判断是否为从句，进行悬浮小球文字修改 为从句则使用“从句” 无则使用‘’空
          clausesTxt = entity[i].mainSentenceFlag === 'true' ? '' : '从句'
          // 成分处理
          for (let item in entity[i].sentenceInfoEntity) {
            markClass = item
            targetArr = entity[i].sentenceInfoEntity[item]
            for (let j = 0; j < targetArr.length; j++) {
              subscript = targetArr[j].split('-')
              target = subscript.pop() - 1
              switch (markClass) {
                case 'subject':
                  originText[target] = `<span class="${markClass} tooltip tooltip-effect-1">${originText[target]}<span class="tooltip-content">${clausesTxt}主语</span></span>`
                  break
                case 'predicate':
                  originText[target] = `<span class="${markClass} tooltip tooltip-effect-2">${originText[target]}<span class="tooltip-content">${clausesTxt}谓语</span></span>`
                  break
                case 'object':
                  originText[target] = `<span class="${markClass} tooltip tooltip-effect-4">${originText[target]}<span class="tooltip-content">${clausesTxt}宾语</span></span>`
                  break
                case 'predicative':
                  originText[target] = `<span class="${markClass} tooltip tooltip-effect-5">${originText[target]}<span class="tooltip-content">${clausesTxt}表语</span></span>`
                  break
                case 'attributive':
                  originText[target] = `<span class="${markClass}">( </span><span class="tooltip tooltip-effect-3">${originText[target]}<span class="tooltip-content">${clausesTxt}定语</span></span><span class="${markClass}"> )</span>`
                  break
                case 'adverbial':
                  originText[target] = `<span class="${markClass}">[ </span><span class="tooltip tooltip-effect-6">${originText[target]}<span class="tooltip-content">${clausesTxt}状语</span></span><span class="${markClass}"> ]</span>`
                  break
                case 'complement':
                  originText[target] = `<span class="${markClass}">&lt; </span><span class="tooltip tooltip-effect-6">${originText[target]}<span class="tooltip-content">${clausesTxt}补足语</span></span><span class="${markClass}"> &gt;</span>`
                  break
                default:
                  break
              }
            }
          }
          // 方法2 加底色
          if (entity[i].mainSentenceFlag === 'false') {
            clausesStart = entity[i].indexScope[0] - 1
            clausesEnd = entity[i].indexScope[1] - 1
            originText[clausesStart] = '<div class="clausesClass">' + originText[clausesStart]
            originText[clausesEnd] = originText[clausesEnd] + '</div>'
          }
        }
        // 还原从句
        // 重新拼接
        this.markText = originText.join(' ')
      },
      initPosition () {
        let articleTitle = document.getElementById('articleTitle')
        this.leftP = getElementPosition(articleTitle).left
      },
      // 处理标题
      handleTitle (id) {
        this.title = HandelTitleString(id)
      }
    },
    mounted () {
      this.getArticleContent()
      // 处理标题
      // this.handleTitle(this.$route.params.aId)
    },
    components: {
      navHeader
    }
  }
</script>

<style rel="stylesheet/stylus" lang="stylus">
  @import "../../style/components/analysis.styl";
  @import "../../style/common/tooltipCommon.styl";
</style>
