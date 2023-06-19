<template>
  <div style="width: 100%;height: 100%;">
    <div id="Chart" ref="chart" style="width: 100%; height: 100%;"></div>
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
    const Chart = document.querySelector('#Chart')
    //放置 获取DOM 节点时 去监听
    const observer = new ResizeObserver(() => {
      myChart.resize();
    });
    observer.observe(Chart);
  },
  methods: {
    async loadMap(myChart) {
      const data = [];// 修改为初始值为空数组
      await getmapnum().then(res => {
        for (let i = 0; i < res.data.length; i++) { // 修改循环条件
          data.push({name: String(res.data[i].province), value: parseInt(res.data[i].num), avgSalaryMin: res.data[i].avgsalarymin, avgSalaryMax: res.data[i].avgsalarymax});
        }
      })
      myChart.showLoading();
      echarts.registerMap('china', chinaJson);
      const option = {
        // echarts 图表选项配置
        title: {
          text: '各省市岗位分布',
          left: 'center', // 设置标题居中
          top: 10, // 设置距离顶部 10px
          textStyle: {
            color: 'rgb(0,255,234)',
          }
        },
        toolbox: {
          feature: {
            saveAsImage: {
              title: '下载图片',
              iconStyle: {
                color: 'rgb(0,255,234)',
              }
            },
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: (e) => {
            let data = e.data;
            //字符串模板
            let context = `
               <div>
                   <p style="line-height: 30px; font-weight: 600">${data.name}</p>
                   <p><span>岗位数量 : </span><span>${data.value}</span></p>
               </div>
            `;
            return context;
          }
        },
        visualMap: {
          min: 0,
          max: 8000,
          left: '20px', // 向右移动 30px
          top: 'bottom',
          text: ['高', '低'],
          inRange: {
            color: ['#99ffff', 'rgb(64,166,255)', 'rgb(64,124,255)', 'rgba(0,101,255,0.91)']
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
            zoom: 1.4,
            roam: true,
            label: {
              normal: {
                show: true,
                fontSize: 9,
                color: 'rgb(19,23,18)'
              },
              emphasis: {
                show: true
              }
            },
            data: data,
          },
        ]
      };
      myChart.hideLoading();
      myChart.setOption(option)
      const cityAndPosition = document.querySelector('#cityAndPosition')
      //放置 获取DOM 节点时 去监听
      const observer = new ResizeObserver(() => {
        myChart.resize();
      });
      observer.observe(cityAndPosition);
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