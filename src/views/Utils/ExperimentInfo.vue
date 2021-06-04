<template>
  <div class="inner-draw">
    <div v-for="(dbimg, index) in DBs">
      <img :src="dbimg.url" class="box-img">
    </div>
  </div>
</template>

<script>
export default {
  name: "ExperimentInfo",
  components: {
  },
  props: {
    EID: String
  },
  data() {
    return {
      DBs: [
        {url: require("../../assets/img/db1.png")},
        {url: require('../../assets/img/db2.png')},
        {url: require('../../assets/img/db3.png')},
        {url: require('../../assets/img/db4.png')},
        {url: require('../../assets/img/db5.png')},
      ]
    }
  },
  created() {

  }
}
</script>

<style scoped>
.box-img {
  width: 90%;
  margin-left: 10px;
}

.inner-draw {
  height: 85vh;
  overflow: auto;
}
</style>
