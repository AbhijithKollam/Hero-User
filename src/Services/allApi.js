import { commonAPI } from "./commonApi";
import { BASE_URL } from "./baseUrl";

// 1.Register user
export const registerAPI = async (user) => {
    return await commonAPI("post", `${BASE_URL}/user/register`, user, "")
}

// 2.Login user
export const loginAPI = async (reqBody) => {
    return await commonAPI("post", `${BASE_URL}/user/login`, reqBody, "")
}

// 3.send user complaint
export const complaintApi = async (reqBody) => {
    return await commonAPI("post", `${BASE_URL}/user/sendComplaint`, reqBody, "")
}

// 4.get user cmp
export const getUserCmpApi = async (id) => {
    return await commonAPI("get", `${BASE_URL}/user/getcmp/${id}`, "", "")
}