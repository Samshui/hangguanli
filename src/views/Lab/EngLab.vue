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
  name: "EngLab",
  data() {
    return {
      filterText: '',
      data: [
        {
          label: '热学系列实验',
          children: [
            {
              label: '1021',
              children: [
                {
                  label: '1020113 测量冰的溶解热实验'
                },
                {
                  label: '1020212 电热法测量焦耳热功当量实验'
                }
              ]
            },
            {
              label: '1022',
              children: [
                {
                  label: '1020314 稳态法测量不良导体的热导率实验'
                }
              ]
            }
          ]
        },
        {
          label: '薄透镜和单球面镜焦距的测量',
          children: [
            {
              label: '1061',
              children: [
                {
                  label: '1060111 物距像距法测量凸透镜焦距'
                },
                {
                  label: '1060213 自准直法测量透镜焦距'
                },
                {
                  label: '1060312 共轭法测量凸透镜的焦距'
                },
                {
                  label: '1060412 单球面镜焦距的测量'
                }
              ]
            },
            {
              label: '1062',
              children: [
                {
                  label: '1060513 平行光管法测量凸透镜焦距'
                },
                {
                  label: '1060524 平行光管法测量凹透镜焦距'
                }
              ]
            },
          ]
        },
        {
          label: '分光仪的调整及其应用',
          children: [
            {
              label: '1071',
              children: [
                {
                  label: '1070113 分光仪的调整'
                },
                {
                  label: '1070212 测量三棱镜的顶角'
                },
                {
                  label: '1070312 最小偏向角法测量棱镜的折射率'
                },
                {
                  label: '1070322 掠入射法测量棱镜的折射率'
                },
                {
                  label: '1070412 平板玻璃折射率的测量'
                }
              ]
            }
          ]
        },
        {
          label: '光的干涉实验 I（分波阵面法）',
          children: [
            {
              label: '1081',
              children: [
                {
                  label: '1080114 激光双棱镜干涉'
                },
                {
                  label: '1080124 激光劳埃镜干涉'
                }
              ]
            },
            {
              label: '1082',
              children: [
                {
                  label: '1080215 钠光双棱镜干涉'
                },
                {
                  label: '1080225 钠光劳埃镜干涉'
                }
              ]
            }
          ]
        },
        {
          label: '光的干涉实验 II（分振幅法）',
          children: [
            {
              label: '1091',
              children: [
                {
                  label: '1090114 迈克尔逊干涉'
                },
                {
                  label: '1090212 牛顿环干涉'
                },
                {
                  label: '1090312 劈尖干涉'
                }
              ]
            },
          ]
        },
        {
          label: '玻尔共振实验',
          children: [
            {
              label: '1101',
              children: [
                {
                  label: '1100114 玻尔共振仪测幅频和相频特性（中/英）'
                }
              ]
            }
          ]
        },
        {
          label: '绪论实验',
          children: [
            {
              label: '1111',
              children: [
                {
                  label: '1110115 绪论实验'
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


