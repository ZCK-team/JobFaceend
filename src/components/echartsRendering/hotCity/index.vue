<template>
  <div id="city" style="width: 100%; height: 100%;">

  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name:'hotCity',
  mounted() {
    this.renderingHotCity()
  },
  methods:{
    renderingHotCity(){
      const chartDom = document.getElementById('city');
      const myChart = echarts.init(chartDom);
      let option;

      option = {
        tooltip: {
          trigger: 'item'
        },
        backgroundColor: 'rgba(0, 0, 0, 0.1)', // 设置背景透明度为 80%
        legend: {
          top: '10%',
          left: '20px',
          textStyle:{
            color:'#fff'
          }
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['30%', '60%'],
            top: '50px',
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 1048, name: 'Search Engine' },
              { value: 735, name: 'Direct' },
              { value: 580, name: 'Email' },
              { value: 484, name: 'Union Ads' },
              { value: 300, name: 'Video Ads' }
            ]
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






