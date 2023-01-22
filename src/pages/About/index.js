import React from "react";
import { Grid, Typography } from "@mui/material";

import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import LoopIcon from "@mui/icons-material/Loop";
import TagFacesIcon from "@mui/icons-material/TagFaces";

import HomeLogo from "../../components/MainLogo";
import { orange } from "@mui/material/colors";

function About() {
    const iconProperties = { fontSize: "calc(4rem + 1vw)", color: orange[800] };
    const iconBlock = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "calc(1rem + 2vw)",
    };
    const iconText = {
        maxWidth: "350px",
        textAlign: "center",
        fontSize: "calc(1rem + 0.125vw)",
        color: "#ddd",
    };
    const bodyText = {
        ml: 1,
        mb: 1,
        fontSize: "calc(1rem + 0.25vw)",
        color: "#ddd",
    };

    return (
        <Grid container spacing={4} sx={{ px: "calc(2rem + 4vw)" }}>
            <Grid item xs={12} sx={{ mb: 2 }}>
                <HomeLogo />
            </Grid>
            <Grid item xs={12} md={4} sx={iconBlock}>
                <PeopleAltIcon sx={iconProperties} />
                <Typography variant="body2" sx={iconText}>
                    Virtual movie night with your partner, friends, family, or
                    colleagues? We've got you covered! Gather as many people as
                    you like!
                </Typography>
            </Grid>
            <Grid item xs={12} md={4} sx={iconBlock}>
                <LoopIcon sx={iconProperties} />
                <Typography variant="body2" sx={iconText}>
                    No more 3, 2, 1...we'll handle the video synchronization for
                    you!
                </Typography>
            </Grid>
            <Grid item xs={12} md={4} sx={iconBlock}>
                <TagFacesIcon sx={iconProperties} />
                <Typography variant="body2" sx={iconText}>
                    Use your webcams to see your friends' reactions real-time
                    and live-chat - the next best thing to being together!
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography
                    variant="h3"
                    sx={{ mt: "calc(2rem + 2vw)", mb: 2, color: "#fefefe" }}
                >
                    About
                </Typography>
                <Typography variant="body1" sx={bodyText}>
                    WatchIt is a Web Application project aiming to develop a
                    platform for streaming videos together with a group of
                    people. Now is the era of digitalization, especially after
                    the COVID period, we are bound to find an alternative for
                    everything over the digital platform. So this project aims
                    at bringing a classroom on the desktop and making it feel as
                    if it is actually a group of people physically studying
                    through the same video simultaneously.
                </Typography>
                <Typography variant="body1" sx={bodyText}>
                    At the same time, it solves the problem of people struggling
                    to share their screen over any video conferencing platform
                    which as observed is not a very simple task because of the
                    lag and noise issues. This is a very useful resource if seen
                    from the perspective of a teacher or an instructor. WatchIt
                    enables users to stream a YouTube video to a group of people
                    with synchronization added to it.
                </Typography>
            </Grid>
        </Grid>
    );
}

export default About;
