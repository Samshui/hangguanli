<template>
  <div class="login-box">
    <div class="title">登录</div>
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
        <el-button class="login-button" type="primary" @click="Login">登录</el-button>
      </el-col>
    </el-row>
    <div class="go-register" @click="goRegister">还没有认证/账号？点击注册</div>
    <div class="foot">@copyright -> /BUAA/SE/1821/Samshui</div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import {getInfo, login} from "@/network/login";

export default {
  name: "Login",
  data() {
    return {
      telephone: '',
      password: ''
    }
  },
  methods: {
    Login() {
      if (this.telephone.length !== 11) {
        this.$notify.warning({
          position: "top-right",
          title: "位数错误",
          message: "手机号位数应为11位",
        });

        return;
      }

      if (this.password.length < 6) {
        this.$notify.warning({
          position: "top-right",
          title: "位数错误",
          message: "密码过短/不可为空",
        });

        return;
      }

      login(this.telephone, this.password).then(
        res => {
          console.log("login-res:", res)
          if (res.data.data === -1) {
            this.$notify.error({
              title: "登录失败",
              message: "用户账号不存在"
            })
          } else if (res.data.data === -2) {
            this.$notify.error({
              title: "登录失败",
              message: "密码输入错误"
            })
          } else {
            this.$notify.success({
              title: "登录成功",
              message: "登录成功"
            })
            // 设置token
            this.$store.commit("setToken", res.data.token)
            // 获取用户信息
            getInfo(this.$store.state.token).then(
              resInfo => {
                console.log("info", resInfo)
                this.$store.commit("login", resInfo.data.user)

                // 跳转
                this.$router.push("/main")
              }
            ).catch(
              err => {
                this.$router.push("/")
              }
            )

            console.log("欢迎进入航管理平台\n\n"   +
              ",--.  ,--. ,----.   ,--.    \n" +
              "|  '--'  |'  .-./   |  |    \n" +
              "|  .--.  ||  | .---.|  |    \n" +
              "|  |  |  |'  '--'  ||  '--. \n" +
              "`--'  `--' `------' `-----' \n" +
              "                            \n" +
              "███████╗ █████╗ ███╗   ███╗███████╗██╗  ██╗██╗   ██╗██╗\n" +
              "██╔════╝██╔══██╗████╗ ████║██╔════╝██║  ██║██║   ██║██║\n" +
              "███████╗███████║██╔████╔██║███████╗███████║██║   ██║██║\n" +
              "╚════██║██╔══██║██║╚██╔╝██║╚════██║██╔══██║██║   ██║██║\n" +
              "███████║██║  ██║██║ ╚═╝ ██║███████║██║  ██║╚██████╔╝██║\n" +
              "╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═╝")
          }
        }
      ).catch(
        err => {
          this.$notify.error({
            title: "登录失败",
            message: "请检查网络情况"
          })
        }
      )
    },
    goRegister() {
      this.$router.push("/register")
    }
  },
  components: {Header},
}
</script>

<style scoped>
.border {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 50%;
}

.input {
  width: 200px;
  margin-bottom: 20px;
}

.login-box {
  display: flex;
  flex-direction: column;
  margin-left: 33.5%;
  margin-bottom: 10px;
  width: 100vw;
  height: 100vh;
}

.el-row {
  margin-bottom: 20px;
}

.title {
  font-size: 2rem;
  margin-left: 15%;
  margin-bottom: 50px;
}

.foot {
  color: #4f8ff1;
}

.login-button {
  width: 100%;
  opacity: 0.7;
  font-family: "PingFang SC"
}

.go-register {
  color: brown;
  cursor: pointer;
  margin-bottom: 10px;
  border-bottom: 1px solid brown;
  width: fit-content;
}

>>> .el-input-group__prepend {
  min-width: 55px;
  color: #000000;
}
</style>
