<template>
  <div class="dashboard-editor-container">
    <!-- <github-corner style="position: absolute; top: 0px; border: 0; right: 0;" /> -->

    <div class="filter-container">
      <el-select v-model="searchType" placeholder="类型" clearable style="width: 90px; margin-right: 10px;" class="filter-item">
        <el-option v-for="item in typeOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-input v-model="searchContent" placeholder="请输入搜索内容" style="width: 180px;" class="filter-item" @keyup.enter.native="handleSubmit" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="width: 283px;" @click="handleSubmit" />
    </div>

    <p v-if="searchData" class="search_p">搜索结果匹配的：</p>
    <div v-if="searchData" class="card-container">
      <a :href="searchData.url" class="card-a">
        <img v-if="searchData.cover !== null" :src="searchData.cover" class="card-a-img" referrer="no-referrer|origin|unsafe-url">
        <div v-if="searchData.cover === null" class="card-a-noimg">暂时无图</div>
      </a>
      <div class="card-content">
        <p class="card-name"><a :href="searchData.url">{{ searchData.title }}</a></p>
        <p v-if="searchType === 'Book'" class="card-actor">{{ searchData.actor }}</p>
        <p v-if="searchType === 'Music'" class="card-actor">{{ searchData.singerName }}</p>
        <p v-if="searchType === 'Movie'" class="card-actor">{{ searchData.director[0] }}</p>
      </div>
    </div>

    <p v-if="listData">相似的内容推荐：</p>
    <div v-if="listData" class="card-layout">
      <div v-for="(item, index) in listData" :key="index" class="cards-container">
        <a class="cards-a" :href="item.url" referrer="no-referrer|origin|unsafe-url">
          <img :src="item.cover" class="cards-a-img" referrer="no-referrer|origin|unsafe-url">
        </a>
        <div class="cards-content">
          <p class="cards-name"><a href="">{{ item.title }}</a></p>
          <p class="cards-actor">作者：{{ item.actor }}</p>
        </div>
      </div>
    </div>

    <!-- <panel-group @handleSetLineChartData="handleSetLineChartData" />

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData" />
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <raddar-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="8">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">
        <transaction-table />
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <todo-list />
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <box-card />
      </el-col>
    </el-row> -->

  </div>
</template>

<script>

import { fetchRecommendBook, fetchRecommendMusic, fetchRecommendVideo, searchBook, searchMusic, searchVideo } from '@/api/searchInfo'
import waves from '@/directive/waves' // Waves directive

// import GithubCorner from '@/components/GithubCorner'
// import PanelGroup from './components/PanelGroup'
// import LineChart from './components/LineChart'
// import RaddarChart from './components/RaddarChart'
// import PieChart from './components/PieChart'
// import BarChart from './components/BarChart'
// import TransactionTable from './components/TransactionTable'
// import TodoList from './components/TodoList'
// import BoxCard from './components/BoxCard'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  name: 'DashboardAdmin',
  components: {
    // GithubCorner,
    // PanelGroup,
    // LineChart,
    // RaddarChart,
    // PieChart,
    // BarChart,
    // TransactionTable,
    // TodoList,
    // BoxCard
  },
  directives: { waves },
  data() {
    return {
      typeOptions: ['Book', 'Music', 'Movie'],
      searchType: '',
      searchContent: '',
      // 展示数据
      listData: null,
      searchData: null,
      // 暂时不用
      lineChartData: lineChartData.newVisitis
    }
  },
  mounted() {
  },
  methods: {
    aaa() {
      console.log('121231')
    },
    handleSubmit() {
      const type = this.searchType
      const content = this.searchContent
      if (type === '') {
        // 提示选择搜索类型
        return
      } else if (content === '') {
        // 提示填写搜索内容
        return
      }
      this.listData = null
      this.searchData = null
      console.log('.searchType', type)
      console.log('.searchContent', content)
      if (type === 'Book') {
        this.searchBook2(content)
        this.fetchRecommendBook2()
      } else if (type === 'Music') {
        this.searchMusic2(content)
        this.fetchRecommendMusic2()
      } else if (type === 'Movie') {
        this.searchVideo2(content)
        this.fetchRecommendVideo2()
      }
    },

    searchBook2(content) {
      searchBook(content).then(response => {
        console.log('searchBook', response.data)
        this.searchData = response.data.data
      })
    },
    searchMusic2(content) {
      searchMusic(content).then(response => {
        console.log('searchMusic', response.data)
        if (response.data.data.id) {
          this.searchData = response.data.data
        }
      })
    },
    searchVideo2(content) {
      searchVideo(content).then(response => {
        console.log('searchVideo', response.data)
        this.searchData = response.data.data
      })
    },

    fetchRecommendVideo2() {
      fetchRecommendVideo().then(response => {
        console.log('video', response.data)
        const li = response.data.data
        // let li = []
        // for (let i = 0; i < 5; i++) {
        //   li.push(response.data.data[i])
        // }
        this.listData = li
      })
    },
    fetchRecommendMusic2() {
      fetchRecommendMusic().then(response => {
        console.log('music', response.data)
        const li = response.data.data
        this.listData = li
      })
    },
    fetchRecommendBook2() {
      fetchRecommendBook().then(response => {
        console.log('book', response.data)
        // let li = response.data.data
        // const li = []
        // for (let i = 0; i < 5; i++) {
        //   li.push(response.data.data[i])
        // }
        // this.listData = li
        const li = response.data.data
        this.listData = li
      })
    },

    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

.search_p {
  font-size: 15px;
  margin-top: 30px;
}
.card-container {
  margin-bottom: 40px;
  background-color: white;
  display: flex;
}
.card-a {
  width: 110px;
  height: 160px;
  margin: 15px 15px 15px 20px;
}
.card-a-img {
  width: 110px;
  height: 160px;
}
.card-a-noimg {
  width: 110px;
  height: 160px;
  border: 1px solid #b2b2b2;
  line-height: 150px;
  text-align: center;
  color: #b2b2b2;
}
.card-content {
  flex: 0 1 auto;
  display: flex;
  flex-direction: column;
  margin: 20px 20px 0px 0px;
}
.card-name {
  color: #104E8B;
  font-size: 14px;
}
.card-actor {
  font-size: 11px;
}

.card-layout {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.cards-container {
  margin-bottom: 15px;
  // margin-left: 10px;
  width: 140px;
  // height: 230px;
  background-color: white;
}
.cards-a{
  width: 200px;
  height: 100px;
}
.cards-a-img {
  width: 90px;
  height: 120px;
  margin-top: 10px;
  margin-left: 27px;
  margin-bottom: 5px;
}
.cards-content {
  margin-bottom: 10px;
  margin-left: 10px;
}
.cards-name {
  color: #104E8B;
  font-size: 11px;
}
.cards-actor {
  font-size: 8px;
  color: #b2b2b2;
}
</style>
