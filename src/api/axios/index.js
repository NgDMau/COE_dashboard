import axios from "axios";
import { linkApi } from "../../common/ngok";
const axiosInstance = axios.create({
  baseURL: linkApi,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
      ? JSON.parse(localStorage.getItem("token"))
      : null;
    const configTemp = { ...config };
    if (configTemp.headers) {
      configTemp.headers.Authorization = `Token ${token}`;
    }
    return configTemp;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => {
    if (response) return response?.data;
    return response;
  },
  (error) => {
    if (error?.response?.status === 401) {
      return error.response;
    }
    if (error?.response?.status === 103) {
      return error.response;
    }
    return error.response;
  }
);

export const sendGet = (url, params) =>
  axiosInstance.get(url, params).then((res) => res);
export const sendPost = (url, params) => {
  const urlencoded = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    urlencoded.append(`${key}`, `${value}`);
  }
  const response = axiosInstance.post(url, urlencoded).then((res) => res);
  return response;
};
// axiosInstance.post(url, params).then((res) => res);
export const sendPut = (url, params) =>
  axiosInstance.put(url, params).then((res) => res);
export const sendPatch = (url, params) => {
  const urlencoded = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    urlencoded.append(`${key}`, `${value}`);
  }
  const response = axiosInstance.patch(url, urlencoded).then((res) => res);
  return response;
};
export const sendDelete = (url, params) => {
  const token = localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null;
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Token " + token);
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  const urlencoded = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    urlencoded.append(`${key}`, `${value}`);
  }

  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  const response = fetch(`${linkApi}${url}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      return result;
    })
    .catch((error) => {
      return error;
    });
  return response;
};
export const sendCustom = (params = {}) =>
  axiosInstance(params).then((res) => res);
