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
    lineList: {
      type: Array,
      required: true
    },
    lineData: {
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
      chart: null
    }
  },
  // 监听数据变化
  watch: {
    lineList() {
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
      // console.log('---lineData', this.lineData)
      // console.log('---lineList', this.lineList)
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        title: {
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        bmap: {
          // center: [113.9001818, 22.5824062],
          center: this.lineData,
          zoom: 17,
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
            type: 'lines',
            coordinateSystem: 'bmap',
            data: this.lineList,
            // data: [
            //   {
            //     coords: [
            //       [120.13066322374, 30.240018034923],
            //       [120.33066322374, 29.240018034923],
            //       [120.53066322374, 30.240018034923]
            //     ]
            //   }
            // ],
            polyline: true,
            lineStyle: {
              normal: {
                color: 'purple',
                opacity: 0.6,
                width: 1
              }
            }
          }
        ]
      })
    }
  }
}
</script>
