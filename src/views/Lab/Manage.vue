<template>
  <div>
    <div v-if="this.user.status !== 0" class="warn">
      <div class="warning-zh">权限不足，请联系管理员</div>
      <div class="warning-en">/* Permission Denied! */</div>
      <div>
        <img src="../../assets/img/permission-denied.jpg" class="img-warn">
      </div>
    </div>
    <div v-else>
      <el-tabs type="border-card" class="manage-body">
        <el-tab-pane>
          <span slot="label">新增实验</span>
          <div class="manage-page">
            <AddExperiment></AddExperiment>
          </div>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label">删除实验</span>
          <div class="manage-page">
            <DeleteExperiment></DeleteExperiment>
          </div>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label">实验选择统计</span>
          <div class="manage-page">
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import AddExperiment from "@/views/Utils/AddExperiment";
import DeleteExperiment from "@/views/Utils/DeleteExperiment";
export default {
  name: "Manage",
  components: {DeleteExperiment, AddExperiment},
  data() {
    return {
      user: null
    }
  },
  methods: {

  },
  created() {
    this.user = this.$store.state.user
  }
}
</script>



<style scoped>
.warn {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 90vh;
  width: 100vw;
  /*background-image: linear-gradient(30deg, #cefaec, #fac8f5);*/

  position: relative;
  overflow: hidden;
}

.warning-zh {
  margin-top: 6vh;
  font-family: "PingFang SC";
  font-size: 5rem;
}

.warning-en {
  font-family: "Fira Code Retina";
  font-size: 3rem;
  color: #db6767;
  margin-bottom: 5vh;
}

.img-warn {
  margin-top: 100px;
  width: 300px;
}

.manage-body {
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  width: 70vw;
  height: fit-content;
  overflow: auto;
  margin-top: 30px;
}

.manage-page {
  display: flex;
  margin: 0 auto;
  padding-top: 20px;
  width: 60vw;
}

>>> .el-tabs--border-card {
  box-shadow: 0 0 0 0;
}
</style>
