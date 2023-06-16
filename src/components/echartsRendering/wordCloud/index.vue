<template>
  <div id="wordCloud" ref="wordCloud" style="height: 100%; width: 100%;" ></div>
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
          text: '技术栈要求词云图',
          left: 'center', // 设置标题居中
          top: 5, // 设置距离顶部 10px
          textStyle: {
            color:  'rgb(0,255,234)',
          }
        },
        tooltip: {
          trigger: 'item',
        },
        toolbox: {
          feature: {
            saveAsImage: {
              title: '下载图片',
              iconStyle: {
                color: 'rgb(0,255,234)',
                right: 20,
              }
            },
          }
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
            shape: 'circle',
            //用来调整词之间的距离
            gridSize: 8,
            sizeRange: [12, 30],
            rotationRange: [0,90],
            left: "center",
            top: "center",
            width: "200%",
            height: "200%",
            data: this.wordList
          }
        ]
      })

      const wordCloud = document.querySelector('#wordCloud')
      //放置 获取DOM 节点时 去监听
      const observer = new ResizeObserver(() => {
        myChart.resize();
      });
      observer.observe(wordCloud);





    }
  }
}
</script>
<style scoped>
</style>