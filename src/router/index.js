import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

// 默认入口
const HelloLab = () => import("../views/HelloLab")

// 主页
const Main = () => import("../views/Main/Main")

// 登录
const Login = () => import("../views/Login/Login")

// 注册
const Register = () => import("../views/Login/Register")

// 实验专栏
const EleLab = () => import("../views/Lab/EleLab")
const ForceLab = () => import("../views/Lab/ForceLab")
const EngLab = () => import("../views/Lab/EngLab")
const Intro = () => import("../views/Lab/Introduction")
const Reserve = () => import("../views/Lab/ReserveLab")
const Switch = () => import("../views/Lab/SwitchLab")
const News = () => import("../views/Main/News")
const Profile = () => import("../views/Profile/Profile")
const ChangeProfile = () => import("../views/Profile/ChangeProfile")
const Manage = () => import("../views/Lab/Manage")
const LabRecord = () => import("../views/Lab/LabRecords")

const routes = [
  {
    path: "/",
    name: "HelloLab",
    component: HelloLab
  },
  {
    path: "/main",
    name: "Main",
    component: Main
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/lab/election",
    name: "EleLab",
    component: EleLab
  },
  {
    path: "/lab/force",
    name: "ForceLab",
    component: ForceLab
  },
  {
    path: "/lab/energy",
    name: "EngLab",
    component: EngLab
  },
  {
    path: "/lab/introduction",
    name: "Intro",
    component: Intro
  },
  {
    path: "/lab/reserve",
    name: "Reserve",
    component: Reserve
  },
  {
    path: "/lab/switch",
    name: "Switch",
    component: Switch
  },
  {
    path: "/news",
    name: "News",
    component: News
  },
  {
    path: "/profile/info",
    name: "Profile",
    component: Profile
  },
  {
    path: "/profile/change",
    name: "ChangeProfile",
    component: ChangeProfile
  },
  {
    path: "/manage",
    name: "Manage",
    component: Manage
  },
  {
    path: "/records",
    name: "Records",
    component: LabRecord
  }
]

const router = new VueRouter({
  mode: "history",
  // base: process.env.BASE_URL,
  routes
});

export default router;
