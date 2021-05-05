<template>
  <div>
    <div class="lab-detail">
      <div class="left-bar">
        <div class="label-header">/ 实验内容 /</div>
        <div class="lab-detail-left">
          <el-input v-model="filterText" placeholder="输入关键字进行过滤" class="filter"></el-input>
          <el-tree
            ref="tree"
            :data="data"
            :filter-node-method="filterNode"
            :props="defaultProps"
            @node-click="clickNode"
            class="filter-tree"
            default-expand-all>
          </el-tree>
        </div>
      </div>
      <div class="right-bar">
        <div class="label-header">/ 参考报告 /</div>
        <div class="lab-detail-right">
          <img src="../../assets/img/no-img.png" class="noStyle">
        </div>
      </div>
    </div>

    <el-drawer
      :title="chosenLabName"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose" size="60%">
      <div class="labInstruction">
        <img src="../../assets/img/no-img.png" v-if="!exist" class="noStyle">
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: "EleLab",
  data() {
    return {
      filterText: '',
      data: [
        {
          label: '电阻的测量',
          children: [
            {
              label: '1041',
              children: [
                {
                  label: '1040114 伏安法测中电阻'
                },
                {
                  label: '1040211 半偏法测检流计内阻与电流常数'
                },
                {
                  label: '1040312 伏安法测高（低）电阻'
                },
                {
                  label: '1040412 惠通斯电桥测中电阻'
                }
              ]
            },
            {
              label: '1042',
              children: [
                {
                  label: '1040514 双电桥测低电阻'
                },
                {
                  label: '1040522 双电桥改单电桥测中电阻'
                }
              ]
            }
          ]
        },
        {
          label: '电位差计及其使用',
          children: [
            {
              label: '1051',
              children: [
                {
                  label: '1050113 自组电位差计测干电池电动势'
                },
                {
                  label: '1050211 箱式电位差记测干电池电动势'
                },
                {
                  label: '1050222 箱式电位差记测固定电阻'
                },
                {
                  label: '1050232 箱式电位差记测电表内阻'
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label',
        labelID: 'labelID'
      },
      drawer: false,
      direction: 'rtl',
      chosenLabID: '',
      chosenLabName: '',
      exist: false,
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    clickNode(data, node, obj) {
      if (node.isLeaf) {
        this.drawer = true
        this.chosenLabID = node.id
        this.chosenLabName = node.label
      }
    },
    handleClose(done) {
      // this.$confirm('确认关闭？')
      //   .then(res => { done(); })
      //   .catch(err => {});
      done();
    }
  },
}
</script>

<style scoped>
.lab-detail {
  display: flex;
  flex-direction: row;
  margin-top: 5vh;
  min-height: 50vh;
  max-height: 50vh;
}

.left-bar {
  width: 50%;
  min-height: 50vh;
  max-height: 50vh;
}

.right-bar {
  width: 50%;
  min-height: 50vh;
  max-height: 50vh;
}

.mid-line {
  min-height: 50vh;
  max-height: 50vh;
  min-width: 1px;
  max-width: 1px;
  background-color: #dddddd;
}

.label-header {
  border-radius: 5px;
  width: fit-content;
  padding: 5px;
  font-size: 20px;
  font-family: "PingFang SC";
  background: #4f8ff1;
  color: #ffffff;
  letter-spacing: 5px;
  display: flex;
  margin: 0 auto;
}

.lab-detail-left {
  min-height: 30vh;
  padding-right: 8vw;
  padding-left: 8vw;
  padding-top: 2vh;
}

.lab-detail-right {
  min-height: 30vh;
  padding-right: 8vw;
  padding-left: 8vw;
  padding-top: 2vh;
  font-size: 14px;
}

.labInstruction {
  /*border: 1px solid red;*/
  padding: 10px;
}

.filter {
  margin-bottom: 20px;
}

.noStyle {
  width: 40%;
  display: flex;
  margin: 0 auto;
}
</style>
