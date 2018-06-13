<template>
  <div id="about">
    <el-container>
      <el-header class="header-wrapper">
        <navheader></navheader>
      </el-header>
      <el-main>
        <div class="about-wrapper">
          <el-tabs tab-position="left" type="border-card">
            <el-tab-pane label="Stanford CoreNLP">
              Stanford CoreNLP
            </el-tab-pane>
            <el-tab-pane label="Stanford Parser">
              Stanford Parser
            </el-tab-pane>
            <el-tab-pane label="Stanford NER">
              Stanford NER
            </el-tab-pane>
            <el-tab-pane label="句子成分划分">
              <div class="pane4">
                <p>对于句子成分的分类以薄冰（1998）教授所编写的《薄冰英语语法》为依据，所定义的符号主要考虑简便和易记，具体说来如下：</p>
                <p>在网站中，为了让用户能够在快速地区分句子成分，将主语的标志改为红色字体，谓语的标志改为黄色字体以及波浪线</p>
                <ul>
                  <li>
                    <el-tag>主语</el-tag>
                    <span>双横线，记忆：主语是句子中最重要的成分，用两条横线以重视之</span>
                  </li>
                  <li>
                    <el-tag type="success">谓语</el-tag>
                    <span>(含系动词)波浪线，记忆：谓语一般说来是动词，波动而成</span>
                  </li>
                  <li>
                    <el-tag type="info">宾语</el-tag>
                    <span>实横线，记忆：宾客的请帖经常在被邀请人处空出实横线以填人名</span>
                  </li>
                  <li>
                    <el-tag type="warning">表语</el-tag>
                    <spa>虚横线，记忆：跟在系动词后面，还有些动荡不安，于是虚之</spa>
                  </li>
                  <li>
                    <el-tag type="danger">定语</el-tag>
                    <span>英文括号，记忆：定语一般修饰名词，所以倾向于可有可无，括之</span>
                  </li>
                  <li>
                    <el-tag>状语</el-tag>
                    <span>中括号，记忆：中国人的状态比较中庸，故中括号</span>
                  </li>
                  <li>
                    <el-tag type="success">补语</el-tag>
                    <span>单书名号，记忆：补充说明主语或宾语，一般不能单独出现</span>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
            <el-tab-pane label="联系我们">角色管理</el-tab-pane>
            <el-tab-pane label="友情链接">定时任务补偿</el-tab-pane>
          </el-tabs>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script type="text/ecmascript-6">
  import navheader from '../header/navheader'
  export default {
    components: {
      navheader
    }
  }
</script>

<style rel="stylesheet/stylus" lang="stylus">
  @import "../../style/components/about.styl";
</style>
