<template>
    <div style="text-align: center;background-color: rgba(0,216,255,0.38);height: 666px; width: 1322px; padding: 0px;margin: 0px;">
    </div>
</template>

<script>


import {getPositionInformationAll} from "@/api/positionInformation";

export default {
    name: "Home",
    data() {
        return {

        }
    },
  mounted() {
    getPositionInformationAll().then(res=>{
        console.log("+++++++++++++",res.data);
    })
  },
  methods: {}

}
</script>

<style scoped>
    .el-descriptions{
        width:90%;

        margin: 0 auto;
        text-align: center;
    }
</style>