import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import SecureAxios from "../../utils/SecureAxios";
import {
    FormControlLabel,
    Grid,
    Paper,
    Switch,
    TextField,
    Typography,
} from "@mui/material";
import YouTube from "react-youtube";
import { io } from "socket.io-client";
import { UserContext } from "../../context/User";
import LoadingButton from "@mui/lab/LoadingButton";
import { UpdateRoomApi } from "./api";
import { BASE_URL } from "../../constants/API";

const resetRoomDetails = {
    _id: null,
    host: {},
    guest: [],
    currentVideo: null,
    guestControl: false,
    privateRoom: false,
    roomCode: null,
};

const resetCurrentVideoStats = { videoId: "" };

function Room() {
    const [roomDetails, setRoomDetails] = useState(resetRoomDetails);
    const [isLoading, setIsLoading] = useState(false);

    const currentVideoStatsRef = useRef(resetCurrentVideoStats);
    const videoPlayerRef = useRef();

    const socket = useRef(io.connect(BASE_URL)).current;

    const { userId } = useContext(UserContext);

    const pathParams = useParams();

    useEffect(() => {
        handleGetRoomDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    socket.on("connect", () => {
        console.log("yd connected", socket.id);
    });
    socket.on("disconnect", () => {
        console.log("yd socket disconnected");
    });

    function handleGetRoomDetails() {
        SecureAxios(`get-room/${pathParams.roomCode}`)
            .then((res) => {
                setRoomDetails(res.data.result);
            })
            .catch((err) => {
                console.log("yd", err);
            });
    }

    const handleJoinRoom = () => {
        if (roomDetails._id === null) {
            return;
        }
        socket.emit("join-room", roomDetails._id);
    };

    useEffect(() => {
        if (roomDetails?.currentVideo) {
            const videoUrl = new URL(roomDetails?.currentVideo);
            currentVideoStatsRef.current.videoId =
                videoUrl.searchParams.get("v");
        }
        handleJoinRoom();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [roomDetails]);

    const userIsHost = userId === roomDetails.host?._id;

    const playerTimeSeekTo = (timestamp) => {
        videoPlayerRef.current.seekTo(timestamp);
        videoPlayerRef.current.playVideo();
    };

    const playerTimePauseAt = (timestamp) => {
        videoPlayerRef.current.seekTo(timestamp);
        videoPlayerRef.current.pauseVideo();
    };

    const handlePlayerStateChange = ({ target, data }) => {
        console.log("yd state change hit");
        console.log(
            "yd",
            userIsHost || roomDetails.guestControl,
            userIsHost,
            roomDetails.guestControl
        );
        if (!(userIsHost || roomDetails.guestControl)) {
            console.log("yd state change not allowed");

            // switch (data) {
            //     case 1:
            //         videoPlayerRef.current.pauseVideo();
            //         break;
            //     case 2:
            //         videoPlayerRef.current.playVideo();
            //         break;
            //     default:
            //         break;
            // }
            return;
        }

        switch (data) {
            case 1:
                console.log("yd play state");
                socket.emit(
                    "play-video",
                    roomDetails?._id,
                    target.getCurrentTime()
                );
                break;
            case 2:
                console.log("yd pause state");
                socket.emit(
                    "pause-video",
                    roomDetails?._id,
                    target.getCurrentTime()
                );
                break;
            case 3:
                socket.emit(
                    "buffer-video",
                    roomDetails?._id,
                    target.getCurrentTime()
                );
                break;

            default:
                console.log("yd no state matched");
                break;
        }
    };

    socket.on("seek-to", (timestamp) => {
        console.log("yd", "seek to :", timestamp);
        playerTimeSeekTo(timestamp);
    });
    socket.on("pause-at", (timestamp) => {
        console.log("yd", "pause at :", timestamp);
        playerTimePauseAt(timestamp);
    });
    socket.on("buffer-at", (timestamp) => {
        console.log("yd", "buffer at :", timestamp);
        playerTimePauseAt(timestamp);
    });
    socket.on("get-room-details", (timestamp) => {
        handleGetRoomDetails();
    });

    const handleUpdateRoom = (e) => {
        setIsLoading(true);
        e.preventDefault();
        let body = new FormData(e.target);
        body = Object.fromEntries(body);
        body.roomCode = roomDetails.roomCode;
        UpdateRoomApi(body)
            .then(() => {
                handleGetRoomDetails();
                socket.emit("update-room", roomDetails?.roomCode);
            })
            .finally(() => setIsLoading(false));
    };

    return (
        <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={3}
            sx={{ paddingTop: 4, marginBottom: 2 }}
        >
            <Grid
                item
                xs={12}
                md={10}
                lg={8}
                sx={{
                    aspectRatio: "16/9",
                }}
                onClick={() => {
                    console.log("yd clicked");
                }}
            >
                <YouTube
                    ref={videoPlayerRef}
                    videoId={currentVideoStatsRef.current.videoId}
                    style={{ height: "100%" }}
                    onStateChange={handlePlayerStateChange}
                    onReady={({ target }) => {
                        videoPlayerRef.current = target;
                    }}
                    opts={{
                        width: "100%",
                        height: "100%",
                        playerVars: {
                            autoplay: 0,
                            mute: 1,
                            controls:
                                userIsHost || roomDetails.guestControl ? 1 : 0,
                            disablekb: userIsHost ? 0 : 1,
                            fs: 0,
                        },
                    }}
                />
            </Grid>
            {userIsHost ? (
                <Grid item xs={5} minWidth="300px">
                    <Paper
                        elevation={3}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 1,
                            paddingBlock: 2,
                        }}
                    >
                        <Typography
                            variant="h5"
                            sx={{
                                mb: 2,
                                textAlign: "center",
                            }}
                        >
                            Update Room Details
                        </Typography>
                        <form
                            onSubmit={handleUpdateRoom}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: 1,
                            }}
                        >
                            <TextField
                                label="Youtube Video Url"
                                name="currentVideo"
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        name="guestControl"
                                        defaultChecked={
                                            roomDetails?.guestControl
                                        }
                                    />
                                }
                                label="Guest Control"
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        name="privateRoom"
                                        defaultChecked={
                                            roomDetails?.privateRoom
                                        }
                                    />
                                }
                                label="Private Room"
                            />
                            <LoadingButton
                                type="submit"
                                loading={isLoading}
                                loadingPosition="end"
                                variant="contained"
                                color="secondary"
                                sx={{
                                    mt: 2,
                                }}
                            >
                                {isLoading ? "Updating..." : "Update"}
                            </LoadingButton>
                        </form>
                    </Paper>
                </Grid>
            ) : null}
        </Grid>
    );
}

export default Room;
