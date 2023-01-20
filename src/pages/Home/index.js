import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import "./HomeStyle.css";
import GetAllRoomsApi from "./api";
import HomeLogo from "../../components/MainLogo";
import RoomList from "./components/RoomList";

const homeBgVideo = require("../../assets/videos/homeBackground.mp4");

function Home() {
    const [allRooms, setAllRooms] = useState([]);

    useEffect(() => {
        GetAllRoomsApi().then((res) => {
            setAllRooms(res.data.result);
        });
    }, []);

    const BackgroundVideo = () => (
        <>
            <div>
                <video className="home-video-bg" autoPlay muted loop>
                    <source src={homeBgVideo} type="video/mp4" />
                </video>
            </div>
            <div className="home-overlay"></div>
        </>
    );

    return (
        <Box>
            <BackgroundVideo />
            <Box
                sx={{
                    mx: "auto",
                    pt: 1,
                }}
            >
                <HomeLogo />
                <RoomList allRooms={allRooms} />
            </Box>
        </Box>
    );
}

export default Home;
