<template>
    <div style="text-align: center;background-color: #f1f1f3;height: 100%;padding: 0px;margin: 0px;">
    </div>
</template>

<script>
import {getAll} from "@/api/user";

export default {
    name: "Home",
    data() {
        return {

        }
    },
  mounted() {
/*    getList().then(res => {
        console.log("123",res.data)
    })*/

    getAll().then(res => {
        console.log("456",res)
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