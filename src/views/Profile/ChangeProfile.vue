<template>
  <div class="profile-body">
    <Lis color="#ffdec4" font-color="#eebc98"></Lis>
    <img src="../../assets/img/edit.png" class="userImg">
    <el-divider></el-divider>
    <div class="profile-detail">
      <el-card class="box-card" shadow="never">
        <div slot="header" style="text-align: center;font-size: 20px;color: #334b70">
          <span>个人信息</span>
        </div>
        <div class="text item">学号：{{ this.user.userID }}</div>
        <div class="text item">姓名：{{ this.user.userName }}</div>
        <el-divider></el-divider>
        <div class="text item">年龄：{{ this.user.age }}</div>
        <div class="text item">联系方式：{{ this.user.phoneNumber }}</div>
        <div class="text item">邮箱：{{ this.user.emailAddress }}</div>
        <el-divider></el-divider>
        <el-input v-model="newTelephone">
          <template slot="prepend">联系方式</template>
        </el-input>
        <div style="min-height: 20px"></div>
      </el-card>
    </div>
    <div style="min-height: 20px"></div>
    <el-button class="submit-btn" type="primary" plain @click="ChangeTelephone">确认修改</el-button>
  </div>
</template>

<script>
import {changeTelephone} from "@/network/profile";
import Lis from "@/views/Utils/Lis";
import {getInfo, telephoneIsExisted} from "@/network/login";

export default {
  name: "ChangeProfile",
  components: {Lis},
  data() {
    return {
      user: null,
      newTelephone: null
    }
  },
  methods: {
    ChangeTelephone() {
      if (this.newTelephone === this.user.phoneNumber) {
        this.$notify.info({
          title: "提示",
          message: "新的联系方式应该与先前的不同"
        })
        return
      } else {
        telephoneIsExisted(this.newTelephone).then(
          res => {
            console.log(res)
            if (res.status === 0) {
              this.$notify.warning({
                title: "提示",
                message: "新的联系方式已被使用"
              })
            } else {
              changeTelephone(this.newTelephone, this.user.phoneNumber).then(
                resChange => {
                  console.log("change", resChange)

                  if (resChange.status === 0) {
                    this.$notify.success({
                      title: "提示",
                      message: "新的联系方式已成功修改"
                    })

                    getInfo(this.user.userID).then(
                      resInfo => {
                        this.user = resInfo.data
                        this.$store.commit("login", this.user)
                      }
                    )
                  } else {
                    this.$notify.warning({
                      title: "提示",
                      message: "新的联系方式修改失败"
                    })
                  }
                })
            }
          }
        )
      }

      // changeTelephone(this.newTelephone, this.user.phoneNumber).then(
      //   res => {
      //     console.log("res", res)
      //     if (res.data === -3) {
      //       this.$notify.warning({
      //         title: "提示",
      //         message: "新的联系方式已被使用"
      //       })
      //     } else {
      //       // 新的联系方式修改成功
      //       this.$notify.success({
      //         title: "提示",
      //         message: "新的联系方式修改成功"
      //       })
      //
      //       this.user.telephone = this.newTelephone
      //
      //       // 修改session
      //       this.$store.commit("login", this.user)
      //     }
      //   }
      // ).catch(
      //   err => {
      //     //
      //   }
      // )
    }
  },
  created() {
    this.user = this.$store.state.user
    this.newTelephone = this.user.phoneNumber
  }
}
</script>

<style scoped>
.profile-body {
  display: flex;
  margin: 0 auto;
  width: fit-content;
  height: fit-content;
  flex-direction: column;
  padding-top: 50px;
}

.userImg {
  width: 50px;
  height: fit-content;
  display: flex;
  margin: 0 auto;
}

.profile-detail {
  display: flex;
  margin: 0 auto;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 10px;
}

.box-card {
  margin-top: 10px;
  width: 480px;
  border: 1px solid #ffdec4;
}

.font-style {
  font-family: "Fira Code", "PingFang SC";
}

.submit-btn {
  min-width: 100px;
  display: flex;
  margin: 0 auto;
}

>>>.el-card__header {
  text-align: center;
  font-size: 20px;
  color: #334b70;
  background: #ffdec4;
}

>>> .el-input__inner {
  font-family: "Fira Code";
}

>>> .el-divider--horizontal {
  background: #ffdec4;
}
</style>
