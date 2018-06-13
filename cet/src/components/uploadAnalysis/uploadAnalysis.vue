<template>
  <div id="index">
    <el-container>
      <el-header class="header-wrapper">
        <navheader></navheader>
      </el-header>
      <el-main>
        <div class="container-wrapper">
          <section class="upload-wrapper">
            <el-collapse v-model="activeNameAccordion" accordion>
              <el-collapse-item title="文件Txt 格式上传" name="1">
                <el-upload
                  class="upload-btn"
                  ref="upload"
                  action="http://localhost:8888/sr/sys/user/upload"
                  :headers="uploadHeader"
                  :limit="1"
                  :on-preview="HandlePreview"
                  :on-remove="HandleRemove"
                  :on-success="GetFileContent"
                  :file-list="fileList"
                  :on-exceed="HandleExceed"
                  :before-upload="BeforeTextUpload"
                  :auto-upload="false">
                  <el-button slot="trigger" size="small" type="primary">Select file</el-button>
                  <el-button style="margin-left: 10px;" size="small" type="success" @click="SubmitUpload">Upload
                  </el-button>
                  <div slot="tip" class="el-upload__tip">Only upload txt file, and no more than 2k</div>
                </el-upload>
              </el-collapse-item>
              <el-collapse-item title="纯文本格式上传" name="2">
                <div class="textarea-wrapper"
                     v-loading="uploadLoading"
                     element-loading-text="Analyzing"
                     element-loading-background="rgba(0, 0, 0, 0.8)">
                  <div class="btn-wrapper">
                    <el-button type="success" size="small" @click.prevent.stop="HandlePureTextUpload">
                      Upload<i class="el-icon-upload el-icon--right"></i>
                    </el-button>
                  </div>
                  <textarea
                    autofocus
                    placeholder="Please copy your text here"
                    v-model="uploadPureText"
                    class="upload-textarea">
                </textarea>
                </div>
              </el-collapse-item>
            </el-collapse>
          </section>
          <div class="arcticle-wrapper" v-if="arcticleShow">
            <div class="info-wrapper">
              <h2 id="articleTitle">Analysis results</h2>
              <span>{{analysisResult}}</span>
            </div>
            <p v-for="pra in articleContent">
              <span @mouseover="ShowAnalysis($event,item)"
                    @mouseleave="HandleTimeout()"
                    v-for="item in pra">
                {{item}}
              </span>
            </p>
          </div>
        </div>
      </el-main>
    </el-container>
    <transition name="el-zoom-in-top">
      <div id="plain"
           :class="[isShow?'displayPlain':'hidePlain']"
           class="upload-text-wrapper"
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
  import navheader from '../header/navheader'
  import Axios from 'axios'
  import {getElementPosition} from '../../lib/js/util'
  import {GetToken} from '../../lib/js/stroe'
  export default {
    data () {
      return {
        // 手风琴效果参数
        activeNameAccordion: '1',
        fileOp: {},
        fileList: [],
        content: 'You can choose file to upload',
        // 纯文本容器
        uploadPureText: '',
        // 返回的文本容器
        articleContent: [],
        analysisResult: '',
        analysisPercentage: 0,
        uploadLoading: false,
        isShow: false,
        loading: true,
        timerId: 0,
        leftP: 0,
        markText: '',
        title: '',
        isHoverDiv: false,
        // 圆形进度条状态
        uploadProgressStatus: '',
        progressShow: false,
        arcticleShow: false,
        uploadLevel: 'Senior high School',
        uploadHeader: {
          'Authorization': GetToken()
        }
      }
    },
    methods: {
      // 分析进度
      HandlePercentage () {
        this.uploadProgressStatus = ''
        this.analysisPercentage = 0
        for (let i = 0; i < 65; i++) {
          this.analysisPercentage = i
        }
      },
      // 处理纯文本上传
      HandlePureTextUpload () {
        if (this.uploadPureText === '') {
          this.$message({
            message: 'Text is empty',
            type: 'error'
          })
          return false
        }
        if (this.uploadPureText.length >= 2000) {
          this.$message({
            message: 'Text is too long',
            type: 'error'
          })
          return false
        }
        // 处理动画效果
        // this.progressShow = true
        this.uploadLoading = true
        // this.HandlePercentage()
        // 防止攻击
        let params = {
          'text': this.uploadPureText
        }
        Axios.post('/sys/user/uploadText/', params).then((res) => {
          let uploadResult = res.data
          if (uploadResult.code === 201) {
            // 处理加载动画结束
            this.uploadLoading = false
            this.$message({
              message: uploadResult.msg,
              type: 'success'
            })
            // 处理文本
            let result = uploadResult.text.split('***')
            for (let i = 0; i < result.length; i++) {
              result[i] = result[i].split('*')
            }
            this.articleContent = result
            this.analysisResult = uploadResult.result
            this.arcticleShow = true
          } else {
            // 动画处理
            this.uploadLoading = false
            this.$message({
              message: uploadResult.msg,
              type: 'error'
            })
          }
        }).catch((error) => {
          console.log('error: ' + error)
        })
        return true
      },
      SubmitUpload () {
        this.$refs.upload.submit()
      },
      HandleRemove (file, fileList) {
      },
      HandlePreview (file) {
      },
      HandleExceed (file, fileList) {
        this.$alert('Only one file can be uploaded', 'Warn', {
          confirmButtonText: 'OK'
        })
      },
      BeforeTextUpload (file) {
        let f = file
        // 判断是大小以及格式
        const isTxt = f.type === 'text/plain'
        const isLt2k = f.size / 1024 < 2
        if (!isTxt) {
          this.$message({
            message: 'Upload file can only be txt format !',
            type: 'error',
            showClose: true
          })
          return false
        }
        if (!isLt2k) {
          this.$message({
            message: 'Upload file size can not exceed 2k !',
            type: 'error',
            showClose: true
          })
          return false
        }
        this.fileOp = file
        return isLt2k && isTxt[isTxt.length - 1]
      },
      // 获取txt文件文本
      GetFileContent (response, file, fileList) {
        if (response.code === 201) {
          // 成功分支,弹框提示
          this.$message({
            message: response.msg,
            type: 'success'
          })
          // 展示
          // 文本处理
          let result = response.text.split('***')
          for (let i = 0; i < result.length; i++) {
            result[i] = result[i].split('*')
          }
          this.articleContent = result
          this.analysisResult = response.result
          this.arcticleShow = true
        } else {
          this.$message({
            message: response.msg,
            type: 'error'
          })
        }
      },
      ShowAnalysis (event, sentence) {
        // 设置显示坐标position
        this.leftP = getElementPosition(document.getElementById('articleTitle')).left
        let elePosition = getElementPosition(event.currentTarget)
        let plain = document.getElementById('plain')
        this.timerId = setTimeout(() => {
          // 处理操作，显示以及加载
          this.isShow = true
          this.loading = true
          plain.style.top = elePosition.top + 20 + 'px'
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
      HandleTimeout () {
        clearTimeout(this.timerId)
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
      }
    },
    mounted () {

    },
    beforeCreate () {
      Axios.post('/sys/user/touchUpload').then((res) => {
      }).catch((error) => {
        console.log(error)
      })
    },
    components: {
      navheader
    }
  }
</script>

<style rel="stylesheet/stylus" lang="stylus">
  @import "../../style/components/upload.styl";
  @import "../../style/common/tooltipCommon.styl";
</style>
