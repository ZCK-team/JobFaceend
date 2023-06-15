<template>
  <div id="app">

<!--    <Index></Index>-->
<!--    <Header></Header>-->
    <router-view></router-view>

<!--    <Aside></Aside>-->
  </div>
</template>

<script>
import router from '../router.js';
// import Aside from "@/layout/Aside";
// import Index from '../src/components/Index'
// import Header from "@/layout/Header";

export default {
  name: 'App',
  router,
  components: {
    // Header,
    // Aside
    // Index
  },
  data() {
    return{
      user: JSON.parse(sessionStorage.getItem('CurUser'))
    }
  },
  watch:{
    '$store.state.menu':{
      handler(val,old){
        if(!old && this.user && this.user.no){
          this.$store.commit('setRouter',val)
        }
      },
      immediate :true
    }
  }

}
</script>

<style>
#app {
    height: 100%;
}
</style>
