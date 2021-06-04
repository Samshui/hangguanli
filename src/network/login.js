import { request } from "@/network/request";
// let baseURL = "http://localhost:8010/api/user"
let baseURL = "http://localhost:8009"

// 登录
export function login(telephone, password) {
  return request(baseURL, {
    url: "/login",
    params: {
      PhoneNumber: telephone,
      Password: password
    },
    method: "post"
  })
}

// 注册
export function register(name, studentID, telephone, password) {
  return request(baseURL, {
    url: "/register",
    params: {
      UserName: name,
      UserID: studentID,
      PhoneNumber: telephone,
      Password: password
    },
    method: "post"
  })
}

// 获取用户信息
// export function getInfo(token) {
//   return request(baseURL, {
//     url: "/info",
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': 'Bearer ' + token
//     },
//     method: "get"
//   })
// }

// springboot 获取用户信息
export function getInfo(UserID) {
  return request(baseURL, {
    url: "/info",
    params: {
      UserID: UserID
    },
    method: "post"
  })
}

// 判断手机是否被使用
export function telephoneIsExisted(telephone) {
  return request(baseURL, {
    url: "/telephoneIsExist",
    params: {
      phoneNumber: telephone
    },
    method: "post"
  })
}
