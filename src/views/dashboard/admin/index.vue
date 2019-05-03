<template>
  <div class="dashboard-editor-container">
    <!-- <github-corner style="position: absolute; top: 0px; border: 0; right: 0;" /> -->

    <div class="filter-container">
      <el-select v-model="searchType" placeholder="类型" clearable style="width: 90px; margin-right: 10px;" class="filter-item">
        <el-option v-for="item in typeOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-input v-model="searchContent" placeholder="请输入搜索内容" style="width: 180px;" class="filter-item" @keyup.native="recommendContent" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style="width: 283px;" @click="handleSubmit" />
    </div>

    <p v-if="searchData" class="search_p">搜索结果：</p>
    <div v-if="searchData" class="card-container">
      <div v-for="(item, index) in searchData" :key="index" class="card-container-div" @click="toSearchUrl(item.detailUrl, item.id)">
        <!-- item.detailUrl -->
        <div class="card-a">
          <img v-if="item.coverUrl !== null" :src="item.coverUrl" class="card-a-img" referrer="no-referrer|origin|unsafe-url">
          <div v-if="item.coverUrl === null" class="card-a-noimg">暂时无图</div>
        </div>
        <div class="card-content">
          <p class="card-name"><a :href="item.detailUrl">{{ item.title }}</a></p>
          <div v-if="searchType === 'Book'" class="card-actor">
            <p v-if="item.peopleContent !== null">{{ item.peopleContent }}</p>
            <p v-if="item.rate !== null">评分：{{ item.rate }}</p>
            <p v-if="item.otherContent !== null">其他：{{ item.otherContent }}</p>
          </div>
          <div v-if="searchType === 'Music'" class="card-actor">
            <p v-if="item.peopleContent !== null">{{ item.peopleContent }}</p>
            <p v-if="item.rate !== null">评分：{{ item.rate }}</p>
            <p v-if="item.otherContent !== null">其他：{{ item.otherContent }}</p>
          </div>
          <div v-if="searchType === 'Movie'" class="card-actor">
            <p v-if="item.peopleContent !== null">{{ item.peopleContent }}</p>
            <p v-if="item.rate !== null">评分：{{ item.rate }}</p>
            <p v-if="item.otherContent !== null">其他：{{ item.otherContent }}</p>
          </div>
        </div>
      </div>
    </div>

    <p v-if="listData" class="search_p">喜欢这个内容的人，也喜欢：</p>
    <div v-if="listData" class="card-layout">
      <div v-for="(item, index) in listData" :key="index" class="cards-container" @click="toSearchUrl(item.detailUrl, item.id)">
        <a class="cards-a" referrer="no-referrer|origin|unsafe-url">
          <img :src="item.coverUrl" class="cards-a-img" referrer="no-referrer|origin|unsafe-url">
        </a>
        <div class="cards-content">
          <p class="cards-name"><a href="">{{ item.title }}</a></p>
          <p v-if="item.peopleContent !== null" class="cards-actor">{{ item.peopleContent }}</p>
          <p v-if="item.rate !== null" class="cards-actor">评分：{{ item.rate }}</p>
          <p v-if="item.otherContent !== null" class="cards-actor">其他：{{ item.otherContent }}</p>
        </div>
      </div>
    </div>

    <p v-if="recommendList" class="search_p">热门推荐：</p>
    <div v-if="recommendList" class="card-layout">
      <div v-for="(item, index) in recommendList" :key="index" class="cards-container" @click="toSearchUrl(item.detailUrl, item.id)">
        <a class="cards-a" referrer="no-referrer|origin|unsafe-url">
          <img :src="item.coverUrl" class="cards-a-img" referrer="no-referrer|origin|unsafe-url">
        </a>
        <div class="cards-content">
          <p class="cards-name"><a href="">{{ item.title }}</a></p>
          <p v-if="item.peopleContent !== null" class="cards-actor">{{ item.peopleContent }}</p>
          <p v-if="item.rate !== null" class="cards-actor">评分：{{ item.rate }}</p>
          <p v-if="item.otherContent !== null" class="cards-actor">其他：{{ item.otherContent }}</p>
        </div>
      </div>
    </div>

    <!-- <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog> -->

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
import { Message } from 'element-ui'
import { fetchRecommendBook, searchAction, fetchRecommendMusic, fetchRecommendVideo } from '@/api/searchInfo'
import { common } from '@/api/bury'
import { recommendSearchContent, simpleRecomend } from '@/api/recommend'
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
      // typeOptions: ['Book', 'Music', 'Movie'],
      typeOptions: ['Book', 'Movie'],
      searchType: '',
      searchContent: '',
      // 展示数据
      listData: null,
      searchData: null,
      recommendList: null,
      // 暂时不用
      lineChartData: lineChartData.newVisitis
    }
  },
  computed: {
    uid: function() {
      return this.$store.getters.uid
    }
  },
  watch: {
    uid() {
      console.log('jjjjjjjjjjjjj')
      this.getSimpleRecomend()
    }
  },
  mounted() {
    this.getSimpleRecomend()
  },
  methods: {
    // 热门推荐
    getSimpleRecomend() {
      // console.log('uid--------:', this.uid)
      this.recommendList = null
      simpleRecomend(this.uid).then(response => {
        console.log('生活推荐:', response.data)
        const li = response.data.data
        this.recommendList = li
      })
    },
    // 点击后，喜欢
    toSearchUrl(url, infoId) {
      const uid = this.$store.getters.uid
      const type = this.searchType
      console.log('url:', url)
      // window.location.href = url
      // type:1书，2电影
      if (type === 'Book') {
        common(uid, 1, infoId).then(response => {
          console.log('书，bury:', response.data)
          Message({
            message: '你喜欢',
            type: 'success',
            duration: 3 * 1000
          })
          // 对话框提示
        })
      } else if (type === 'Movie') {
        common(uid, 2, infoId).then(response => {
          console.log('电影，bury:', response.data)
          Message({
            message: '你喜欢',
            type: 'success',
            duration: 3 * 1000
          })
          // alert('你喜欢')
          // 对话框提示
        })
      }
    },
    // 键盘按下后，触发事件
    recommendContent() {
      const content = this.searchContent
      console.log('按下后，内容:', content)
    },
    // 搜索
    handleSubmit() {
      const uid = this.$store.getters.uid
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
        // type:1 book 2 movie 3 music
        // 查询内容，查询推荐
        searchAction(uid, content, 1).then(response => {
          console.log('书，查询:', response.data)
          this.searchData = response.data.data
        })
        // 查询，邻近推荐
        recommendSearchContent(uid, content, 1).then(response => {
          console.log('书，相似:', response.data)
          const li = response.data.data
          this.listData = li
        })
      } else if (type === 'Music') {
        searchAction(uid, content, 3).then(response => {
          console.log('音乐，查询:', response.data)
          this.searchData = response.data.data
        })
        // this.fetchRecommendMusic2()
        recommendSearchContent(uid, content, 3).then(response => {
          console.log('音乐，相似:', response.data)
          const li = response.data.data
          this.listData = li
        })
      } else if (type === 'Movie') {
        searchAction(uid, content, 2).then(response => {
          console.log('电影，查询:', response.data)
          this.searchData = response.data.data
        })
        // this.fetchRecommendVideo2()
        recommendSearchContent(uid, content, 2).then(response => {
          console.log('电影，相似:', response.data)
          const li = response.data.data
          this.listData = li
        })
      }
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
    }

    // handleSetLineChartData(type) {
    //   this.lineChartData = lineChartData[type]
    // }
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
  margin-top: 10px;
}
.card-container {
  margin-bottom: 20px;
  background-color: white;
  display: flex;
  flex-direction: column;
}
.card-container-div {
  display: flex;
  padding-bottom: 10rpx;
}
.card-a {
  width: 100px;
  height: 140px;
  margin: 15px 15px 0px 20px;
}
.card-a-img {
  width: 100px;
  height: 140px;
}
.card-a-noimg {
  width: 100px;
  height: 140px;
  border: 1px solid #b2b2b2;
  line-height: 150px;
  text-align: center;
  color: #b2b2b2;
}
.card-content {
  flex: 0 1 auto;
  display: flex;
  flex-direction: column;
  margin: 10px 20px 0px 0px;
}
.card-name {
  color: #104E8B;
  font-size: 12px;
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
  text-align: center;
  color: #104E8B;
  font-size: 11px;
}
.cards-actor {
  font-size: 8px;
  color: #b2b2b2;
}
</style>
