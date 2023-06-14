<template>
  <div id="consider" style="width: 100%; height: 100%;"></div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  name: "index",
  mounted() {
    this.consider()
  },
  methods:{
    consider(){
      var chartDom = document.getElementById('consider');
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        title: {
          text: 'Stacked Line'
        },
        backgroundColor: 'rgba(0, 0, 0, 0.15)', // 设置背景透明度为 80%
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['无经验者', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '最高薪资',
            type: 'line',
            stack: 'Total',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '最高薪资',
            type: 'line',
            stack: 'Total',
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '平均薪资',
            type: 'line',
            stack: 'Total',
            data: [150, 232, 201, 154, 190, 330, 410]
          }
        ]
      };

      option && myChart.setOption(option);

    }

  }
}
</script>

<style scoped>

</style>
