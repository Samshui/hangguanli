<template>
  <div>
    <div class="welcome-page">
      <div class="welcome-page-front">欢迎使用航管理平台</div>
      <div class="welcome-page-back">/* welcome to HangGuanLi Lab */</div>
      <Lis></Lis>
      <div v-if="userLogin">
        <div class="logined" @click="$router.push('/main')"># 您已登录，进入主页 =></div>
      </div>
      <div v-else>
        <Login></Login>
      </div>
    </div>
  </div>
</template>

<script>
import Lis from "@/views/Utils/Lis";
import Login from "@/views/Login/Login";
export default {
  name: "HelloLab",
  components: {
    Lis,
    Login
  },
  data() {
    return {
      userLogin: false,
      user: null
    }
  },
  methods: {},
  watch: {
    '$store.state.user': function () {
      if (this.$store.state.user === null) {
        this.userLogin = false
        this.user = null
      }
    }
  },
  created() {
    // if (sessionStorage.getItem("user") !== null && this.$store.state.user !== null) {
    //   this.$router.push('/main')
    // }
    this.user = this.$store.state.user
    this.userLogin = (this.$store.state.user !== null);
  }
}
</script>

<style scoped>
.welcome-page {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 90vh;
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

.logined {
  margin-top: 20%;
  font-size: 3rem;
  cursor: pointer;
  transition: 0.5s;
}

.logined:hover {
  color: #4f89ef;
  transition: 0.5s;
}
</style>
