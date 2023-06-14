<template>
  <div>11111</div>
</template>

<script>
import {getPositionInformationAll} from "@/api/positionInformation";
export default {
  name: "PositionSearch",
  data() {
    return {}
  },
  mounted() {
    getPositionInformationAll().then(res => {
      console.log("+++++++++++++", res.data);
      //C:\Users\86135\Desktop\K-RPA\JobFaceend\src\view\positionSearch\positionSearch.vue
    })
  },
  methods: {}
}
</script>

<style scoped>

</style>
