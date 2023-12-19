import axios from "axios";

const axiosIns = axios.create({
  baseURL: "https://65818e063dfdd1b11c43937a.mockapi.io/users-otp-basic"
});

export default axiosIns;