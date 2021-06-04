<template>
  <div class="reserve-body">
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="预约实验" name="first">
        <div class="reserve-body">

          <el-select v-model="experimentChoose" class="input-style" filterable placeholder="选择实验 | 可输入关键词查找"
                     @change="changeSelected">
            <el-option-group label="实验">
              <el-option v-for="item in allExperiments" :key="item.eid" :label="item.ename"
                         :value="item.eid"></el-option>
            </el-option-group>
          </el-select>

          <div class="block">
            <el-date-picker
              class="input-style"
              v-model="dateChoose"
              type="date"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptions"
              placeholder="选择日期">
            </el-date-picker>
          </div>

          <div style="margin-bottom: 20px">
            <el-radio v-model="timeChoose" label="0">上午(8:50-11:50)</el-radio>
            <el-radio v-model="timeChoose" label="1">下午(14:30-17:30)</el-radio>
            <el-radio v-model="timeChoose" label="2">晚上(18:30-21:30)</el-radio>
          </div>

          <el-card class="place" shadow="never">
            <div slot="header" class="clearfix">
              <span>实验座位选择</span>
            </div>
            <el-radio v-for="o in this.siteSize" :key="o" class="one-chosen" v-model="site"
                      :label="o" :disabled="checkSiteStatus(o)">{{ '位置' + o }}
            </el-radio>
          </el-card>

          <el-button size="medium" type="primary" class="submit-btn" @click="reserveSubmit">提交</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="查看当前预约" name="second">
        <el-card shadow="never">
          <div slot="header" class="clearfix">
            <span>实验预约</span>
          </div>
          <div>
            <el-table
              height="450"
              stripe
              :data="reserveData.filter(data => !search || data.ExperimentName.toLowerCase().includes(search.toLowerCase()))"
              style="width: 100%">
              <el-table-column type="index"></el-table-column>
              <el-table-column label="预约日期" prop="date"></el-table-column>
              <el-table-column label="实验编号" prop="eid"></el-table-column>
              <el-table-column label="实验名称" prop="ename"></el-table-column>
              <el-table-column label="实验时间" prop="time"></el-table-column>
              <el-table-column label="实验室" prop="lab"></el-table-column>
              <el-table-column label="位置" prop="site"></el-table-column>
              <el-table-column align="right">
                <template slot="header" slot-scope="scope">
                  <el-input v-model="search" size="mini" placeholder="输入实验名称关键字搜索"/>
                </template>
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">取消预约
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-tab-pane>
            <el-tab-pane label="学期已完成实验" name="third">
              <el-card shadow="never" class="before-score">
                <div slot="header" class="clearfix">
                  <span>已完成实验</span>
                </div>
                <div>
                  <el-table
                    height="450"
                    stripe
                    :data="completeData.filter(data => !search || data.labName.toLowerCase().includes(search.toLowerCase()))"
                    style="width: 100%">
                    <el-table-column type="index"></el-table-column>
                    <el-table-column label="预约日期" prop="date"></el-table-column>
                    <el-table-column label="实验名称" prop="labName"></el-table-column>
                    <el-table-column label="实验时间" prop="time"></el-table-column>
                    <el-table-column label="实验室" prop="roomID"></el-table-column>
                    <el-table-column label="位置" prop="seatID"></el-table-column>
                    <el-table-column label="成绩" prop="score"></el-table-column>
                    <el-table-column align="right">
                      <template slot="header" slot-scope="scope">
                        <el-input v-model="search" size="mini" placeholder="输入名称关键字搜索"/>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </el-card>
            </el-tab-pane>
            <el-tab-pane label="chart" name="forth">
              <div class="processes">
                <div class="one-part">
                  <el-divider>大二上学期进度</el-divider>
                  <el-progress type="circle" :percentage="labPercent[0]" color="#6f9eaf"></el-progress>
                  <el-divider>大二下学期进度</el-divider>
                  <el-progress type="circle" :percentage="labPercent[1]" color="#008891"></el-progress>
                </div>
                <div class="one-part">
                  <el-divider>大三上学期进度</el-divider>
                  <el-progress type="circle" :percentage="labPercent[2]" color="#16697a"></el-progress>
                  <el-divider>大三下学期进度</el-divider>
                  <el-progress type="circle" :percentage="labPercent[3]" color="#00587a"></el-progress>
                </div>
              </div>
            </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {getAllExperiments, getExperimentByEID} from "@/network/experiment";
import {addRecord, deleteRecord, getSiteSelected, getUserRecords} from "@/network/record";

