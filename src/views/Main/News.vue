<template>
  <div class="hover-body">
    <div class="hover-tab">
      <el-carousel height="200px" indicator-position="outside">
        <el-carousel-item v-for="item in 4" :key="item">
          <h3>{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
    <el-divider>近日新闻</el-divider>
    <div class="news">
      <div>
        <el-tag type="success">校内</el-tag>
        <el-card class="box-card" shadow="never">
          <div class="item">/* 暂时还没有，看看其他的吧~ */</div>
        </el-card>
      </div>
      <div>
        <el-tag type="warning">校外</el-tag>
        <el-card class="box-card" shadow="never">
          <div class="item">/* 暂时还没有，看看其他的吧~ */</div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "News"
}
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 10px;
  opacity: 0.75;
  line-height: 20px;
  padding-left: 20px;
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
</style>
