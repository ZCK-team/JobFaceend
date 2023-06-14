<template>
  <div id="dataLinkAge" style="width: 100%; height: 100%;">

  </div>
</template>

<script>
import {getCityAndCityCount} from "@/api/positionInformation";
import * as echarts from 'echarts';
export default {
  name: "dataLinkAge",
  data() {
    return {
      dataAxis: [],
      data: []
    }
  },
  mounted() {
    this.dataLink()

    // getCityAndCityCount().then(res => {
    //   console.log("++++++++1111+", res.data);
    // })

  },
  methods:{
    dataLink(){
      var chartDom = document.getElementById('dataLinkAge');
      var myChart = echarts.init(chartDom);
      var option;
      getCityAndCityCount().then(res => {
        const cityList = [];
        const countList = [];
        for (let i = 0; i < res.data.length; i++) {
          const city = res.data[i].city;
          const count = res.data[i].count;
          cityList.push(city);
          countList.push(count);
        }
        console.log("City List: ", cityList);
        console.log("Count List: ", countList);
        let dataAxis = cityList;
        let data = countList;
        let yMax = 8000;
        let dataShadow = [];
        for (let i = 0; i < data.length; i++) {
          dataShadow.push(yMax);
        }
      // prettier-ignore
//       let dataAxis = ['北京', '击', '柱', '子', '或', '者', '两', '指', '在', '触', '屏', '上','点', '击' ];
// // prettier-ignore
//       let data = [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149,220, 182, 191];
//       let yMax = 500;
//       let dataShadow = [];
//       for (let i = 0; i < data.length; i++) {
//         dataShadow.push(yMax);
//       }

      option = {
        title: {
          text: 'Top15城市岗位数量统计图',
          top:'10',
          left:'center',
          textStyle:{
            color:'#fff'
          }
          // subtext: 'Feature Sample: Gradient Color, Shadow, Click Zoom'
        },
        xAxis: {
          data: dataAxis,
          axisLabel: {
            interval: 0, // 显示所有标签
            rotate: 0, // 将标签旋转 45 度
            inside: false,
            color: '#fff'
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          z: 10
        },
        yAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#999'
          }
        },
        dataZoom: [
          {
            type: 'inside'
          }
        ],
        series: [
          {
            type: 'bar',
            showBackground: true,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#83bff6' },
                { offset: 0.5, color: '#188df0' },
                { offset: 1, color: '#188df0' }
              ])
            },

            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#2378f7' },
                  { offset: 0.7, color: '#2378f7' },
                  { offset: 1, color: '#83bff6' }
                ])
              }
            },
            name: 'Life Cost',
            stack: 'Total',
            label: {
              show: true,
              position: 'top'
            },
            data: data
          },

        ]
      };
// Enable data zoom when user click bar.
      const zoomSize = 6;
      myChart.on('click', function (params) {
        console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
        myChart.dispatchAction({
          type: 'dataZoom',
          startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
          endValue:
              dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
        });
      });

      option && myChart.setOption(option);
      });

    }

  }
}
</script>

<style scoped>

</style>
