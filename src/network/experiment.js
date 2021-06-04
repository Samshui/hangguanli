import { request } from "@/network/request";
// let baseURL = "http://localhost:8010/api/experiment"
let baseURL = "http://localhost:8009"

export function addExperiment(EID, ELabel, EName, lab, EM, EN, EE, site) {
  return request(baseURL, {
    url: '/addExperiment',
    params: {
      Eid: EID,
      ELabel: ELabel,
      Lab: lab,
      EName: EName,
      TimeMorning: EM,
      TimeNoon: EN,
      TimeEvening: EE,
      SiteSize: site
    },
    method: "post"
  })
}

export function deleteExperiment(EID) {
  return request(baseURL, {
    url: '/deleteExperiment',
    params: {
      Eid: EID
    },
    method: "post"
  })
}

export function getExperimentByLabel(ELabel) {
  return request(baseURL, {
    url: '/getExperimentsByLabel',
    params: {
      ELabel: ELabel
    },
    method: "post"
  })
}

export function getAllExperiments() {
  return request(baseURL, {
    url: '/getAllExperiments',
    method: "post"
  })
}

export function getExperimentByEID(EID) {
  return request(baseURL, {
    url: '/getInfoByEID',
    params: {
      Eid: EID
    },
    method: "post"
  })
}
