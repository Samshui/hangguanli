<template>
  <div id="app">
    <Header v-if="this.$store.state.user !== null"></Header>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "@/components/Header";
export default {
  name: 'App',
  components: {Header},
  created() {
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(
        Object.assign({},
          this.$store.state,
          JSON.parse(sessionStorage.getItem("store"))
        )
      );
    }
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener(
      "beforeunload",
      () => {
        sessionStorage.setItem("store", JSON.stringify(this.$store.state));
      });

    if (this.$store.state.user === null) {
      this.$router.push("/")
    }
  }
}
</script>

<style>
#app {
  height: 100vh;
  width: 100vw;
  margin: 0 auto;
  font-family: "Fira Code", "PingFang SC";
}

body {
  margin: 0;
}
</style>
