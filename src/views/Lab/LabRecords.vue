<template>
  <div class="table-class">
    <el-tabs v-model="activeName" type="border-card">
      <el-tab-pane label="电学实验" name="first">
        <el-table
          :data="allExperiments_0"
          style="width: 100%">
          <el-table-column prop="Eid" label="实验ID" width="180"></el-table-column>
          <el-table-column prop="Name" label="实验名称" width="180"></el-table-column>
          <el-table-column prop="Lab" label="实验室" width="180"></el-table-column>
          <el-table-column prop="SiteSize" label="总位置" width="150"></el-table-column>
          <el-table-column prop="TimeMorning" label="时间/早上" width="100"></el-table-column>
          <el-table-column prop="TimeNoon" label="时间/下午" width="100"></el-table-column>
          <el-table-column prop="TimeEvening" label="时间/晚上" width="100"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="力学实验" name="second">
        <el-table
          :data="allExperiments_1"
          style="width: 100%">
          <el-table-column prop="Eid" label="实验ID" width="180"></el-table-column>
          <el-table-column prop="Name" label="实验名称" width="180"></el-table-column>
          <el-table-column prop="Lab" label="实验室" width="180"></el-table-column>
          <el-table-column prop="SiteSize" label="总位置" width="150"></el-table-column>
          <el-table-column prop="TimeMorning" label="时间/早上" width="100"></el-table-column>
          <el-table-column prop="TimeNoon" label="时间/下午" width="100"></el-table-column>
          <el-table-column prop="TimeEvening" label="时间/晚上" width="100"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="热/光学实验" name="third">
        <el-table
          :data="allExperiments_2"
          style="width: 100%">
          <el-table-column prop="Eid" label="实验ID" width="180"></el-table-column>
          <el-table-column prop="Name" label="实验名称" width="180"></el-table-column>
          <el-table-column prop="Lab" label="实验室" width="180"></el-table-column>
          <el-table-column prop="SiteSize" label="总位置" width="150"></el-table-column>
          <el-table-column prop="TimeMorning" label="时间/早上" width="100"></el-table-column>
          <el-table-column prop="TimeNoon" label="时间/下午" width="100"></el-table-column>
          <el-table-column prop="TimeEvening" label="时间/晚上" width="100"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {getExperimentByLabel} from "@/network/experiment";

export default {
  name: "LabRecords",
  data() {
    return {
      activeName: 'first',
      allExperiments_0: null,
      allExperiments_1: null,
      allExperiments_2: null
    }
  },
  created() {
    getExperimentByLabel(0).then(res => {
      this.allExperiments_0 = res.data.experiments
    }).catch(err => {
        console.log(err)
      }
    )

    getExperimentByLabel(1).then(res => {
      this.allExperiments_1 = res.data.experiments
    }).catch(err => {
        console.log(err)
      }
    )

    getExperimentByLabel(2).then(res => {
      this.allExperiments_2 = res.data.experiments
    }).catch(err => {
        console.log(err)
      }
    )
  }
}
</script>

<style scoped>
.table-class {
  display: flex;
  flex-direction: column;
  /*border: 1px solid red;*/
  padding-left: 20px;
  padding-top: 20px;
  align-items: center
}

>>> .el-tabs--border-card {
  box-shadow: 0 0 0 0;
}
</style>
