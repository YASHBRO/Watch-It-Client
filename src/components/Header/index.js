import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom";

import "./HeaderStyle.css";

const watchItLogo = require("../../assets/image/logo.png");

const Header = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const navigate = useNavigate();

    const pages = [
        { label: "Rooms", href: "/rooms" },
        { label: "About", href: "/about" },
        {
            label: "Log Out",
            href: "/login",
            onClick: () => {
                localStorage.removeItem("UserId");
                navigate("/login");
            },
        },
    ];

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar id="AppHeader" position="fixed" sx={{ zIndex: 1000 }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component={Link}
                        to="/"
                        sx={{
                            display: { xs: "none", md: "flex" },
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                            textAlign: "center",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <img src={watchItLogo} alt="logo" className="logo" />
                        WATCH IT
                    </Typography>

                    <Box
                        sx={{
                            display: { xs: "flex", md: "none" },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.href}>
                                    <Typography
                                        component={Link}
                                        to={page.href}
                                        textAlign="center"
                                        onClick={(e) => {
                                            if (page?.onClick) {
                                                page.onClick(e);
                                            }
                                        }}
                                    >
                                        {page.label}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component={Link}
                        to="/"
                        sx={{
                            mr: 2,
                            display: { xs: "flex", md: "none" },
                            flexGrow: 1,
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <img src={watchItLogo} alt="logo" className="logo" />
                        Watch It
                    </Typography>
                    <Box
                        sx={{
                            ml: "auto",
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                        }}
                    >
                        {pages.map((page) => (
                            <Button
                                key={page.href}
                                component={Link}
                                to={page.href}
                                sx={{ my: 2, color: "white", display: "block" }}
                                onClick={(e) => {
                                    if (page?.onClick) {
                                        page.onClick(e);
                                    }
                                }}
                            >
                                {page.label}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default Header;
