<template>
  <div style="width: 100%;height: 100%;">
    <div ref="chart" style="width: 100%; height: 100%;"></div>
  </div>
</template>
<script>

import * as echarts from 'echarts'
import chinaJson from '@/assets/china.json'
import {getmapnum} from "@/api/positionInformation";

export default {
  name: "Home",
  data() {
    return {

    }
  },

  mounted() {
    const chartDom = this.$refs.chart;
    const myChart = echarts.init(chartDom);
    this.loadMap(myChart);

  },
  methods: {
    async loadMap(myChart) {
      var data = []; // 修改为初始值为空数组
      await getmapnum().then(res => {
        for (var i = 0; i < res.data.length; i++) { // 修改循环条件
          data.push({name: String(res.data[i].province), value: parseInt(res.data[i].num)});
        }
      })
      // console.log(data)
      myChart.showLoading();
      echarts.registerMap('china', chinaJson);
      var option = {
        // echarts 图表选项配置
        title: {
          text: '各省市岗位数量发布概况',
          left: 'center', // 设置标题居中
          top: 10, // 设置距离顶部 10px
          textStyle: {
            color:  'rgb(0,255,234)',
          }
        },
        tooltip: {
          trigger: 'item',

        },
        visualMap: {
          min: 0,
          max: 8000,
          left: '20px', // 向右移动 30px
          top: 'bottom',
          text: ['高', '低'],
          inRange: {
            // prettier-ignore

            color:  ['#99ffff', 'rgb(64,166,255)', 'rgb(64,124,255)', 'rgba(0,101,255,0.91)']
          },
          calculable: true,
          itemWidth: 10,
          itemHeight: 80,
          textStyle: {
            color: 'white'
          },
        },
        series: [
          {
            name: '岗位数量',
            type: 'map',
            mapType: 'china',
            left: 'center',
            top: 100,
            zoom: 1.5,
            roam: true,
            label: {
              normal: {
                show: true,
                fontSize: 9,
              },
              emphasis: {
                show: true
              }
            },
            data: data,
          },
        ]
      }
      myChart.hideLoading();
      myChart.setOption(option)
    },

  }
}
</script>

<style scoped>
.el-descriptions {
  width: 90%;

  margin: 0 auto;
  text-align: center;
}
</style>