<template>
  <div ref="wordCloud" style="height: 100%; width: 100%;" >
  </div>
</template>
<script>
import * as echarts from 'echarts';
import "echarts-wordcloud/dist/echarts-wordcloud";
import "echarts-wordcloud/dist/echarts-wordcloud.min";

import {getTechnicalFrequencyStatistics} from "@/api/technology";
export default {
  data() {
    return {
      wordList:[]
    }
  },
  mounted(){
    getTechnicalFrequencyStatistics().then(res=>{
      const technologyAndCount = res.data
      this.wordList = technologyAndCount.map(item => {
        return {
          name: item.technology,
          value: item.count
        };
      });
      this.initChart();
    })

  },
  methods:{
    initChart(){
      let myChart = echarts.init(this.$refs.wordCloud);
      myChart.setOption({
        backgroundColor: 'rgba(0, 0, 0, 0.15)', // 设置背景透明度为 80%
        title: {
          text: '技术要求词云图',
          left: 'center', // 设置标题居中
          top: 5, // 设置距离顶部 10px
          textStyle: {
            color:  'rgb(0,255,234)',
          }
        },
        tooltip: {
          trigger: 'item',
        },
        textStyle:{
          top: '30',
          color: function() {
            return (
                "rgb(" +
                Math.round(Math.random() * 255) +
                ", " +
                Math.round(Math.random() * 255) +
                ", " +
                Math.round(Math.random() * 255) +
                ")"
            );
          }
        },
        series: [
          {
            type: "wordCloud",
            shape: 'circle', // 设置词云图形状为爱心形状
            //用来调整词之间的距离
            gridSize: 8,
            //用来调整字的大小范围
            // Text size range which the value in data will be mapped to.
            // Default to have minimum 12px and maximum 60px size.
            sizeRange: [12, 30],
            // Text rotation range and step in degree. Text will be rotated randomly in range [-90,                                                                             90] by rotationStep 45
            //用来调整词的旋转方向，，[0,0]--代表着没有角度，也就是词为水平方向，需要设置角度参考注释内容
            // rotationRange: [-45, 0, 45, 0],
            // rotationRange: [ 0,90],
            rotationRange: [0,90],
            //位置相关设置
            left: "center",
            top: "center",
            right: null,
            bottom: null,
            width: "200%",
            height: "200%",
            data: this.wordList
          }
        ]
      })
    }
  }
}
</script>
<style scoped>
</style>