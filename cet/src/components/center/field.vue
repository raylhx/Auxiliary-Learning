<template>
  <div id="field">
    <div class="fieldContainer" :class="{hideClass:editFlag}">
      <div class="level wrapper">
        <label class="title">Reading Level</label>
        <div class="levelContent">
          <el-row>
            <el-col>
              <el-card :body-style="{ padding: '0px' }">
                <img src="../../assets/components/center/cet4.png" class="image">
                <div style="padding: 14px">
                  <span>{{userlevel}}</span>
                  <div class="bottom clearfix">
                    <time class="time">{{ currentDate }}</time>
                    <el-button type="text" class="button">Edit</el-button>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="favourite wrapper">
        <label class="title">Reading Favourite</label>
        <div class="favContent">
          <el-tag v-for="tag in tags">{{tag}}</el-tag>
        </div>
      </div>
    </div>
    <div class="fieldContainer editItem" :class="{showClass:editFlag}">
      <div class="level wrapper levelHeight">
        <label class="title">Reading Level</label>
        <div class="levelContent">
          <el-form>
            <el-form-item>
              <el-radio-group v-model="userlevel">
                <el-radio label="Senior high School"></el-radio>
                <el-radio label="CET4"></el-radio>
                <el-radio label="CET6"></el-radio>
                <el-radio label="Graduate Student"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="favourite wrapper">
        <label class="title">Reading Favourite</label>
        <div class="favContent">
          <el-tag v-for="tag in tags" :key="tag" closable :disable-transitions="false" @close="handleClose(tag)">{{tag}}</el-tag>
          <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput"  @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
        </div>
      </div>
    </div>
    <div class="editWrapper iconClass" @click="editInfo" :class="{hideClass:editFlag}">
      <a><i class="el-icon-edit-outline"></i></a>
    </div>
    <div :class="{showClass:editFlag}" class="editItem saveWrapper iconClass" >
      <a><i class="el-icon-tickets" @click="saveInfo('save')"></i></a>
      <a><i class="el-icon-close" @click="saveInfo('cancel')"></i></a>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default{
  data () {
    return {
      editFlag: false,
      currentDate: '2018-01-14',
      userlevel: 'CET4',
      type: [],
      inputVisible: false,
      inputValue: '',
      tags: ['Human society', 'Commercial economy', 'Cultural education', 'Natural environment', 'Cultural education', 'Natural environment']
    }
  },
  methods: {
    editInfo: function () {
      this.editFlag = !this.editFlag
    },
    saveInfo: function (item) {
      if (item === 'save') {
        this.editFlag = !this.editFlag
        // 保存数据至后台，同时更新页面
      } else {
        // 不用改变
        this.editFlag = !this.editFlag
      }
    },
    handleClose (tag) {
      this.tags.splice(this.tags.indexOf(tag), 1)
    },
    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm () {
      let inputValue = this.inputValue
      if (inputValue) {
        this.tags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    }
  }
}
</script>

<style rel="stylesheet/stylus" lang="stylus">
@import "../../style/components/field.styl";
</style>
