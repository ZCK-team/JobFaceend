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

      option = {
        tooltip: {
          trigger: 'item',
        },
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        title: {
          text: 'Top15城市岗位数量统计图',
          top:'15',
          left:'center',
          textStyle:{
            color:'rgb(0,216,255)'
          }
        },
        xAxis: {
          data: dataAxis,
          axisLabel: {
            interval: 0, // 显示所有标签
            rotate: 0, // 将标签旋转 0°
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
            show: false,
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#fff',
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
            left: '60', // 调整整体向右移动20px
            // showBackground: true,
            itemStyle: {
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

            emphasis: {
              itemStyle: {
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
              }
            },
            stack: 'Total',
            label: {
              show: true,
              textStyle: {
                color: '#ffffff',
                size: 20
              },
              position: 'top'
            },
            data: data,
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
