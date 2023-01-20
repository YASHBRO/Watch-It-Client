import { useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import AddIcon from "@mui/icons-material/Add";
import { JoinRoomApi } from "./api";
import { useNavigate } from "react-router-dom";

export function JoinRoom() {
    const [roomDetails, setRoomDetails] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleJoinRoom = () => {
        setIsLoading(true);
        JoinRoomApi(roomDetails)
            .then((res) => {
                console.log("yd", res);
                if (res.status) {
                    const {
                        result: { roomCode },
                    } = res;
                    navigate(`/room/${roomCode}`);
                }
            })
            .catch((err) => {
                console.error("yd", err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                marginBlock: 3,
                marginInline: 5,
            }}
        >
            <Typography
                variant="h5"
                sx={{
                    mb: 2,
                    textAlign: "center",
                }}
            >
                Join a Room
            </Typography>
            <TextField
                label="Enter Room Code"
                name="roomCode"
                value={roomDetails?.roomCode}
                onChange={(e) =>
                    setRoomDetails((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                    }))
                }
            />
            <LoadingButton
                loading={isLoading}
                loadingPosition="start"
                variant="contained"
                startIcon={<AddIcon />}
                sx={{
                    mt: 2,
                }}
                onClick={handleJoinRoom}
            >
                {isLoading ? "Joining..." : "Join"}
            </LoadingButton>
        </Box>
    );
}
