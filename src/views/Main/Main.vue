<template>
  <div>
    <div class="main-body">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="实验 experiment" name="1"></el-collapse-item>
        <el-collapse-item title="校内校外 news" name="2"></el-collapse-item>
        <el-collapse-item title="个人信息 profile" name="3"></el-collapse-item>
        <el-collapse-item title="消息中心 message" name="4"></el-collapse-item>
      </el-collapse>
    </div>
    <el-divider>项目时间线</el-divider>
    <div class="block">
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :icon="activity.icon"
          :type="activity.type"
          :color="activity.color"
          :size="activity.size"
          :timestamp="activity.timestamp">
          {{activity.content}}
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
export default {
  name: "Main",
  components: {},
  data() {
    return {
      activeNames: [],
      activities: [{
        content: '@samshui/@honglong/@cxy - HGL项目开启',
        timestamp: '2021-4',
        color: '#0bbd87'
      }, {
        content: '@samshui - 前端v1.0完成',
        timestamp: '2021-4',
        color: '#9ec99f'
      }, {
        content: '@honglong/@cxy - 后端框架编写 /* realized by SpringBoot */',
        timestamp: '2021-5-15',
        color: '#80baec'
      }, {
        content: '@samshui - 前端优化版v1.1完成',
        timestamp: '2021-5-27',
        color: '#efa8a8'
      }, {
        content: '@whole Team - 项目收尾',
        timestamp: '2021-6-1',
        color: '#d8d1f5'
      }]
    }
  },
  methods: {
  },
  created() {
  }
}
</script>

<style scoped>
.main-body {
  width: 50vw;
  margin-left: 27%;
  margin-top: 50px;
  margin-bottom: 100px;
}

.block {
  width: 50vw;
  margin-left: 27%;
  margin-top: 20px;
  margin-bottom: 100px;
}
</style>
