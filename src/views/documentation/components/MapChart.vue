<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
// import 'echarts/map/js/china.js' // 引入中国地图数据
import 'echarts/extension/bmap/bmap'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'

export default {
  props: {
    mapList: {
      type: Array,
      required: true
    },
    mapData: {
      type: Array,
      required: true
    },
    mapMax: {
      type: Array,
      required: true
    },
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '330px'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      chart: null,
      map1Data: [
        { name: '海门', value: 9 },
        { name: '鄂尔多斯', value: 12 },
        { name: '招远', value: 12 },
        { name: '舟山', value: 12 },
        { name: '齐齐哈尔', value: 14 },
        { name: '盐城', value: 15 },
        { name: '赤峰', value: 16 },
        { name: '青岛', value: 18 },
        { name: '乳山', value: 18 },
        { name: '金昌', value: 19 }
      ],
      geoCoordMap: {
        '海门': [113.9002818, 22.5811062],
        '鄂尔多斯': [113.9001818, 22.5833262],
        '招远': [113.9001118, 22.5822362],
        '舟山': [113.9001818, 22.5823362],
        '齐齐哈尔': [113.9001718, 22.5814062],
        '盐城': [113.9001218, 22.5823262],
        '赤峰': [113.9001318, 22.5827762],
        '青岛': [113.9002118, 22.5829962],
        '乳山': [113.9002218, 22.5829962],
        '金昌': [113.9002318, 22.5821062]
      }
    }
  },
  // 监听数据变化
  watch: {
    mapList() {
      this.initChart()
    }
  },
  created() {
  },
  mounted() {
    this.initChart()
    this.__resizeHandler = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHandler)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHandler)
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      console.log('---mapData', this.mapData)
      console.log('---mapList', this.mapList)
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        title: {
          // text: '温度 - 百度地图',
          // subtext: 'data from PM25.in',
          // sublink: 'http://www.pm25.in',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        bmap: {
          // center: [113.9001818, 22.5824062],
          center: this.mapData,
          zoom: 16,
          roam: true,
          mapStyle: {
            styleJson: [{
              'featureType': 'land',
              'elementType': 'all',
              'stylers': {
                'color': '#f3f3f3'
              }
            }, {
              'featureType': 'building',
              'elementType': 'all',
              'stylers': {
                'color': '#F3F2F7'
              }
            }, {
              'featureType': 'local',
              'elementType': 'all',
              'stylers': {
                'color': '#fefefe'
              }
            }, {
              'featureType': 'arterial',
              'elementType': 'geometry',
              'stylers': {
                'color': '#fefefe'
              }
            }, {
              'featureType': 'arterial',
              'elementType': 'geometry.fill',
              'stylers': {
                'color': '#fefefe'
              }
            }, {
              'featureType': 'manmade',
              'elementType': 'all',
              'stylers': {
                'color': '#E7EBEE'
              }
            }, {
              'featureType': 'subway',
              'elementType': 'labels',
              'stylers': {
                'color': '#F5F4F9'
              }
            }, {
              'featureType': 'subway',
              'elementType': 'geometry.fill',
              'stylers': {
                'color': '#E5D1F8'
              }
            }, {
              'featureType': 'highway',
              'elementType': 'geometry.fill',
              'stylers': {
                'color': '#ffffff'
              }
            }
            // , {
            //   'featureType': 'water',
            //   'elementType': 'all',
            //   'stylers': {
            //     'color': '#d1d1d1'
            //   }
            // },
            // {
            // 高速路名
            //   'featureType': 'highway',
            //   'elementType': 'labels',
            //   'stylers': {
            //     'visibility': 'off'
            //   }
            // }, {
            //   'featureType': 'poi',
            //   'elementType': 'all',
            //   'stylers': {
            //     'visibility': 'off'
            //   }
            // }, {
            //   'featureType': 'green',
            //   'elementType': 'all',
            //   'stylers': {
            //     'visibility': 'off'
            //   }
            // }, {
            //   'featureType': 'arterial',
            //   'elementType': 'labels',
            //   'stylers': {
            //     'visibility': 'off'
            //   }
            // }, {
            //   'featureType': 'boundary',
            //   'elementType': 'all',
            //   'stylers': {
            //     'color': '#fefefe'
            //   }
            // }, {
            //   'featureType': 'label',
            //   'elementType': 'labels.text.fill',
            //   'stylers': {
            //     'color': '#999999'
            //   }
            // }
            ]
          }
        },
        series: [
          {
            name: '温度值',
            type: 'scatter',
            coordinateSystem: 'bmap',
            // data: this.convertData(this.map1Data),
            data: this.mapList,
            // data: this.mapList,
            symbolSize: function(val) {
              // return val[2] / 10
              return 10
            },
            label: {
              normal: {
                formatter: '{c}',
                position: 'right',
                show: false
              },
              emphasis: {
                // show: true
              }
            },
            itemStyle: {
              normal: {
                color: 'purple'
              }
            }
          },
          {
            name: '最近一次',
            type: 'effectScatter',
            coordinateSystem: 'bmap',
            // data: this.convertData(this.mapData.sort(function(a, b) {
            //   return b.value - a.value
            // }).slice(0, 6)),
            data: this.mapMax,
            symbolSize: function(val) {
              // return val[2] / 10
              return 10
            },
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke'
            },
            hoverAnimation: true,
            label: {
              normal: {
                formatter: '{c}',
                position: 'right',
                // show: true
                show: false
              }
            },
            itemStyle: {
              normal: {
                color: 'purple',
                shadowBlur: 10,
                shadowColor: '#333'
              }
            },
            zlevel: 1
          }
        ]
      })
    },

    convertData(data) {
      const res = []
      for (let i = 0; i < data.length; i++) {
        const geoCoord = this.geoCoordMap[data[i].name]
        if (geoCoord) {
          res.push({
            name: data[i].name,
            value: geoCoord.concat(data[i].value)
          })
        }
      }
      return res
    }
  }
}
</script>
