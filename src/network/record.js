import { request } from "@/network/request";
let baseURL = "http://localhost:8010/api/record"

export function addRecord(EID, UID, date, time, site) {
  return request(baseURL, {
    url: "/add",
    params: {
      EID, UID, date, time, site
    },
    method: "post"
  })
}

export function deleteRecord(EID, UID, date, time, site) {
  return request(baseURL, {
    url: "/delete",
    params: {
      EID, UID, date, time, site
    },
    method: "post"
  })
}

export function getAllRecords(EID) {
  return request(baseURL, {
    url: "/getAll",
    params: {
      EID
    },
    method: "post"
  })
}

export function getSiteSelected(EID, Date, Time) {
  return request(baseURL, {
    url: '/getRecordsSites',
    params: {
      EID, Date, Time
    },
    method: "post"
  })
}

export function getUserRecords(UID) {
  return request(baseURL, {
    url: '/getUserRecords',
    params: {
      UID
    },
    method: "post"
  })
}
