<template>
  <div id="index">
    <el-container>
      <el-header class="header-wrapper">
        <navheader></navheader>
      </el-header>
      <el-main>
        <div class="text-index-wrapper">
          <div class="src-box">
            <textarea v-model="sentence"
                      class="input-text"
                      placeholder="Please input your sentence"
                      autofocus
                      maxlength="250"
                      @input="DescInput"></textarea>
            <div class="textnumber-tooltip">{{txtNum}}/250</div>
            <el-button type="primary" :loading="loadingFlag" @click="GetAnalysis">Analyze It !</el-button>

          </div>
          <div class="res-box">
            <div class="out-wrapper">
              <div class="s-origin item">
                <i class="el-icon-document"></i>
                <span class="title">原句</span>
                <div class="origin-text">
                  {{sentence}}
                </div>
              </div>
              <div class="s-range item">
                <i class="el-icon-info"></i>
                <span class="title">范围</span>
                <div class="range-text">
                  {{sentenceLevel}}
                </div>
              </div>
              <div class="s-type item">
                <i class="el-icon-search"></i>
                <span class="title">类型</span>
                <div class="type-text">
                  <span v-for="type in sentenceType" class="stype">{{type}} </span>
                </div>
              </div>
              <!--<div class="s-analysis item">
                <i class="el-icon-edit"></i>
                <span class="title">分析</span>
                <div class="analysis" v-html="markText">
                  {{markText}}
                </div>
              </div>-->
            </div>
          </div>
          <div class="analyze-box">
            <i class="icon_quill icon"></i>
            <div class="analysis" v-html="markText">
              {{markText}}
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script type="text/ecmascript-6">
  import navheader from '../header/navheader'
  import Axios from 'axios'
  export default{
    data () {
      return {
        // 页初始化写死
        sentence: `I don't let myself down, because I have met you in my most gorgeous age.`,
        sentenceLevel: '四级',
        sentenceType: ['状语从句'],
        sentenceAnalyseResult: '',
        markText: `<span class="subject tooltip tooltip-effect-1">I<span class="tooltip-content">主语1</span></span> <span class="predicate tooltip tooltip-effect-2">don<span class="tooltip-content">谓语1</span></span> 't <span class="predicate tooltip tooltip-effect-2">let<span class="tooltip-content">谓语1</span></span> <span class="object tooltip tooltip-effect-4">myself<span class="tooltip-content">宾语1</span></span> <span class="adverbial">[ </span><span class="tooltip tooltip-effect-6">down<span class="tooltip-content">状语1</span></span><span class="adverbial"> ]</span> , because <span class="subject tooltip tooltip-effect-1">I<span class="tooltip-content">主语2</span></span> <span class="predicate tooltip tooltip-effect-2">have<span class="tooltip-content">谓语2</span></span> <span class="predicate tooltip tooltip-effect-2"><span class="adverbial">[ </span><span class="tooltip tooltip-effect-6">met<span class="tooltip-content">状语2</span></span><span class="adverbial"> ]</span><span class="tooltip-content">谓语2</span></span> <span class="object tooltip tooltip-effect-4">you<span class="tooltip-content">宾语2</span></span> in my <span class="adverbial">[ </span><span class="tooltip tooltip-effect-6">most<span class="tooltip-content">状语2</span></span><span class="adverbial"> ]</span> gorgeous age.`,
        loadingFlag: false,
        txtNum: 200
      }
    },
    methods: {
      GetAnalysis () {
        if (this.sentence !== '') {
          this.loadingFlag = true
          Axios.get('/sentence/indexAnalaze?sentence=' + this.sentence).then((res) => {
            let resultData = res.data
            if (resultData.code === 201) {
              this.sentenceLevel = resultData.sentenceLevel
              this.sentenceType = resultData.sentenceType
              this.TakeMark(this.sentence, resultData.sentenceAnalyseResult)
              this.loadingFlag = false
            } else {
              this.markText = 'No Result'
            }
          }).catch((error) => {
            this.loadingFlag = false
            console.log(error)
          })
        } else {
          this.$message({
            type: 'info',
            message: 'Sentence is empty'
          })
          this.loadingFlag = false
        }
      },
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
            // targetArr = entity[i].sentenceInfoEntity[item].split('-')
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
          // 方法1 加括号
          /* if (!entity[i].mainSentenceFlag) {
           clausesStart = entity[i].indexScope[0]
           clausesEnd = entity[i].indexScope[1]
           originText[clausesStart] = '<i style="color: #FF33CC;font-size: 20px;font-style: normal;">「 </i>' + originText[clausesStart]
           originText[clausesEnd] = originText[clausesEnd] + '<i style="color: #FF33CC;font-size: 20px;font-style: normal;"> 」</i>'
           } */
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
      DescInput () {
        this.sentenceLevel = 'None'
        this.sentenceType = ['None']
        this.markText = 'This is Result.'
        // 返回还剩余多少数字
        this.txtNum = 250 - this.sentence.length
      }
    },
    watch: {
    },
    components: {
      navheader
    }
  }
</script>

<style rel="stylesheet/stylus" lang="stylus">
  @import "../../style/components/index.styl";
  @import "../../style/common/tooltipCommon.styl";
</style>
