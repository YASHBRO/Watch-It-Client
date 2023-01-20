import React, { useState } from "react";
import { Box, Paper, Tab, Tabs } from "@mui/material";
import { CreateRoom } from "./CreateRoom";
import { JoinRoom } from "./JoinRoom";

function Rooms() {
    const [tabValue, setTabValue] = useState(0);

    function TabPanel(props) {
        const { children, value, index, ...other } = props;
        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
            </div>
        );
    }

    function a11yProps(index) {
        return {
            style: { fontWeight: "bold" },
            "aria-controls": `simple-tabpanel-${index}`,
        };
    }

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "75vh",
            }}
        >
            <Paper elavation={3}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs
                        value={tabValue}
                        onChange={(_e, newValue) => {
                            setTabValue(newValue);
                        }}
                        aria-label="basic tabs example"
                        style={{ backgroundColor: "#f6f6f6" }}
                    >
                        <Tab label="Create" {...a11yProps(0)} />
                        <Tab label="Join" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <TabPanel value={tabValue} index={0}>
                    <CreateRoom />
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                    <JoinRoom />
                </TabPanel>
            </Paper>
        </Box>
    );
}

export default Rooms;
