<template>
  <div id="position" style="width: 100%; height: 100%;">

  </div>
</template>

<script>
import * as echarts from 'echarts';
import {getCityFromHottestPosition} from "@/api/positionInformation";

export default {
  name:'hotPosition',
  mounted() {
    this.hotjob()
    this.getCityFromHottestPosition()
  },
  methods:{
    async hotjob(){
      const res = await getCityFromHottestPosition();
      console.log("数据",res.data)
      let dataSoutce = []
      // let
      for(let i=0;i<20;i++){
        console.log(res.data[i])
        console.log(Object.values(res.data[i]))
        dataSoutce.push(Object.values(res.data[i]))
        // dataSoutce.reverse()
      }
      dataSoutce = dataSoutce.reverse();
      var chartDom = document.getElementById('position');
      var myChart = echarts.init(chartDom);
      var option;
      option = {
        backgroundColor: 'rgba(0, 0, 0, 0.1)', // 设置背景透明度为 80%
        tooltip: {
          trigger: 'item'
        },
        dataset: {
          source: dataSoutce
        },
        grid: {
          containLabel: true,
          width: '82%',
          left: 10
        },
        xAxis: {
          name: 'count',
          axisLabel: {
            rotate: 45 // 设置旋转角度，正值表示逆时针旋转，负值表示顺时针旋转
          }
        },
        yAxis: {
          type: 'category' ,
          axisLabel: {
            rotate: 45 // 设置旋转角度，正值表示逆时针旋转，负值表示顺时针旋转
          }
        },
        visualMap: {
          orient: 'horizontal',
          left: 'center',
          min: 10,
          max: 650,
          text: ['High Score', 'Low Score'],
          // Map the score column to color
          dimension: 0,
          inRange: {
            color: ['#FFCE34', '#FD665F']
          }
        },
        series: [
          {
            type: 'bar',
            encode: {
              // Map the "amount" column to X axis.
              x: 'amount',
              // Map the "product" column to Y axis
              y: 'product'
            }
          }
        ]
      };
      // option.yAxis.data = option.yAxis.data.reverse();
      option && myChart.setOption(option);

    }
  }
}


</script>

<style>

</style>
