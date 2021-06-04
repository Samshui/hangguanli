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
          title: "信息不完整",
          message: "请输入正确的7位实验ID",
        });

        return
      }

      deleteExperiment(this.experimentID).then(
        res => {
          console.log(res)

          if (res.status === -1) {
            this.$notify.error({
              type: "error",
              message: "请检查网络情况"
            })
            return
          }

          if (res.status === 1) {
            this.$notify.warning({
              title: "失败",
              message: "删除失败"
            })
            return
          }

          if (res.status === 2) {
            this.$notify.warning({
              title: "不存在",
              message: "不存在该实验"
            })
            return
          }

          if (res.status === 0) {
            this.$notify.success({
              title: "success",
              message: "实验删除成功",
            });
          }


          // if (res.data.data === 1) {
          //   this.$notify.success({
          //     position: "top-right",
          //     title: "success",
          //     message: "实验删除成功",
          //   });
          //   this.$router.push('/manage')
          // } else if (res.data.data === -1) {
          //   this.$notify.warning({
          //     position: "top-right",
          //     title: "ID不存在",
          //     message: "不存在该ID的实验",
          //   });
          // }
        })
    }
  }
}
</script>

<style scoped>

</style>
