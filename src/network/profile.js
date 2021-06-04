import { request } from "@/network/request";
// let baseURL = "http://localhost:8010/api/user"
let baseURL = "http://localhost:8009"

// 修改用户联系方式
export function changeTelephone(newTelephone, oldTelephone) {
  return request(baseURL, {
    url: "/changeTelephone",
    params: {
      newPhone: newTelephone,
      oldPhone: oldTelephone
    },
    method: "post"
  })
}
