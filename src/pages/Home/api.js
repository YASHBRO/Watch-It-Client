import SecureAxios from "../../utils/SecureAxios";

export default async function GetAllRoomsApi() {
    try {
        const res = await SecureAxios.get("/get-all-rooms");
        return res;
    } catch (error) {
        console.error("yd", error);
    }
}
