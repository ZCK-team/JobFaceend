<template>
  <div
      style="display: flex;text-align: center;background-color: rgba(0,216,255,0.38);height: 100%; width: 100%; padding: 0px;margin: 0px;">
    <div style="background-color: yellow; width: 28%; height: 100%;">
      <div style="height: 50%;width: 100%; background-color: #e77272">

      </div>
      <div style="height: 50%;width: 100%; background-color: rgba(0,216,255,0.51)">

      </div>

    </div>
    <div style="background-color: orangered;width: 44%;height: 100%">
      <div style="background-color: rgb(145,213,36);width: 100%;height: 65%;">

      </div>
      <div style="background-color: rgba(0,216,255,0.38);width: 100%;height: 35%;">

      </div>
    </div>
    <div style="background-color: rgb(234,75,75);width: 28%;height: 100%">
      <div style="background-color: palegoldenrod; width: 100%;height: 100%;">

      </div>

    </div>


  </div>
</template>

<script>


import {getPositionInformationAll} from "@/api/positionInformation";

export default {
  name: "Home",
  data() {
    return {}
  },
  mounted() {
    getPositionInformationAll().then(res => {
      console.log("+++++++++++++", res.data);
    })
  },
  methods: {}

}
</script>

<style scoped>
.el-descriptions {
  width: 90%;

  margin: 0 auto;
  text-align: center;
}
</style>