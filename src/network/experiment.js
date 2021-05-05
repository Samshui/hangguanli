import { request } from "@/network/request";
let baseURL = "http://localhost:8010/api/experiment"

export function addExperiment(EID, ELabel, EName, lab, EM, EN, EE) {
  return request(baseURL, {
    url: '/add',
    params: {
      EID, ELabel, EName, lab, EM, EN, EE
    },
    method: "post"
  })
}

export function deleteExperiment(EID) {
  return request(baseURL, {
    url: '/delete',
    params: {
      EID
    },
    method: "post"
  })
}

export function getExperimentByLabel(ELabel) {
  return request(baseURL, {
    url: '/get',
    params: {
      ELabel
    },
    method: "post"
  })
}
