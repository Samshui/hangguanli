<template>
  <div>
    <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
      <el-menu-item index="0">
        <div class="header-head">
          <img src="../assets/img/logo.png" class="logo">
        </div>
      </el-menu-item>
      <el-menu-item index="1">快速索引</el-menu-item>

      <el-menu-item index="2">校内校外</el-menu-item>

      <el-submenu index="3">
        <template slot="title">实验</template>
        <el-menu-item index="3-1">数据库实验</el-menu-item>
        <el-menu-item index="3-2">后端开发实验</el-menu-item>
        <el-menu-item index="3-3">前端开发实验</el-menu-item>
        <el-menu-item index="3-4">实验说明</el-menu-item>
      </el-submenu>

      <el-submenu index="4">
        <template slot="title">预约</template>
        <el-menu-item index="4-1">预约实验</el-menu-item>
        <el-menu-item index="4-2" disabled>交换实验</el-menu-item>
      </el-submenu>

      <el-submenu index="5" v-if="userStatus === 1">
        <template slot="title">管理</template>
        <el-menu-item index="5-1">管理实验</el-menu-item>
        <el-menu-item index="5-2">查看实验信息</el-menu-item>
      </el-submenu>

      <el-submenu index="6">
        <template slot="title">个人信息</template>
        <el-menu-item index="6-1">查看个人信息</el-menu-item>
        <el-menu-item index="6-2">修改个人信息</el-menu-item>
      </el-submenu>

      <el-menu-item index="7">退出</el-menu-item>

      <el-menu-item class="name" disabled>
        <div class="annotation">
          <el-tag effect="plain" v-if="this.userStatus === 1">管理员</el-tag>
          <el-tag effect="plain" v-else-if="this.userStatus === 0" type="success">学生</el-tag>
          <el-tag effect="plain" v-else-if="this.userStatus === 2" type="warning">教师</el-tag>
          /*{{ this.user.userID }} {{ this.user.userName }} */
        </div>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      user: null,
      activeIndex: '1',
      indexMap: [
        {
          id: '1',
          url: '/main',
        },
        {
          id: '2',
          url: '/news'
        },
        {
          id: '3-1',
          url: '/lab/election'
        },
        {
          id: '3-2',
          url: '/lab/force'
        },
        {
          id: '3-3',
          url: '/lab/energy'
        },
        {
          id: '3-4',
          url: '/lab/introduction'
        },
        {
          id: '4-1',
          url: '/lab/reserve'
        },
        {
          id: '5-1',
          url: '/manage'
        },
        {
          id: '5-2',
          url: '/records'
        },
        {
          id: '6-1',
          url: '/profile/info'
        },
        {
          id: '6-2',
          url: '/profile/change'
        },
        {
          id: '7',
          url: '/'
        },
      ],
      userStatus: 0
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      this.activeIndex = key
      this.pushPath(key)
      // console.log("key:" + key, "path:" + keyPath);
    },
    pushPath(key) {
      let url = ''

      if (key === '7') {
        this.logout()
        this.$router.push("/")
        return
      }

      for (let i = 0; i < this.indexMap.length; i++) {
        if (this.indexMap[i].id === key) {
          url = this.indexMap[i].url
        }
      }

      this.$router.push(url)
    },
    logout() {
      this.$confirm('将退出平台, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.$store.commit("logout")
      }).catch(err => {
        console.log("log out err", err)
      })
    }
  },
  created() {
    this.user = this.$store.state.user
    this.userStatus = this.$store.state.user.userStatue
  }
}
</script>

<style scoped>
.header-head {
  min-width: 100px;
  min-height: 100%;
}

.logo {
  width: 80px;
}

.name {
  position: absolute;
  right: 0;
}

.annotation {
  color: #4f8ff1;
}

>>> .el-menu-item.is-disabled {
  opacity: 1;
}
</style>
