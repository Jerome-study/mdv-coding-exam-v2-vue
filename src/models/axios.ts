import axios from "axios";

const axiosCustom = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL
});

export default axiosCustom