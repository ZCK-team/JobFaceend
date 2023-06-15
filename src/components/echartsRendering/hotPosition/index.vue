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
    this.hotJob()
    this.getCityFromHottestPosition()
  },
  methods:{
    async hotJob(){
      const res = await getCityFromHottestPosition();
      let dataSource = []
      for(let i=0;i<20;i++){
        console.log(res.data[i])
        console.log(Object.values(res.data[i]))
        dataSource.push(Object.values(res.data[i]))
      }
      dataSource = dataSource.reverse();
      const chartDom = document.getElementById('position');
      const myChart = echarts.init(chartDom);
      let option = {
        backgroundColor: 'rgba(0, 0, 0, 0.1)', // 设置背景透明度为 80%
        tooltip: {
          trigger: 'item'
        },
        dataset: {
          source: dataSource
        },
        grid: {
          containLabel: true,
          width: '83%',
          left: 10
        },
        xAxis: {
          name: '岗位数量',
          position: 'left',
          nameTextStyle:{
            color:"#00ffff",
            fontSize:10
          },
          axisLabel: {
            rotate: 0 ,// 设置旋转角度，正值表示逆时针旋转，负值表示顺时针旋转
            color:"#00ffff",
          }
        },
        yAxis: {
          name: "岗位名称",
          nameTextStyle: {
            color:"#00ffff",
            position: 'bottom'
          },
          type: 'category' ,
          position:  'left',
          axisLabel: {
            rotate: 0, // 设置旋转角度，正值表示逆时针旋转，负值表示顺时针旋转
            color:"#00ffff",
            fontSize:12,
          }
        },
/*        visualMap: {
          orient: 'horizontal',
          left: 'center',
          min: 10,
          max: 650,
          text: ['High Score', 'Low Score'],
          dimension: 0,
          inRange: {
            color: ['#FFCE34', '#FD665F']
          }
        },*/
        series: [
          {
            type: 'bar',
            encode: {
              x: 'amount',
              y: 'product'
            },
            itemStyle: {
              barBorderRadius: [0, 20, 20, 0], // 仅设置末端为圆角，其他角为直角
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
          }
        ]
      };
      option && myChart.setOption(option);

    }
  }
}


</script>

<style>

</style>
