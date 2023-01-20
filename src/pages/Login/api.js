import axios from "axios";

import { BASE_URL } from "../../constants/API";

export async function UserLoginApi(body) {
    try {
        const res = await axios.post(BASE_URL + "/login", {
            email: body.email,
            password: body.password,
        });
        return res.data;
    } catch (error) {
        throw error;
    }
}

export async function UserRegisterApi(body) {
    try {
        const res = await axios.post(BASE_URL + "/create-user", {
            email: body.email,
            password: body.password,
        });
        return res.data;
    } catch (error) {
        throw error;
    }
}
