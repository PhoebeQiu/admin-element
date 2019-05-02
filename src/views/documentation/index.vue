<template>
  <div class="app-container documentation-container">
    <p v-if="pieList.length > 0" class="search_p">Google - 网站搜索次数排行榜：</p>
    <div v-if="pieList.length > 0" class="chart-wrapper">
      <div class="chart-item">
        <pie-chart :pie-list="pieList" :pie-data="pieData" />
      </div>
    </div>

    <p v-if="mapList.length > 0" class="search_p">天气地图：</p>
    <div v-if="mapList.length > 0" class="chart-wrapper">
      <div class="chart-item">
        <map-chart :map-list="mapList" :map-data="mapData" :map-max="mapMax" />
      </div>
    </div>

    <p v-if="lineList.length > 0" class="search_p">路径地图：</p>
    <div v-if="lineList.length > 0" class="chart-wrapper">
      <div class="chart-item">
        <line-chart :line-list="lineList" :line-data="lineData" />
      </div>
    </div>
  </div>
</template>
<script>
import PieChart from './components/PieChart'
import MapChart from './components/MapChart'
import LineChart from './components/LineMapChart'
import { statisticSearchInfo, listLocation, listWeather } from '@/api/searchInfo'
export default {
  name: 'Documentation',
  components: {
    PieChart,
    MapChart,
    LineChart
  },
  data() {
    return {
      pieList: [],
      pieData: [],
      mapList: [],
      mapData: [],
      lineList: [],
      lineData: [],
      mapMax: []
    }
  },
  computed: {
    uid: function() {
      return this.$store.getters.uid
    }
  },
  watch: {
    uid() {
      this.statisticSearchInfo2()
      this.listLocation2()
      this.listWeather2()
    }
  },
  mounted() {
    this.statisticSearchInfo2()
    this.listLocation2()
    this.listWeather2()
  },
  methods: {
    // 搜索排行
    statisticSearchInfo2() {
      this.pieList = []
      statisticSearchInfo(this.uid).then(response => {
        const reaData = response.data.data.slice(0, 6)
        console.log('获取搜索排行数据', reaData)
        reaData.forEach(item => {
          this.pieList.push(item.url)
        })
        this.pieData = reaData.map(item => {
          return {
            value: item.count,
            name: item.url
          }
        })
        // console.log('排行list', this.pieList)
        // console.log('排行data', this.pieData)
      })
    },
    // 路径
    listLocation2() {
      this.lineList = null
      // this.lineList = []
      // this.lineData = []
      listLocation(this.uid).then(response => {
        console.log('路径图', response.data)
        const reaData = response.data.data
        // const reaData = response.data.data.slice(0, 99)
        // console.log('路径图--', reaData)
        const coords = []
        reaData.forEach(item => {
          coords.push(item)
        })
        this.lineList = [
          {
            coords
          }
        ]
        // console.log('路径图lineList', this.lineList)
        this.lineData = reaData[0]
        // console.log('路径图lineData', this.lineData)
      })
    },
    // 天气
    listWeather2() {
      this.mapList = []
      listWeather(this.uid).then(response => {
        console.log('天气图', response.data)
        const reaData = response.data.data.slice(0, 99)
        reaData.forEach(item => {
          const a = [item.longitude, item.latitude, item.tmp]
          const b = {}
          b.value = a
          this.mapList.push(b)
        })
        // console.log('天气图lineList', this.mapList)
        const aa = [reaData[0].longitude, reaData[0].latitude, reaData[0].tmp]
        const bb = {}
        bb.value = aa
        this.mapMax.push(bb)
        this.mapData = [reaData[0].longitude, reaData[0].latitude]
        // console.log('天气图lineData', this.mapData)
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.search_p {
  text-align: center;
  font-size: 15px;
  margin-top: 10px;
}
.documentation-container {
  // margin: 50px;
  // .document-btn {
  //   float: left;
  //   margin-left: 50px;
  //   display: block;
  //   cursor: pointer;
  //   background: black;
  //   color: white;
  //   height: 60px;
  //   width: 200px;
  //   line-height: 60px;
  //   font-size: 20px;
  //   text-align: center;
  // }
}
.chart-wrapper {
  background: #fff;
  padding: 16px 0px 0;
  // margin-bottom: 32px;
  border: 1px solid #b2b2b2;
  border-radius: 10px;
  margin-bottom: 20px;
}
.chart-item {
  // width: 200px;
  // height: 200px;
}
</style>
