import React from "react";
import {
    Avatar,
    Box,
    Button,
    Grid,
    Paper,
    TextField,
    Typography,
} from "@mui/material";

import SendIcon from "@mui/icons-material/Send";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";

function ChatBox() {
    return (
        <Grid item lg={4} md={5} xs={10}>
            <Paper
                sx={{
                    minHeight: "275px",
                    display: "flex",
                    flexDirection: "column",
                }}
                elevation={4}
            >
                <Box sx={{ py: 1, borderBottom: "1px solid grey" }}>
                    <Typography variant="h6" sx={{ pl: 2 }}>
                        Chat
                    </Typography>
                </Box>
                <Box sx={{ my: "auto" }}></Box>
                <Box sx={{ display: "flex", px: 1 }}>
                    <Avatar color="info" sx={{ marginRight: 1 }}>
                        <PermIdentityIcon />
                    </Avatar>
                    <TextField
                        size="small"
                        placeholder="Type here..."
                        sx={{ width: 1 }}
                    />
                    <Button
                        variant="outlined"
                        color="secondary"
                        sx={{ marginLeft: 1 }}
                    >
                        <SendIcon />
                    </Button>
                </Box>
            </Paper>
        </Grid>
    );
}

export default ChatBox;
