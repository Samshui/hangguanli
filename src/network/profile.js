import { request } from "@/network/request";
let baseURL = "http://localhost:8010/api/user"

// 修改用户联系方式
export function changeTelephone(newTelephone, oldTelephone) {
  return request(baseURL, {
    url: "/changeTelephone",
    params: {
      newTelephone,
      oldTelephone
    },
    method: "post"
  })
}
