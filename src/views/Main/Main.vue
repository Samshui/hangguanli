<template>
  <div>
    <div class="main-body">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="实验 experiment" name="1">
          <div>
            <div>⮚ 电学实验</div>
          </div>
          <div>
            <div>⮚ 力学实验</div>
          </div>
          <div>
            <div>⮚ 热学|光学实验</div>
          </div>
          <div>
            <div>⮚ 实验说明</div>
          </div>
        </el-collapse-item>
        <el-collapse-item title="校内校外 news" name="2">
        </el-collapse-item>
        <el-collapse-item title="个人信息 profile" name="3">
        </el-collapse-item>
        <el-collapse-item title="消息中心 message" name="4">
        </el-collapse-item>
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
import EleLab from "@/views/Lab/EleLab";
import Profile from "@/views/Profile/Profile";
import ChangeProfile from "@/views/Profile/ChangeProfile";
import News from "@/views/Main/News";
import ReserveLab from "@/views/Lab/ReserveLab";
import EngLab from "@/views/Lab/EngLab";
import ForceLab from "@/views/Lab/ForceLab";
import Introduction from "@/views/Lab/Introduction";
import Lis from "@/views/Utils/Lis";
import Header from "@/components/Header";

export default {
  name: "Main",
  components: {},
  data() {
    return {
      activeNames: [],
      activities: [{
        content: '@samshui - HGL项目开启',
        timestamp: '2020-10-01',
        color: '#0bbd87'
      }, {
        content: '@samshui - 前端v1.0完成',
        timestamp: '2021-1-?',
        color: '#9ec99f'
      }, {
        content: '@samshui - 后端框架编写 realized by gin',
        timestamp: '2021-4-1',
        color: '#80baec'
      }, {
        content: '@samshui - 前端优化版v1.1完成',
        timestamp: '2021-4-27',
        color: '#efa8a8'
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
  margin-top: 50px;
  margin-bottom: 100px;
}
</style>
