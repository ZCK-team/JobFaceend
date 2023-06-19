<template>
  <div class="bg"
       style="display: flex;text-align: center;height: 100%; width: 100%; padding: 0px;margin: 0px;overflow-x: hidden;overflow-y: hidden">
    <div style=" width: 28%; height: 100%;">
      <div class="bg1" style="height: 50%;width: 100%; ">
        <dv-border-box-8 class="border">
          <wordCloud></wordCloud>
        </dv-border-box-8>
      </div>
      <div class="bg2" style="height: 50%;width: 100%; ">
        <dv-border-box-8 :reverse="true" class="border">
          <cityAndPositionCount></cityAndPositionCount>
        </dv-border-box-8>
      </div>
    </div>
    <div style="width: 44%;height: 100%">
      <div class="bgMap" style="width: 100%;height: 65%; " @click="changeCondition">
        <dv-border-box-1 >
          <template v-if="condition === 'a'">
            <myMap></myMap>
          </template>
          <template v-else-if="condition === 'b'">
            <myMapsalary></myMapsalary>
          </template>
        </dv-border-box-1>
      </div>
      <div class="bg3" style="width: 100%;height: 35%;">
        <dv-border-box-1 class="border" >
          <experienceAndSalary></experienceAndSalary>
        </dv-border-box-1>
      </div>
    </div>
    <div style="width: 28%;height: 100%">
      <div class="bg4" style=" width: 100%;height: 100%;">
        <dv-border-box-8 class="border">
          <hot-position></hot-position>
        </dv-border-box-8>
      </div>
    </div>
  </div>
</template>

<script>


import myMapsalary from "@/components/echartsRendering/myMap/indexminsalary";
import myMap from "@/components/echartsRendering/myMap/index";
import hotPosition from "@/components/echartsRendering/hotPosition";
import wordCloud from "@/components/echartsRendering/wordCloud";
import cityAndPositionCount from "@/components/echartsRendering/cityAndPositionCount";
import experienceAndSalary from "@/components/echartsRendering/experienceAndSalary";

export default {
  name: "Home",
  components: {myMapsalary, hotPosition, wordCloud, cityAndPositionCount, experienceAndSalary, myMap},
  data() {

    return {
      condition : 'a',
      items: [
        {component: 'myMapsalary'},
        {component: 'myMap'},
      ],
    }
  },
  methods: {
    changeCondition() {
      this.condition = this.condition === 'a' ? 'b' : 'a'
    }
  },
  mounted() {
  },

}
</script>

<style scoped>
.el-descriptions {
  width: 50%;

  margin: 0 auto;
  text-align: center;
}

.bg {
  background-image: url('../../assets/bg.png');
  background-repeat: no-repeat;
  background-size: cover;
}
.car {
  height: auto;
}
.my-carousel .VueCarousel-slide {
  height: auto !important;
}
.VueCarousel-dot-container {
  bottom: 10px; /* 相对于父元素的底部位置 */
}

.VueCarousel-dot {
  width: 10px;
  height: 100px;
  margin: 0 10px;
  border-radius: 50%;
  background-color: #ccc;
}

.VueCarousel-dot--active {
  background-color: #333;
}
/*.border{
  width: 112% !important;
}*/



</style>
