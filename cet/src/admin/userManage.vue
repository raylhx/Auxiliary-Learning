<template>
  <div id="user-wrapper">
    <el-container>
      <el-header class="header-wrapper">
        <adminHeader></adminHeader>
      </el-header>
      <el-main>
        <div style="margin-top: 15px; margin-left: 20px;width: 350px;">
          <el-input placeholder="请输入内容" v-model="search" class="input-with-select">
            <el-select v-model="select" slot="prepend" placeholder="请选择">
              <el-option label="班级号" value="1"></el-option>
              <el-option label="班级名称" value="2"></el-option>
              <el-option label="学号" value="3"></el-option>
              <el-option label="姓名" value="4"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
        <div class="reading-wrapper">
            <el-table
              border
              :data="tableData"
              style="width: 100%">
              <el-table-column
                prop="userid"
                label="学号"
                width="180">
              </el-table-column>
              <el-table-column
                prop="username"
                label="姓名"
                width="180">
              </el-table-column>
              <el-table-column
                label="状态管理"
                width="180">
                <template slot-scope="scope">
                  <el-switch
                    active-text="正常"
                    inactive-text="禁用"
                    v-model="scope.row.statusM"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                  </el-switch>
                </template>
              </el-table-column>
              <el-table-column
                prop="resetM"
                label="重置密码">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">重置密码</el-button>
                </template>
              </el-table-column>
            </el-table>
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
        search: '',
        select: '',
        value1: false,
        tableData: [{
          userid: '141544101',
          username: '曹艺',
          statusM: 'true'
        }, {
          userid: '141544102',
          username: '陈诗琦',
          statusM: 'true'
        }, {
          userid: '141544103',
          username: '陈依静',
          statusM: 'true'
        }, {
          userid: '141544104',
          username: '陈月娜',
          statusM: 'true'
        }, {
          userid: '141544105',
          username: '丁杨梓',
          statusM: 'true'
        }, {
          userid: '141544106',
          username: '冯小郑',
          statusM: 'true'
        }, {
          userid: '141544107',
          username: '黄小镔',
          statusM: 'true'
        }, {
          userid: '141544108',
          username: '赖会霞',
          statusM: 'true'
        }, {
          userid: '141544109',
          username: '李嘉怡',
          statusM: 'true'
        }, {
          userid: '141544110',
          username: '彭榆意',
          statusM: 'true'
        }]
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
  @import "userManage.styl";
</style>
