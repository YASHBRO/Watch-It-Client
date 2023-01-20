import SecureAxios from "../../utils/SecureAxios";

export const UpdateRoomApi = async (body = {}) => {
    if (body?.currentVideo?.length === 0) {
        delete body?.currentVideo;
    }
    if (body?.guestControl === "on") {
        body.guestControl = true;
    }
    if (body?.privateRoom === "on") {
        body.privateRoom = true;
    }
    try {
        const res = await SecureAxios.put("/update-room", body);
        return res?.data;
    } catch (error) {
        throw error;
    }
};
