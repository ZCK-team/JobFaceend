<template>
  <div
      class="bg" style="display: flex;text-align: center;height: 100%; width: 100%; padding: 0px;margin: 0px;overflow-x: hidden;overflow-y: hidden">
    <div style=" width: 28%; height: 100%;">
      <div class="bg1" style="height: 50%;width: 100%;  ">
        <wordCloud></wordCloud>
      </div>
      <div class="bg2" style="height: 50%;width: 100%; ">
          <cityAndPositionCount></cityAndPositionCount>
      </div>

    </div>
    <div style="width: 44%;height: 100%">
      <div class="bgMap" style="width: 100%;height: 65%; ">
        <myMap></myMap>
      </div>
      <div class="bg3" style="width: 100%;height: 35%;">
        <experienceAndSalary></experienceAndSalary>
      </div>
    </div>
    <div style="width: 28%;height: 100%">
      <div class="bg4" style=" width: 100%;height: 100%;">
        <hot-position></hot-position>
      </div>

    </div>


  </div>
</template>

<script>


import {getPositionInformationAll} from "@/api/positionInformation";
import myMap from "@/components/echartsRendering/myMap";
import hotPosition from "@/components/echartsRendering/hotPosition";
import wordCloud from "@/components/echartsRendering/wordCloud";
import cityAndPositionCount from "@/components/echartsRendering/cityAndPositionCount";
import experienceAndSalary from "@/components/echartsRendering/experienceAndSalary";


export default {
  name: "Home",
  components: {myMap, hotPosition, wordCloud, cityAndPositionCount, experienceAndSalary},
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

.bg {
  background-image: url('../../assets/bg.png');
  background-repeat: no-repeat;
  background-size: 112%;
}

/*
.bg1 {
  !*background-image: url('../../assets/bg1.png');*!
  background-repeat: no-repeat;
  background-size: contain;
}

.bg2 {
  !*background-image: url('../../assets/bg1.png');*!
  background-repeat: no-repeat;
  background-size: contain;
}

.bg3 {
  !*background-image: url('../../assets/bg3.png');*!
  background-repeat: no-repeat;
  background-size: contain;
}

.bg4 {
  !*background-image: url('../../assets/bg4.png');*!
  background-repeat: no-repeat;
  background-size: contain;
}
*/


</style>
