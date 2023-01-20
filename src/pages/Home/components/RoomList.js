import { Box, Grid } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

import Styles from "./styles.module.css";

function RoomList(props) {
    const { allRooms = [] } = props;

    const navigate = useNavigate();

    const RoomCard = ({ room, index }) => (
        <Box
            className={[Styles.roomWrapper].join(" ")}
            onClick={() => {
                navigate(`/room/${room.roomCode}`);
            }}
        >
            <img
                src={`https://picsum.photos/800/400?random=${index}`}
                alt="cover"
                className={[Styles.roomImg].join(" ")}
            />
            <div className={[Styles.roomText].join(" ")}>
                <div className={[Styles.roomUser].join(" ")}>
                    {room.host.name}
                </div>
                <div>
                    <span className={[Styles.roomTextLables].join(" ")}>
                        Room code :{" "}
                    </span>
                    {room.roomCode}
                </div>
            </div>
        </Box>
    );

    return (
        <Grid
            container
            spacing={3}
            justifyContent="center"
            alignItems="center"
            alignContent="center"
            xs={11}
            sx={{ mx: "auto", my: 1 }}
        >
            {allRooms.map((room, ind) => (
                <Grid item key={ind} xl={3} md={4} sm={6} xs={12}>
                    <RoomCard room={room} index={ind} />
                </Grid>
            ))}
        </Grid>
    );
}

export default RoomList;
