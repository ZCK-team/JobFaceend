<template>
  <div id="cityAndPosition" style="width: 100%; height: 100%;">

  </div>
</template>

<script>
import {getCityAndCityCount} from "@/api/positionInformation";
import * as echarts from 'echarts';

export default {
  name: "cityAndPosition",
  data() {
    return {
      dataAxis: [],
      data: []
    }
  },
  mounted() {
    this.dataLink()

  },
  methods: {
    dataLink() {
      const myChart = echarts.init(document.getElementById('cityAndPosition'));
      getCityAndCityCount().then(res => {
        const cityList = [];
        const countList = [];
        for (let i = 0; i < res.data.length - 5; i++) {
          const city = res.data[i].city;
          const count = res.data[i].count;
          cityList.push(city);
          countList.push(count);
        }
        let dataAxis = cityList;
        let data = countList;
        let yMax = 8000;
        let dataShadow = [];
        for (let i = 0; i < data.length; i++) {
          dataShadow.push(yMax);
        }

        let option = {
          tooltip: {
            trigger: 'item',
          },
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          title: {
            text: '城市岗位数量Top10统计图',
            top: '15',
            left: 'center',
            textStyle: {
              color: 'rgb(0,216,255)'
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
                barBorderRadius: [20, 20, 0, 0], // 仅设置末端为圆角，其他角为直角
                color: function () {
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
                  color: function () {
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
        option && myChart.setOption(option);
        // 当用户单击栏时启用数据缩放
        const zoomSize = 6;
        myChart.on('click', function (params) {
          myChart.dispatchAction({
            type: 'dataZoom',
            startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
            endValue:
                dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
          });
        });
      });
      const cityAndPosition = document.querySelector('#cityAndPosition')
      //放置 获取DOM 节点时 去监听
      const observer = new ResizeObserver(() => {
        myChart.resize();
      });
      observer.observe(cityAndPosition);

    }

  }
}
</script>

<style scoped>

</style>