export default {
  name: "ReserveLab",
  data() {
    return {
      activeName: 'first',
      value: '',
      pickerOptions: {
        disabledDate(time) {
          let end = new Date()
          end.setTime(Date.now() + 3600 * 1000 * 24 * 7)
          return time.getTime() < Date.now() || time.getTime() > end;
        },
      },
      experimentChoose: '',
      dateChoose: '',
      timeChoose: '',
      site: '',
      siteSelected: null,
      reserveData: [],
      completeData: [],
      search: '',
      labPercent: [0, 0, 0, 0],
      siteSize: 0,
      siteStatus: null,
      allExperiments: null,
      chooseExperiment: null
    }
  },
  methods: {
    handleClick(tab, event) {

    },
    handleEdit(index, row) {

    },
    handleDelete(index, row) {
      this.$confirm('确认取消预约？')
        .then(res => {
          deleteRecord(row.eid, row.userID, row.date, row.time, row.site).then(
            res => {
              if (res.status === -1) {
                this.$notify.error({
                  title: 'error',
                  message: '请检查网络'
                })
                return
              }

              if (res.status === 1) {
                this.$notify.warning({
                  title: 'warning',
                  message: '预约取消失败'
                })
                return
              }

              if (res.status === 0) {
                this.$notify.success({
                  title: 'success',
                  message: '预约已取消'
                })
                getUserRecords(this.$store.state.user.userID).then(
                  res => {
                    if (res.status === -1) {
                      this.$notify.error({
                        title: "error",
                        message: "请检查网络"
                      })
                      return
                    }

                    if (res.status === 1) {
                      this.$notify.warning({
                        title: "warning",
                        message: "获取预约失败"
                      })
                      return
                    }

                    if (res.status === 2)
                      this.reserveData = new Array(0)

                    if (res.status === 0)
                      this.reserveData = res.data
                  })
              }
            })
        })
        .catch(err => {
          console.log(err)
        });
    },
    changeSelected(value) {
      this.experimentChoose = value

      getExperimentByEID(value).then(
        res => {
          this.chooseExperiment = res.data
          this.siteSize = res.data.siteSize
        }
      )
    },
    reserveSubmit() {
      if (this.site === '') {
        this.$notify.info({
          title: "info",
          message: "请选择位置"
        })
        return
      }

      addRecord(this.experimentChoose,
        this.$store.state.user.userID,
        this.dateChoose,
        this.timeChoose,
        this.site,
        this.chooseExperiment.ename,
        this.chooseExperiment.lab).then(
        res => {
          if (res.status === -1) {
            this.$notify.error({
              title: "error",
              message: "请检查网络情况"
            })
            return
          }

          if (res.status === 1) {
            this.$notify.warning({
              title: "失败",
              message: "新增预约记录失败"
            })
            return
          }

          if (res.status === 0) {
            this.$notify.success({
              title: "成功",
              message: "预约成功"
            })
          }

          // if (res.data.data === -1) {
          //   this.$notify({
          //     type: 'warning',
          //     message: '请勿重复预约'
          //   })
          //   return
          // } else if (res.data.data === -2) {
          //   this.$notify({
          //     type: 'warning',
          //     message: '该位置已经被占用，请刷新'
          //   })
          //   return
          // } else if (res.data.data === -3) {
          //   this.$notify({
          //     type: 'warning',
          //     message: '当前时段您存在其他实验'
          //   })
          //   return
          // }
          //
          // this.$notify({
          //   type: 'success',
          //   message: '预约成功'
          // })
          //
          // 换界面
          this.activeName = 'second'
          this.experimentChoose = ''
          this.dateChoose = ''
          this.timeChoose = ''
          this.site = ''
          getUserRecords(this.$store.state.user.userID).then(res => {
            this.reserveData = res.data
          })
        }
      )
    },
    checkSiteStatus(site) {
      if (this.siteSelected === null) return false

      for (let i = 0; i < this.siteSelected.length; i++) {
        if (this.siteSelected[i] === site) return true
      }
      return false
    }
  },
  created() {
    getAllExperiments().then(res => {
      this.allExperiments = res.data
    })

    getUserRecords(this.$store.state.user.userID).then(
      res => {
        if (res.status === -1) {
          this.$notify.error({
            title: "error",
            message: "请检查网络"
          })
          return
        }

        if (res.status === 1) {
          this.$notify.warning({
            title: "warning",
            message: "获取预约失败"
          })
          return
        }

        if (res.status === 2)
          this.reserveData = new Array(0)

        if (res.status === 0)
          this.reserveData = res.data
      }
    )
  },
  computed: {
    changeData() {
      const {experimentChoose, dateChoose, timeChoose} = this;
      return {
        experimentChoose,
        dateChoose,
        timeChoose,
      };
    }
  },
  watch: {
    changeData: function (val) {
      if (val.experimentChoose !== '' && val.dateChoose !== '' && val.timeChoose !== '') {
        getSiteSelected(this.experimentChoose, this.dateChoose, this.timeChoose).then(
          res => {
            console.log("return sites:", res)

            if (res.status === 2) {
              this.siteSelected = new Array(0)
              return
            }

            this.siteSelected = res.data
          }
        )
      }
    }
  }
}
</script>

<style scoped>
.reserve-body {
  display: flex;
  flex-direction: column;
  /*border: 1px solid red;*/
  padding-left: 20px;
  padding-top: 20px;
}

.input-style {
  max-width: 20vw;
  min-width: 20vw;
  margin-bottom: 20px;
}

.place {
  width: 480px;
  margin-bottom: 20px;
}

.one-chosen {
  width: 50px;
  margin-bottom: 10px;
}

.submit-btn {
  display: flex;
  width: 70px;
}

.before-score {
  margin-bottom: 20px;
}

.processes {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

.one-part {
  min-width: 40%;
}

>>> .el-tabs--border-card {
  box-shadow: 0 0 0 0;
}
</style>
