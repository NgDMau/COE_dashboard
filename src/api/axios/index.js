import axios from "axios";
import { linkApi } from "../../common/ngok";

const user = JSON.parse(localStorage.getItem("user"));
const axiosInstance = axios.create({
  baseURL: linkApi,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const configTemp = { ...config };
    if (configTemp.headers) {
      configTemp.headers.Authorization = `Token ${user?.token}`;
    }
    return configTemp;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log("responseresponseresponseresponseresponseresponse", response);
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
  axiosInstance.get(url, { params }).then((res) => res);
export const sendPost = (url, params) =>
  axiosInstance.post(url, params).then((res) => res);
export const sendPut = (url, params) =>
  axiosInstance.put(url, params).then((res) => res);
export const sendPatch = (url, params) =>
  axiosInstance.patch(url, params).then((res) => res);
export const sendDelete = (url, params) =>
  axiosInstance.delete(url, { data: params }).then((res) => res);
export const sendCustom = (params = {}) =>
  axiosInstance(params).then((res) => res);
