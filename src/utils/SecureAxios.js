import axios from "axios";
import { BASE_URL } from "../constants/API";

const SecureAxios = axios.create({
    baseURL: BASE_URL,
});

SecureAxios.interceptors.request.use(
    (request) => {
        const userId = localStorage.getItem("UserId");
        request.headers.Authorization = `Bearer ${userId}`;
        return request;
    },
    (err) => Promise.reject(err)
);

export default SecureAxios;
