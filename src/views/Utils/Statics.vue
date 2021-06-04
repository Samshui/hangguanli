<template>
  <div>
    <div class="input-style">
      <el-input placeholder="请输入查找实验ID" v-model="experimentID" clearable></el-input>
      <el-button size="medium" type="primary" class="submit-btn" @click="searchRecords">查找</el-button>
    </div>
    <el-divider><i class="el-icon-mobile-phone"></i></el-divider>
    <div>
      <div style="color: brown">* 一共{{ recordsCount }}条记录</div><br>
      <el-table :data="allRecords" stripe style="width: 100%">
        <el-table-column prop="date" label="日期"></el-table-column>
        <el-table-column prop="time" label="时间"></el-table-column>
        <el-table-column prop="userID" label="学号"></el-table-column>
        <el-table-column prop="site" label="位置"></el-table-column>
        <el-table-column prop="lab" label="实验室"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {getAllRecords} from "@/network/record";

export default {
  name: "Statics",
  data() {
    return {
      experimentID: '',
      recordsCount: 0,
      allRecords: null
    }
  },
  methods: {
    searchRecords() {
      getAllRecords(this.experimentID).then(
        res => {
          console.log(res)
          this.allRecords = res.data
          if (res.data.data === 1) {
            this.recordsCount = res.data.records.length
          }
        }
      )
    }
  },
  created() {

  },
}
</script>

<style scoped>
.input-style {
  display: flex;
  flex-direction: row;
}

.submit-btn {
  margin-left: 30px;
}
</style>
