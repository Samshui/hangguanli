<template>
  <div class="hover-body">
    <div class="hover-tab">
      <el-carousel height="200px" indicator-position="outside">
        <el-carousel-item v-for="(img, index) in images" :key="index">
          <div class="pic_item">
            <img class="small" :src="img.url"/>
            <h3>{{ img.context }}</h3>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <el-divider>近日新闻</el-divider>
    <div class="news">
      <div>
        <el-tag type="success">校内</el-tag>
        <el-card class="box-card" shadow="never">
          <div class="item">
            <div v-for="(oneNew, index) in schoolNews" @click="notBuild()" class="each-news">
              <div>
                <img src="../../assets/img/hot.png" class="news-icon" v-if="oneNew.hotLevel === 0">
                <img src="../../assets/img/smallhot.png" class="news-icon" v-if="oneNew.hotLevel === 1">
                <img src="../../assets/img/news.png" class="news-icon" v-if="oneNew.hotLevel === 2">
              </div>
              <div>{{ oneNew.title }}</div>
            </div>
          </div>
        </el-card>
      </div>
      <div>
        <el-tag type="warning">校外</el-tag>
        <el-card class="box-card" shadow="never">
          <div class="item">
            <div v-for="(oneNew, index) in worldNews" @click="notBuild()" class="each-news">
              <div>
                <img src="../../assets/img/hot.png" class="news-icon" v-if="oneNew.hotLevel === 0">
                <img src="../../assets/img/smallhot.png" class="news-icon" v-if="oneNew.hotLevel === 1">
                <img src="../../assets/img/news.png" class="news-icon" v-if="oneNew.hotLevel === 2">
              </div>
              <div>{{ oneNew.title }}</div>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "News",
  data() {
    return {
      images: [
        {url: require('../../assets/img/img4.jpg'), context: '色彩艺术展馆 - 北航站'},
        {url: require('../../assets/img/img2.jpg'), context: '街边艺术'},
        {url: require('../../assets/img/buaabg.jpg'), context: '北航校园活动'}
      ],
      schoolNews: [
        {title: '中央第十三巡视组巡视北京航空航天大学党委工作动员会召开', hotLevel: 0},
        {title: '北航召开少数民族学生代表座谈会', hotLevel: 0},
        {title: '我校召开校党委理论学习中心组第九次专题学习会', hotLevel: 0},
        {title: '中国航空工程科技发展战略研究院第二届学术委员会第三次会议在北航召开', hotLevel: 1},
        {title: '北航举办“学党史·读好书”北航青年教师读书分享会', hotLevel: 1},
        {title: '北航福建校友会换届大会暨信创产业与实践论坛在福州举行', hotLevel: 1},
        {title: '北航师生热议习近平总书记在两院院士大会中国科协第十次全国代表大会上重要讲话', hotLevel: 2},
        {title: '首都高校第九届校园铁人三项赛暨全国高校第八届校园铁人三项邀请赛在北航举行', hotLevel: 2},
      ],
      worldNews: [
        {title: 'Roman Protasevich: Belarus journalist\'s confession was forced', hotLevel: 0},
        {title: 'Tiananmen: Hong Kong vigil organiser arrested on 32nd anniversary', hotLevel: 0},
        {title: 'UN: Cost of food rises at fastest pace in over a decade', hotLevel: 1},
        {title: 'Cardinal George Pell', hotLevel: 1},
        {title: 'The Afghan policewoman facing abuse at work', hotLevel: 2},
        {title: 'West Africa\'s Islamist insurgency: Fight at a critical stage', hotLevel: 2},
        {title: 'Oshin: The gritty Japanese drama that gripped the world', hotLevel: 2},
      ]
    }
  },
  methods: {
    notBuild() {
      this.$notify.info({
        title: '该模块未进入需求规划',
        message: '静等开发......'
      })
    }
  }
}
</script>

<style scoped>
.el-carousel__item h3 {
  color: #ffffff;
  font-family: "Fira Code", "FangSong";
  font-size: 20px;
  padding-left: 10px;
}

.el-carousel__item:nth-child(2n) {
  background-color: #b1d4f3;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

.hover-tab {
  width: 600px;
  min-width: 600px;
  max-width: 600px;
  margin: 0 auto;
}

.hover-body {
  padding-top: 50px;
}

.news {
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  width: 80vw;
  justify-content: space-between;
  height: fit-content;
}

.box-card {
  width: 38vw;
  margin-top: 10px;
}

.item {
  margin-bottom: 10px;
}

>>> .el-card {
  border: 1px dashed #8cc0d4;
}

.small {
  width: 100%;
  height: 100%;
  position: relative;
}

.pic_item {
  position: relative;
  height: 100%;
}

.pic_item:hover {
  cursor: pointer;
}

.pic_item img {
  width: 100%;
  height: 100%;
}

.pic_item h3 {
  position: absolute;
  left: 1rem;
  bottom: 0.5rem;
}

.news-icon {
  width: 20px;
  height: 20px;
}

.each-news {
  padding-bottom: 7px;
  display: flex;
  flex-direction: row;
  align-items: center
}

.each-news:hover {
  cursor: pointer;
  color: #db6767;
}
</style>
