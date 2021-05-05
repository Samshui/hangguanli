<template>
  <div class="reserve-body">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="预约实验" name="first">
        <div class="reserve-body">
          <el-select v-model="experimentChoose" class="input-style" filterable placeholder="选择实验 | 可输入关键词查找">
            <el-option-group
              v-for="group in options"
              :key="group.label"
              :label="group.label">
              <el-option
                v-for="item in group.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-option-group>
          </el-select >
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
          <el-radio-group v-model="timeChoose" size="small" style="margin-bottom: 30px">
            <el-radio-button label="上午(8:50-11:50)"></el-radio-button>
            <el-radio-button label="下午(14:30-17:30)"></el-radio-button>
            <el-radio-button label="晚上(18:30-21:30)"></el-radio-button>
          </el-radio-group>
          <el-card class="place" shadow="never">
            <div slot="header" class="clearfix">
              <span>实验座位选择</span>
            </div>
            <el-radio v-for="o in this.siteSize"
                      :key="o"
                      class="one-chosen"
                      v-model="radio"
                      :label="o"
                      :disabled="o % 3 === 0">{{ '位置' + o }}</el-radio>
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
              :data="reserveData.filter(data => !search || data.labName.toLowerCase().includes(search.toLowerCase()))"
              style="width: 100%">
              <el-table-column type="index"></el-table-column>
              <el-table-column label="预约日期" prop="date"></el-table-column>
              <el-table-column label="实验名称" prop="labName"></el-table-column>
              <el-table-column label="实验时间" prop="time"></el-table-column>
              <el-table-column label="实验室" prop="roomID"></el-table-column>
              <el-table-column label="位置" prop="seatID"></el-table-column>
              <el-table-column align="right">
                <template slot="header" slot-scope="scope">
                  <el-input v-model="search" size="mini" placeholder="输入名称关键字搜索"/>
                </template>
                <template slot-scope="scope">
                  <el-button
                    disabled
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">修改预约</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">取消预约</el-button>
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
export default {
  name: "ReserveLab",
  data() {
    return {
      activeName: 'first',
      options: [
        {
          label: '电学实验',
          options: [
            {
              value: '1040114',
              label: '1040114 伏安法测中电阻'
            },
            {
              value: '1040211',
              label: '1040211 半偏法测检流计内阻与电流常数'
            },
            {
              value: '1040312',
              label: '1040312 伏安法测高（低）电阻'
            },
            {
              value: '1040412',
              label: '1040412 惠通斯电桥测中电阻'
            },
            {
              value: '1040514',
              label: '1040514 双电桥测低电阻'
            },
            {
              value: '1040522',
              label: '1040522 双电桥改单电桥测中电阻'
            },
            {
              value: '1050113',
              label: '1050113 自组电位差计测干电池电动势'
            },
            {
              value: '1050211',
              label: '1050211 箱式电位差记测干电池电动势'
            },
            {
              value: '1050222',
              label: '1050222 箱式电位差记测固定电阻'
            },
            {
              value: '1050232',
              label: '1050232 箱式电位差记测电表内阻'
            }
          ]
        },
        {
          label: '力学实验',
          options: [
            {
              value: '1010113',
              label: '1010113 拉伸法测钢丝弹性模量',
            },
            {
              value: '1010212',
              label: '1010212 扭摆法测量转动惯量',
            },
            {
              value: '1010313',
              label: '1010313 弯曲法测横梁弹性模量（霍尔传感器法）'
            },
            {
              value: '1010323',
              label: '1010323 弯曲法测横粱弹性模量（弯曲仪法）'
            }
          ]
        },
        {
          label: '光学实验',
          options: [
            {
              value: '1060111',
              label: '1060111 物距像距法测量凸透镜焦距'
            },
            {
              value: '1060213',
              label: '1060213 自准直法测量透镜焦距'
            },
            {
              value: '1060312',
              label: '1060312 共轭法测量凸透镜的焦距'
            },
            {
              value: '1060412',
              label: '1060412 单球面镜焦距的测量'
            },
            {
              value: '1060513',
              label: '1060513 平行光管法测量凸透镜焦距'
            },
            {
              value: '1060524',
              label: '1060524 平行光管法测量凹透镜焦距'
            },
            {
              value: '1070113',
              label: '1070113 分光仪的调整'
            },
            {
              value: '1070212',
              label: '1070212 测量三棱镜的顶角'
            },
            {
              value: '1070312',
              label: '1070312 最小偏向角法测量棱镜的折射率'
            },
            {
              value: '1070322',
              label: '1070322 掠入射法测量棱镜的折射率'
            },
            {
              value: '1070412',
              label: '1070412 平板玻璃折射率的测量'
            },
            {
              value: '1080114',
              label: '1080114 激光双棱镜干涉'
            },
            {
              value: '1080124',
              label: '1080124 激光劳埃镜干涉'
            },
            {
              value: '1080215',
              label: '1080215 钠光双棱镜干涉'
            },
            {
              value: '1080225',
              label: '1080225 钠光劳埃镜干涉'
            },
            {
              value: '1090114',
              label: '1090114 迈克尔逊干涉'
            },
            {
              value: '1090212',
              label: '1090212 牛顿环干涉'
            },
            {
              value: '1090312',
              label: '1090312 劈尖干涉'
            },
            {
              value: '1100114',
              label: '1100114 玻尔共振仪测幅频和相频特性（中/英）'
            }
          ]
        },
        {
          label: '热学实验',
          options: [
            {
              value: '1020113',
              label: '1020113 测量冰的溶解热实验'
            },
            {
              value: '1020212',
              label: '1020212 电热法测量焦耳热功当量实验'
            },
            {
              value: '1020314',
              label: '1020314 稳态法测量不良导体的热导率实验'
            }
          ]
        },
        {
          label: '绪论实验',
          options: [
            {
              value: '1110115',
              label: '1110115 绪论实验'
            }
          ]
        }
      ],
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
      radio: '0',
      reserveData: [
        {
          labName: '1040211 半偏法测检流计内阻与电流常数',
          labID: '1040211',
          date: '2021-04-01',
          time: '8:50-11:50',
          roomID: '101',
          seatID: '13'
        },
        {
          labName: '1040211 半偏法测检流计内阻与电流常数',
          labID: '1040211',
          date: '2021-04-01',
          time: '8:50-11:50',
          roomID: '101',
          seatID: '13'
        },
        {
          labName: '1040211 半偏法测检流计内阻与电流常数',
          labID: '1040211',
          date: '2021-04-01',
          time: '8:50-11:50',
          roomID: '101',
          seatID: '13'
        },
      ],
      completeData: [
        {
          labName: '1040211 半偏法测检流计内阻与电流常数',
          labID: '1040211',
          date: '2021-04-01',
          time: '8:50-11:50',
          roomID: '101',
          seatID: '13',
          score: 20
        },
        {
          labName: '1040211 半偏法测检流计内阻与电流常数',
          labID: '1040211',
          date: '2021-04-01',
          time: '8:50-11:50',
          roomID: '101',
          seatID: '13',
          score: 20
        },
        {
          labName: '1040211 半偏法测检流计内阻与电流常数',
          labID: '1040211',
          date: '2021-04-01',
          time: '8:50-11:50',
          roomID: '101',
          seatID: '13',
          score: 20
        },
      ],
      search: '',
      labPercent: [100, 100, 60, 10],
      siteSize: 30,
      siteStatus: null
    }
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    handleEdit(index, row) {
      // console.log(index, row);
    },
    handleDelete(index, row) {
      // console.log(index, row);
      this.$confirm('确认取消预约？')
        .then(res => {
          this.reserveData.splice(index, 1)
          this.$notify({
            type: 'success',
            message: '预约已取消'
          })
        })
        .catch(err => {});
    },
    reserveSubmit() {
      console.log("date:",this.dateChoose)
      console.log("exp:", this.experimentChoose)
    }
  },
  created() {

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
</style>
