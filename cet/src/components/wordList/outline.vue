<template>
  <div id='voca'>
    <leftNav v-on:getMenuTag='ToGetList' :requestType="this.$route.params.type"></leftNav>
    <div class='container-wrapper'>
      <div class="container">
        <div class="banner-wrapper">
          <div class="nav">
            <i class="el-icon-location icon"></i>
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
              <el-breadcrumb-item :to="'/'+this.$route.params.type">{{this.$route.params.type}}</el-breadcrumb-item>
              <el-breadcrumb-item>{{this.$route.params.range}}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div class="banner">
            <img src="../../assets/components/cet4/banner4_1.png">
          </div>
        </div>
        <!--友好提示语句-->
        <el-alert
          title="Please select the first letter"
          type="info"
          close-text="O I see~">
        </el-alert>
        <!--字母-->
        <div class="initials">
          <div class="title">
            <h3></h3>
          </div>
          <div @click.stop.prevent="getLetterList('A')" class="letterItem">
            <el-tag>A</el-tag>
          </div>
          <div @click.stop.prevent="getLetterList('B')" class="letterItem">
            <el-tag type="success">B</el-tag>
          </div>
          <div @click.stop.prevent="getLetterList('C')" class="letterItem">
            <el-tag type="info">C</el-tag>
          </div>
          <div @click.stop.prevent="getLetterList('D')" class="letterItem">
            <el-tag type="warning">D</el-tag>
          </div>
          <div @click.stop.prevent="getLetterList('E')" class="letterItem">
            <el-tag type="danger">E</el-tag>
          </div>
          <div @click.stop.prevent="getLetterList('F')" class="letterItem">
            <el-tag type="success">F</el-tag>
          </div>
          <div @click.stop.prevent="getLetterList('G')" class="letterItem">
            <el-tag type="info">G</el-tag>
          </div>
          <div @click.stop.prevent="getLetterList('H')" class="letterItem">
            <el-tag type="warning">H</el-tag>
          </div>
          <div @click.stop.prevent="getLetterList('I')" class="letterItem">
            <el-tag type="danger">I</el-tag>
          </div>
          <div @click.stop.prevent="getLetterList('J')" class="letterItem">
            <el-tag>J</el-tag>
          </div>
          <div @click.stop.prevent="getLetterList('K')" class="letterItem">
            <el-tag type="info">K</el-tag>
          </div>
          <div @click.stop.prevent="getLetterList('L')" class="letterItem">
            <el-tag type="warning">L</el-tag>
          </div>
          <div @click.stop.prevent="getLetterList('M')" class="letterItem">
            <el-tag type="danger">M</el-tag>
          </div>
          <div @click.stop.prevent="getLetterList('N')" class="letterItem">
            <el-tag @click.stop.prevent="getLetterList(N)">N</el-tag>
          </div>
          <div @click.stop.prevent="getLetterList('O')" class="letterItem">
            <el-tag type="success">O</el-tag>
          </div>
          <div @click.stop.prevent="getLetterList('P')" class="letterItem">
            <el-tag type="info">P</el-tag>
          </div>
          <div @click.stop.prevent="getLetterList('Q')" class="letterItem">
            <el-tag type="warning">Q</el-tag>
          </div>
          <div @click.stop.prevent="getLetterList('R')" class="letterItem">
            <el-tag type="danger">R</el-tag>
          </div>
          <div @click.stop.prevent="getLetterList('S')" class="letterItem">
            <el-tag>S</el-tag>
          </div>
          <div @click.stop.prevent="getLetterList('T')" class="letterItem">
            <el-tag type="success">T</el-tag>
          </div>
          <div @click.stop.prevent="getLetterList('U')" class="letterItem">
            <el-tag type="info">U</el-tag>
          </div>
          <div @click.stop.prevent="getLetterList('V')" class="letterItem">
            <el-tag type="warning">V</el-tag>
          </div>
          <div @click.stop.prevent="getLetterList('W')" class="letterItem">
            <el-tag type="danger">W</el-tag>
          </div>
          <div @click.stop.prevent="getLetterList('X')" class="letterItem">
            <el-tag>X</el-tag>
          </div>
          <div @click.stop.prevent="getLetterList('Y')" class="letterItem">
            <el-tag type="success">Y</el-tag>
          </div>
          <div @click.stop.prevent="getLetterList('Z')" class="letterItem">
            <el-tag type="info">Z</el-tag>
          </div>
        </div>
        <!--请求出错的提示-->
        <el-alert
          v-show="warnText"
          title="Wrong Request"
          type="error"
          description="Please check the network settings and refresh the page"
          show-icon>
        </el-alert>
        <el-alert
          v-show="tipText"
          title="Nothing"
          type="error"
          description="Without this type of temporary word,Please choose another"
          show-icon>
        </el-alert>
        <div class="list-wrapper">
          <el-table
            ref="singleTable"
            :data="tableData"
            highlight-current-row
            style="width: 100%">
            <el-table-column
              type="index"
              width="50">
            </el-table-column>
            <el-table-column
              property="name"
              label="Word"
              width="180">
            </el-table-column>
            <el-table-column
              property="value"
              label="Meaning">
            </el-table-column>
          </el-table>
          <div class="page">
            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10, 20, 30]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type='text/ecmascript-6'>
  import
    Axios from 'axios'
  import leftNav from '../leftnav/leftnav.vue'
  export default{
    data () {
      return {
        warnText: false,
        tipText: false,
        tableData: [],
        currentPage: 1,
        total: 0,
        pageSize: 10,
        tableDataAll: []
      }
    },
    methods: {
      // 当页数改变事件 默认页数大小是10
      handleSizeChange (val) {
        this.pageSize = val
        console.log('pageSize ' + this.pageSize)
        this.handleCurrentChange(1)
      },
      // 当选择某页发生的变化 当前页默认是1
      handleCurrentChange (val) {
        let page = val
        console.log('page ' + page)
        let size = this.pageSize
        let temp = []
        for (let i = (page - 1) * size; i <= (page - 1) * size + (size - 1); i++) {
          temp.push(this.tableDataAll[i])
        }
        this.tableData = temp
      },
      // 拿到子组件中的侧栏标签，用于发请求拿到list
      ToGetList (tag) {
      },
      getLetterList (l) {
        let letter = l
        let type = this.$route.params.type
        let range = this.$route.params.range
        console.log(letter)
        // 参数在后面可以能有变
        Axios.get('/sys/vocabularies/' + range + '?type=' + type + '&letter=' + letter).then((res) => {
          let result = res.data
          if (result.code === 201) {
            // 成功
            // this.total = result.rows.length
            this.tableDataAll = result.rows
            this.total = this.tableDataAll.length
            this.currentPage = 1
            this.handleSizeChange(10)
            // 如果该首字母没有单词则显示对应的提示
            this.tipText = !this.total
          } else {
            // 错误
            this.warnText = true
          }
        }).catch((error) => {
          console.log(error)
        })
      }
    },
    components: {
      leftNav
    },
    created () {
    },
    mounted () {
      // 初始化
      this.getLetterList('a')
    },
    watch: {
      // 监听路由
      '$route' (to, from) {
        this.getLetterList('a')
      }
    }
  }
</script>

<style rel='stylesheet/stylus' lang='stylus'>
  @import '../../style/components/outline.styl';
</style>
