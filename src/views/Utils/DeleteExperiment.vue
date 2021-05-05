<template>
  <div>
    <el-form ref="form" label-position="top" style="width: 60vw">
      <el-form-item label="实验ID">
        <el-input v-model="experimentID"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="DeleteExperiment">删除实验</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {deleteExperiment} from "@/network/experiment";

export default {
  name: "DeleteExperiment",
  data() {
    return {
      experimentID: ''
    }
  },
  methods: {
    DeleteExperiment() {
      if (this.experimentID.length !== 7) {
        this.$notify.warning({
          position: "top-right",
          title: "信息不完整",
          message: "请输入正确的7位实验ID",
        });

        return
      }

      deleteExperiment(this.experimentID).then(
        res => {
          if (res.data.data === 1) {
            this.$notify.success({
              position: "top-right",
              title: "success",
              message: "实验删除成功",
            });
            this.$router.push('/manage')
          } else if (res.data.data === -1) {
            this.$notify.warning({
              position: "top-right",
              title: "ID不存在",
              message: "不存在该ID的实验",
            });
          }
        })
    }
  }
}
</script>

<style scoped>

</style>
