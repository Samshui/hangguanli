<template>
  <div>
    <div class="lab-detail">
      <div class="left-bar">
        <div class="label-header">/ 实验内容 /</div>
        <div class="lab-detail-left">
          <el-input v-model="filterText" placeholder="输入关键字进行过滤" class="filter"></el-input>
          <el-tree ref="tree"
                   :data="experimentsEle"
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
          <img src="../../assets/img/empty.jpg" class="noStyle">

          <div class="upload">
            <el-upload
              class="upload-demo" drag :action="url">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传word文件</div>
            </el-upload>
          </div>
        </div>
      </div>
    </div>

    <el-drawer
      :title="chosenLabName"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose" size="60%">
      <div class="labInstruction">
<!--        <img src="../../assets/img/empty.jpg" v-if="!exist" class="noStyle">-->
        <ExperimentInfo :EID="chosenLabID"></ExperimentInfo>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import {getExperimentByLabel} from "@/network/experiment";
import ExperimentInfo from "@/views/Utils/ExperimentInfo";

export default {
  name: "EleLab",
  components: {ExperimentInfo},
  data() {
    return {
      filterText: '',
      defaultProps: {
        label: 'ename',
        labelID: 'eid'
      },
      drawer: false,
      direction: 'rtl',
      chosenLabID: '',
      chosenLabName: '',
      exist: false,
      experimentsEle: null,
      url: ''
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
      return data.Name.indexOf(value) !== -1;
    },
    clickNode(data, node, obj) {
      this.chosenLabID = data.eid
      this.chosenLabName = data.ename
      this.drawer = true
    },
    handleClose(done) {
      // this.$confirm('确认关闭？')
      //   .then(res => { done(); })
      //   .catch(err => {});
      done();
    }
  },
  created() {
    getExperimentByLabel(0).then(
      res => {
        if (res.status === -1) {
            this.$notify.error({
              title: "error",
              message: "未获取到相关实验，请检查网络情况"
            })
          return
        }

        if (res.status === 1) {
            this.$notify.info({
              title: "info",
              message: "该栏目当前无相关实验"
            })
          return
        }

        this.experimentsEle = res.data
      }
    )
  }
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

.upload {
  display: flex;
  justify-content: space-around;
}
</style>
