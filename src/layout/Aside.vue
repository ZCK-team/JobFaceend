<template>
    <el-menu
            background-color="#00C4FFCD"
            background-image="url(src/assets/sidebackground.jpg)"
            text-color="#fff"
            active-text-color="#ffd04b"
            style="height: 100%;"
            default-active="/Home"
            :collapse="isCollapse"
            :collapse-transition="false"
            router
    >
       <el-menu-item index="/Home" @click="navigate('/Home')">
           <i class="el-icon-s-home"></i>
           <span slot="title">首页</span>
       </el-menu-item>
       <el-menu-item index="/PositionSearch" @click="navigate('/PositionSearch')">
           <i class="el-icon-s-help"></i>
           <span slot="title">查询</span>
       </el-menu-item>

        <el-menu-item :index="'/'+item.menuclick" v-for="(item,i) in menu" :key="i">
            <i :class="item.menuicon"></i>
            <span slot="title">{{item.menuname}}</span>
        </el-menu-item>



    </el-menu>
</template>

<script>
import router from "../../router.js";
export default {
  name: "Aside",
  router,
  data(){
      return {
          //isCollapse:false
      }
  },
  computed:{
      "menu":{
          get(){
              return this.$store.state.menu
          }
      }
  },
  props:{
      isCollapse:Boolean
  },
  methods: {
    navigate(path) {
      this.$router.push(path);
    }
  }
}
</script>

<style scoped>

</style>
