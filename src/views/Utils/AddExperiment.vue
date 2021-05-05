<template>
  <div>
    <el-form ref="form" label-position="top" style="width: 60vw;">
      <el-form-item label="实验ID">
        <el-input v-model="experimentID"></el-input>
      </el-form-item>
      <el-form-item label="实验名称" label-position="top">
        <el-input v-model="experimentName" placeholder="请填写实验名称"></el-input>
      </el-form-item>
      <el-form-item label="实验栏目">
        <el-select v-model="eLabel" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="实验时间段" label-position="top">
        <el-checkbox-group v-model="experimentTime">
          <el-checkbox label="上午"></el-checkbox>
          <el-checkbox label="下午"></el-checkbox>
          <el-checkbox label="晚上"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="实验室" label-position="top">
        <el-input v-model="lab"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="AddExperiment" class="submit-btn">添加实验</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {addExperiment} from "@/network/experiment";

export default {
  name: "AddExperiment",
  data() {
    return {
      experimentID: '',
      experimentName: '',
      experimentTime: [],
      lab: '',
      eLabel: 0,
      options: [{
        value: 0,
        label: '电学实验'
      }, {
        value: 1,
        label: '力学实验'
      }, {
        value: 2,
        label: '光/热学实验'
      }],
    }
  },
  methods: {
    AddExperiment() {
      if (this.experimentID === '' || this.experimentName === '' || this.experimentTime.length === 0) {
        this.$notify.warning({
          position: "top-right",
          title: "信息不完整",
          message: "请输入完整的信息",
        });

        return;
      }

      let allNum = /^[0-9]{7}$/
      if (!this.experimentID.match(allNum)) {
        this.$notify.info({
          position: "top-right",
          title: "信息错误",
          message: "请确保输入的实验ID为7位纯数字组成",
        });

        return;
      }

      let EM = 0, EN = 0, EE = 0
      let choice = this.experimentTime

      if (choice.length === 1) {
        if (choice[0] === '上午') EM = 1;
        if (choice[0] === '下午') EN = 1;
        if (choice[0] === '晚上') EE = 1;
      } else if (choice.length === 2) {
        if (choice[0] === '上午' || choice[1] === '上午') EM = 1;
        if (choice[0] === '下午' || choice[1] === '下午') EN = 1;
        if (choice[0] === '晚上' || choice[1] === '晚上') EE = 1;
      } else if (choice.length === 3) {
        EM = EN = EE = 1
      }

      // console.log(EM + " " + EN + " " + EE)
      addExperiment(this.experimentID, this.eLabel, this.experimentName, this.lab, EM, EN, EE).then(
        res => {
          if (res.data.data === 1) {
            this.$notify.success({
              position: "top-right",
              title: "success",
              message: "实验新增成功",
            });

            // TODO 修改跳转路由
            this.$router.push('/')
          } else if (res.data.data === -1) {
            console.log(res)
            this.$notify.warning({
              position: "top-right",
              title: "信息重复",
              message: "ID已被使用",
            });
          }
        }
      )
    }
  }
}
</script>

<style scoped>
>>> .el-form-item {
  margin-bottom: 0;
}

.submit-btn {
  margin-top: 30px;
}
</style>
