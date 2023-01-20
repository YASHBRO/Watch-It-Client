import SecureAxios from "../../utils/SecureAxios";

export const CreateRoomApi = async (body = {}) => {
    try {
        const res = await SecureAxios.post("/create-room", body);
        return res?.data;
    } catch (error) {
        throw error;
    }
};

export const JoinRoomApi = async (body) => {
    const { roomCode = "" } = body;
    try {
        const res = await SecureAxios.post(`/join-room/${roomCode}`);
        return res?.data;
    } catch (error) {
        throw error;
    }
};
