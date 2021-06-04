<template>
  <div class="profile-body">
    <Lis color="#dbe8db" font-color="#9cbf9c"></Lis>
    <img src="../../assets/img/user.png" class="userImg">
    <el-divider></el-divider>
    <div class="profile-detail">
      <el-card class="box-card" shadow="never">
        <div slot="header" >
          <span>个人信息</span>
        </div>
        <div class="text item">学号：{{ this.user.userID }}</div>
        <div class="text item">姓名：{{ this.user.userName }}</div>
        <el-divider></el-divider>
        <div class="text item">年龄：{{ this.user.age }}</div>
        <div class="text item">联系方式：{{ this.user.phoneNumber }}</div>
        <div class="text item">邮箱：{{ this.user.emailAddress }}</div>
      </el-card>
    </div>
  </div>
</template>

<script>
import Lis from "@/views/Utils/Lis";
export default {
  name: "Profile",
  components: {Lis},
  data() {
    return {
      user: null
    }
  },
  created() {
    console.log(this.$store.state.user)
    this.user = this.$store.state.user
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
  border: 1px solid #dbe8db;
}

>>>.el-card__header {
  text-align: center;
  font-size: 20px;
  color: #334b70;
  background: #dbe8db;
}

>>> .el-divider--horizontal {
  background: #dbe8db;
}
</style>
