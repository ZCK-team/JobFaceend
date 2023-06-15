<template>
  <el-container style="height: 100%; width: 100%; border: 1px solid #eee">
    <el-aside :width="aside_width" style="height: 100vh;background-color: rgb(238, 241, 246);margin-left: -1px;">
      <Aside :fold="fold"></Aside>
    </el-aside>
    <el-container :width="right_width" style="height: 100vh; ">
      <el-header style="text-align: right; font-size: 12px;height: 6%;border-bottom: rgba(168,168,168,0.3) 1px solid;">
        <Header @doCollapse="doCollapse" :icon="icon"></Header>
      </el-header>
      <el-main style="height: 94%; :width: 100%; ">
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Aside from "../layout/Aside";
import Header from "../layout/Header";

export default {
  name: "Index",
  components: {Aside, Header},
  data() {
    return {
      fold: false,//是否折叠 默认展开
      aside_width: "12%",
      right_width: "88%",
      icon: 'el-icon-s-fold'
    }
  },
  methods: {
    doCollapse() {
      this.fold = !this.fold //取反，如果是false ，则展开，否则折叠
      this.isWide = !this.isWide;
      if (this.fold) {// 折叠
            this.aside_width = '0%'
            this.right_width = '100%'
            this.icon = 'el-icon-s-unfold'
      } else {//展开
            this.aside_width = '12%'
            this.right_width = '88%'
            this.icon = 'el-icon-s-fold'
      }
    }
  }
}
</script>
<style scoped>
.el-header {
  background-color: #0e4d8f;
  color: rgba(255, 255, 255, 0.9);
  line-height: 60px;

}

.el-main {
  padding: 0px;
}

.el-aside {
  color: #333;
}
</style>