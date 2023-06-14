<template>
  <div style="width: 100%;height: 100%;">
    <div ref="chart" style="width: 100%; height: 100%;"></div>
  </div>
</template>
<script>

import * as echarts from 'echarts'
import chinaJson from '@/assets/china.json'

export default {
  name: "Home",
  data() {
    const data = [
      {name: '内蒙古自治区', value: 1000},
      {name: '贵州省', value: 900},
      {name: '广东省', value: 800},
      {name: '河南省', value: 700},
      {name: '河北省', value: 600},
      {name: '四川省', value: 500},
      {name: '江苏省', value: 400},
      {name: '广西省', value: 300},
    ];
    return {
      option: {
        // echarts 图表选项配置
        title: {
          text: '城市平均薪资分布情况',
          left: 'center', // 设置标题居中
          top: 10, // 设置距离顶部 10px
          textStyle: {
            color: 'white' // 或者 '#ffffff'
          }
        },
        tooltip: {
          trigger: 'item',

        },
        visualMap: {
          min: 0,
          max: 1000,
          left: '20px', // 向右移动 30px
          top: 'bottom',
          text: ['高', '低'],
          calculable: true,
          itemWidth: 10,
          itemHeight: 80,
          textStyle: {
            color: 'white'
          }
        },


        series: [
          {
            name: '数据名称',
            type: 'map',
            mapType: 'china',
            left: 'center',
            top: 100,
            zoom: 1.45,
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
          }
        ]
      },
      barOption: {
        xAxis: {
          type: 'value'
        },
        yAxis: {
          type: 'category',
          axisLabel: {
            rotate: 30
          },
          data: data.map(function (item) {
            return item.name;
          })
        },
        animationDurationUpdate: 1000,
        series: {
          type: 'bar',
          id: 'population',
          data: data.map(function (item) {
            return item.value;
          }),
          universalTransition: true
        }
      }
    }
  },

  mounted() {

    const chartDom = this.$refs.chart;
    const myChart = echarts.init(chartDom,);
    this.loadMap(myChart);
    this.sort(function (a, b) {
      return a.value - b.value;
    });
  },
  methods: {
    loadMap(myChart) {
      myChart.showLoading();
      echarts.registerMap('china', chinaJson);
      myChart.hideLoading();
      myChart.setOption(this.option)
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