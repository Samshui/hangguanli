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
  name: "ForceLab",
  data() {
    return {
      filterText: '',
      data: [
        {
          label: '力学系列实验',
          children: [
            {
              label: '1011',
              children: [
                {
                  label: '1010113 拉伸法测钢丝弹性模量'
                },
                {
                  label: '1010212 扭摆法测量转动惯量'
                },
              ]
            },
            {
              label: '1012',
              children: [
                {
                  label: '1010313 弯曲法测横梁弹性模量（霍尔传感器法）'
                },
                {
                  label: '1010323 弯曲法测横粱弹性模量（弯曲仪法）'
                },
              ]
            }
          ]
        },
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
