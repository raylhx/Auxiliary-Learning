<template>
  <div class="leftNav-content">
    <div class="left-logo">
      <router-link to="/home" class="logo">
        <img src="../../assets/common/logo50.png">
      </router-link>
      <div class="motto-wrapper onlyOn">
        <span class="motto">Stay hungry</span>
        <span class="motto">Stay foolish</span>
      </div>
    </div>
    <div class="left-menu-wrapper">
      <div class="left-menu">
        <p class="title onlyOn">Search</p>
        <!--<select>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
        </select>-->
        <!--此处采用原生html写-->
        <div class="select-wrapper onlyOn">
          <select v-model.lazy="selectedYear" class="select">
            <option>Choose</option>
            <option>2017</option>
            <option>2016</option>
            <option>2015</option>
            <option>2014</option>
            <option>2013</option>
            <option>2012</option>
            <option>2011</option>
            <option>2010</option>
            <option>2009</option>
            <option>2008</option>
            <option>2007</option>
            <option>2006</option>
            <option>2005</option>
            <option>2004</option>
            <option>2003</option>
            <option>2002</option>
          </select>
          <!--       <el-select v-model="selects" filterable placeholder="Please Choose">
                   <el-option-group
                     v-for="group in options3"
                     :key="group.label"
                     :label="group.label">
                     <el-option
                       v-for="item in group.options"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
                     </el-option>
                   </el-option-group>
                 </el-select>-->
        </div>
        <p class="title onlyOn">Sort</p>
        <div class="listitem" @click.stop.prevent="GetTag('C')">
          <a>
            <i class="icon_user-tie"></i>
            <span title="人文社会" class="onlyOn">Humanistic</span>
          </a>
        </div>
        <div class="listitem" @click.stop.prevent="GetTag('F')">
          <a>
            <i class="icon_pie-chart"></i>
            <span title="商业经济" class="onlyOn">Commercial</span>
          </a>
        </div>
        <div class="listitem" @click.stop.prevent="GetTag('G1')">
          <a>
            <i class="icon_library"></i>
            <span title="文化教育" class="onlyOn">Education</span>
          </a>
        </div>
        <div class="listitem" @click.stop.prevent="GetTag('R')">
          <a>
            <i class="icon_aid-kit"></i>
            <span title="医学健康" class="onlyOn">Medicine</span>
          </a>
        </div>
        <div class="listitem" @click.stop.prevent="GetTag('N')">
          <a>
            <i class="icon_bug"></i>
            <span title="科普" class="onlyOn">Science</span>
          </a>
        </div>
        <div class="listitem" @click.stop.prevent="GetTag('X')">
          <a>
            <i class="icon_leaf"></i>
            <span title="自然环境" class="onlyOn">Environment</span>
          </a>
        </div>
        <div class="listitem" @click.stop.prevent="GetTag('T')">
          <a>
            <i class="icon_reddit"></i>
            <span title="科技" class="onlyOn">Technology</span>
          </a>
        </div>
        <div class="listitem" @click.stop.prevent="GetTag('D')">
          <a>
            <i class="icon_office"></i>
            <span title="政治法律" class="onlyOn">Political-law</span>
          </a>
        </div>
        <div class="listitem" @click.stop.prevent="GetTag('G2')">
          <a>
            <i class="icon_price-tag"></i>
            <span title="体育" class="onlyOn">Sports</span>
          </a>
        </div>
        <p class="title onlyOn">Basic</p>
        <div class="listitem">
          <router-link :to="'/vocabulary/outline/' + requestType" target="_blank">
            <i class="icon_stack"></i>
            <span title="大纲单词" class="onlyOn">Outline</span>
          </router-link>
        </div>
        <div class="listitem">
          <router-link :to="'/vocabulary/high-frequency/' + requestType" target="_blank">
            <i class="icon_compass"></i>
            <span title="高频单词" class="onlyOn">High-frequency</span>
          </router-link>
        </div>

      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    props: ['requestType'],
    data () {
      return {
        // 路由参数
        type: '',
        menuTag: '',
        selectedYear: 'Choose'
      }
    },
    methods: {
      GetTag (tag) {
        this.menuTag = tag
        this.$emit('getMenuTag', this.menuTag)
      }
    },
    watch: {
      selectedYear: 'GetTag'
    }
  }
</script>

<style rel="stylesheet/stylus" lang="stylus">
  @import "../../style/components/leftNav.styl";
</style>
