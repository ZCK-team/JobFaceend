<template>
  <div id="experienceAndSalary" style="width: 100%; height: 100%;"></div>
</template>

<script>
import * as echarts from 'echarts';
import {getSalaryAll} from '/src/api/experienceInformation'

export default {
  name: "index",
  data() {
    return {}
  },
  mounted() {
    this.experienceAndSalary()
  },
  methods: {
    async experienceAndSalary() {
      let avgSalaryMin, avgSalaryMax, avgCombined;
      await getSalaryAll().then(res => {
        avgSalaryMin = [res.data[5].avgSalaryMin, res.data[2].avgSalaryMin, res.data[0].avgSalaryMin, res.data[3].avgSalaryMin, res.data[4].avgSalaryMin, res.data[1].avgSalaryMin]
        avgSalaryMax = [res.data[5].avgSalaryMax, res.data[2].avgSalaryMax, res.data[0].avgSalaryMax, res.data[3].avgSalaryMax, res.data[4].avgSalaryMax, res.data[1].avgSalaryMax]
        avgCombined = [res.data[5].avgCombined, res.data[2].avgCombined, res.data[0].avgCombined, res.data[3].avgCombined, res.data[4].avgCombined, res.data[1].avgCombined]
      });
      const chartDom = document.getElementById('experienceAndSalary');
      const myChart = echarts.init(chartDom);
      let resize = (chart)=>{
        chart.resize();
      }
      let option;
      option = {
        title: {
          text: '工作经验与月薪资',
          left: 'center',// 对齐在左，居中显示
          top: 10,
          textStyle: {
            color: "#50FFEBFF",// 修改为所需的颜色，例如红色
          }
        },
        backgroundColor: 'rgba(0, 0, 0, 0.15)', // 设置背景透明度为 80%
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            console.log(params)
            return '<strong style="font-size: 18px; color: coral ;">工作' + params[0].axisValue + '<br></strong>' +
                '<strong style="font-size: 18px; color: ' + params[2].color + ';">' + '平均薪资 --->' + params[2].value + "K<br>" + "</strong>" +
                '<strong style="font-size: 18px; color: ' + params[0].color + ';">' + '最高平均薪资 --->' + params[0].value + "K<br>" + "</strong>" +
                '<strong style="font-size: 18px; color: ' + params[1].color + ';">' + '最低平均薪资 --->' + params[1].value + "K<br>" + "</strong>";
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
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
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['经验不限', '一年以内', '1-3年', '3-5年', '5-10年', '10年以上'],
          axisLabel: {
            textStyle: {
              color: 'lightblue' // 修改为所需的颜色
            }
          }
        },
        yAxis: {
          type: 'value',
          min: 0, // 设置最低值为 0K
          max: 50, // 设置最高值为 100K
          interval: 10, // 设置刻度的间隔为 20K
          axisLabel: {
            formatter: '{value}K',// 在值后面添加 "K" 单位
            textStyle: {
              color: 'lightblue' // 修改为所需的颜色
            }
          }
        },
        series: [
          {
            name: '最高平均薪资',
            type: 'line',
            stack: '',   //设置分层展示
            data: avgSalaryMax, // 将数据都设置为 20K
            smooth: true // 将折线改为曲线
          },
          {
            name: '最低平均薪资',
            type: 'line',
            stack: '',
            data: avgSalaryMin, // 将数据都设置为 20K
            smooth: true // 将折线改为曲线
          },
          {
            name: '平均薪资',
            type: 'line',
            stack: '',
            data: avgCombined, // 将数据都设置为 20K
            smooth: true // 将折线改为曲线
          }
        ]
      };
      option && myChart.setOption(option);
      window.addEventListener('resize', resize.bind(null, myChart));
      this.$once('hook:beforeDestroy', () => {
        window.removeEventListener('resize', resize);
      });

    }
  }
}
</script>

<style scoped>

</style>
