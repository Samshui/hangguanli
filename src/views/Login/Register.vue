<template>
  <div>
    <div class="welcome-page">
      <div class="welcome-page-front">欢迎注册航管理平台</div>
      <div class="welcome-page-back">/* Register */</div>
      <Lis></Lis>

      <div class="register">
        <div class="title">注册</div>
        <el-row>
          <el-col :span="8">
            <el-input v-model="studentID" placeholder="请输入学号">
              <template slot="prepend">学 号</template>
            </el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-input v-model="name" placeholder="请输入姓名">
              <template slot="prepend">姓 名</template>
            </el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-input v-model="telephone" placeholder="请输入手机号">
              <template slot="prepend">手机号</template>
            </el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-input v-model="password" placeholder="请输入密码" show-password>
              <template slot="prepend">密 码</template>
            </el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-input v-model="passwordAgain" placeholder="请再次输入密码" show-password>
              <template slot="prepend">确认密码</template>
            </el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-button class="register-button" type="primary" @click="Register">注册</el-button>
          </el-col>
        </el-row>
      </div>
      <div @click="goLogin" class="go-login">已经有账户了？点击登录</div>
    </div>
  </div>
</template>

<script>
import Lis from "@/views/Utils/Lis";
import {telephoneIsExisted, register, getInfo} from "@/network/login";

export default {
  name: "Register",
  components: {
    Lis,
  },
  data() {
    return {
      studentID: '',
      telephone: '',
      name: '',
      password: '',
      passwordAgain: ''
    }
  },
  methods: {
    goLogin() {
      this.$router.push("/")
    },
    Register() {
      // 检查各参数是否合法
      if (this.studentID.length !== 8) {
        this.$notify.warning({
          title: "提示",
          message: "学号位数应为8位",
        });
        return;
      }

      if (this.name.length === 0) {
        this.$notify.warning({
          title: "提示",
          message: "姓名不可为空",
        });
        return;
      }

      if (this.telephone.length !== 11) {
        this.$notify.warning({
          title: "提示",
          message: "手机号位数应为11位",
        });
        return;
      }

      //密码强度正则，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
      let pPattern = /^.*(?=.{6,})(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/;
      if (!pPattern.test(this.password)) {
        this.$notify.warning({
          title: "提示",
          message: "密码强度不足，请确保您的密码最少6位，混和使用数字与字母",
        });
        return;
      } else if(this.password !== this.passwordAgain) {
        this.$notify.warning({
          title: "提示",
          message: "两次密码不一致",
        });
        return;
      }

      register(this.name, this.studentID, this.telephone, this.password).then(
        res => {
          console.log(res)
          if (res.status === 1) {
            this.$notify.warning({
              title: "提示",
              message: "当前学号已被使用",
            });
            return
          } else if (res.status === 2) {
            this.$notify.warning({
              title: "提示",
              message: "当前联系方式已被使用",
            });
            return
          }

          this.$notify.success({
            title: "成功",
            message: "注册成功",
          });

          this.$store.commit("login", res.data)
          this.$router.push("/main")
        }
      )

      // 检查手机号是否被使用
      // telephoneIsExisted(this.telephone).then(
      //   res => {
      //     if (res.data.data === -4) {
      //       this.$notify.info({
      //         title: "提示",
      //         message: "手机号已被使用",
      //       });
      //     } else {
      //       register(this.name, this.studentID, this.telephone, this.password).then(
      //         res => {
      //           console.log("register", res)
      //           if (res.data.data === 1) {
      //             this.$notify.success({
      //               title: "成功",
      //               message: "注册成功",
      //             });
      //
      //             let newUser = res.data.user
      //             this.$store.commit("login", newUser)
      //             this.$router.push("/main")
      //           } else {
      //             this.$notify.success({
      //               title: "失败",
      //               message: "注册失败",
      //             });
      //           }
      //         }
      //       ).catch(
      //         err => {
      //           console.log("register", err)
      //         }
      //       )
      //     }
      //   }
      // ).catch(err => {
      //   console.log(err)
      // })
    }
  }
}
</script>

<style scoped>
.welcome-page {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100vw;
  /*background-image: linear-gradient(30deg, #cefaec, #fac8f5);*/

  position: relative;
  overflow: hidden;
}

.welcome-page-front {
  margin-top: 6vh;
  font-family: "PingFang SC";
  font-size: 5rem;
}

.welcome-page-back {
  font-family: "Fira Code Retina";
  font-size: 3rem;
  color: #4f89ef;
  margin-bottom: 5vh;
}

.title {
  font-size: 2rem;
  margin-left: 15%;
  margin-bottom: 50px;
}

.register {
  display: flex;
  flex-direction: column;
  margin-left: 65%;
  margin-bottom: 10px;
  width: 100vw;
  /*height: 100vh;*/
}

div.el-row {
  opacity: 0.9;
  margin-bottom: 20px;
}

.register-button {
  width: 100%;
  opacity: 0.7;
  font-family: "PingFang SC"
}

.go-login {
  color: cornflowerblue;
  cursor: pointer;
  border-bottom: 1px solid cornflowerblue;
}

>>> .el-input-group__prepend {
  min-width: 55px;
  color: #000000;
}
</style>
