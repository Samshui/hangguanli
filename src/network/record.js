import { request } from "@/network/request";
// let baseURL = "http://localhost:8010/api/record"
let baseURL = "http://localhost:8009"

export function addRecord(EID, UID, date, time, site, EName, Lab) {
  return request(baseURL, {
    url: "/addRecord",
    params: {
      UserID: UID,
      EID: EID,
      Date: date,
      Site: site,
      Time: time,
      EName: EName,
      Lab: Lab
    },
    method: "post"
  })
}

export function deleteRecord(EID, UID, date, time, site) {
  return request(baseURL, {
    url: "/deleteRecord",
    params: {
      UserID: UID,
      EID: EID,
      Date: date,
      Site: site,
      Time: time
    },
    method: "post"
  })
}

export function getAllRecords(EID) {
  return request(baseURL, {
    url: "/getAllRecordsByEID",
    params: {
      EID: EID
    },
    method: "post"
  })
}

export function getSiteSelected(EID, Date, Time) {
  return request(baseURL, {
    url: '/getAllSiteSelected',
    params: {
      EID: EID,
      Date: Date,
      Time: Time
    },
    method: "post"
  })
}

export function getUserRecords(UID) {
  return request(baseURL, {
    url: '/getAllRecordsByStudentID',
    params: {
      UserID: UID
    },
    method: "post"
  })
}
