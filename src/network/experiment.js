import { request } from "@/network/request";
let baseURL = "http://localhost:8010/api/experiment"

export function addExperiment(EID, ELabel, EName, lab, EM, EN, EE, site) {
  return request(baseURL, {
    url: '/add',
    params: {
      EID, ELabel, EName, lab, EM, EN, EE, site
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
    url: '/getByLabel',
    params: {
      ELabel
    },
    method: "post"
  })
}

export function getAllExperiments() {
  return request(baseURL, {
    url: '/all',
    method: "post"
  })
}

export function getExperimentByEID(EID) {
  return request(baseURL, {
    url: '/getByEID',
    params: {
      EID
    },
    method: "post"
  })
}
