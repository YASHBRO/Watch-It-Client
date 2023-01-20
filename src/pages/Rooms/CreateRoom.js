import { useState } from "react";
import {
    Box,
    FormControlLabel,
    Switch,
    TextField,
    Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import AddIcon from "@mui/icons-material/Add";
import { CreateRoomApi } from "./api";
import { useNavigate } from "react-router-dom";

const resetNewRoomDetails = {
    guestControl: true,
    privateRoom: false,
    currentVideo: "",
};

export function CreateRoom() {
    const [roomDetails, setRoomDetails] = useState(resetNewRoomDetails);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleCreateRoom = () => {
        setIsLoading(true);
        CreateRoomApi(roomDetails)
            .then((res) => {
                console.log("yd", res);
                const {
                    details: { roomCode },
                } = res;
                navigate(`/room/${roomCode}`);
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
                Create New Room
            </Typography>
            <TextField
                label="Youtube Video Url"
                name="currentVideo"
                value={roomDetails?.currentVideo}
                onChange={(e) =>
                    setRoomDetails((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                    }))
                }
            />
            <FormControlLabel
                control={
                    <Switch
                        checked={roomDetails?.guestControl}
                        name="guestControl"
                        onChange={(e) =>
                            setRoomDetails((prev) => ({
                                ...prev,
                                [e.target.name]: e.target.checked,
                            }))
                        }
                    />
                }
                label="Guest Control"
            />
            <FormControlLabel
                control={
                    <Switch
                        checked={roomDetails?.privateRoom}
                        name="privateRoom"
                        onChange={(e) =>
                            setRoomDetails((prev) => ({
                                ...prev,
                                [e.target.name]: e.target.checked,
                            }))
                        }
                    />
                }
                label="Private Room"
            />
            <LoadingButton
                loading={isLoading}
                loadingPosition="start"
                variant="contained"
                startIcon={<AddIcon />}
                sx={{
                    mt: 2,
                }}
                onClick={handleCreateRoom}
            >
                {isLoading ? "Creating..." : "Create"}
            </LoadingButton>
        </Box>
    );
}
