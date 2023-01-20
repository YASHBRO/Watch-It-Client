import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import CheckLogIn from "../../utils/CheckLogIn";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../../context/User";
import { UserLoginApi, UserRegisterApi } from "./api";

function Login() {
    const [isLogin, setIsLogin] = useState(true);

    const user = useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {
        const localUserId = CheckLogIn();
        if (localUserId) {
            user.setUserId(localUserId);
            user.setIsLoggedIn(true);
            navigate("/");
        }
    }, [navigate, user]);

    const handleLoginSwitch = () => setIsLogin((prev) => !prev);

    const handleUserSuccess = (userId) => {
        user.setUserId(userId);
        user.setIsLoggedIn(true);
        localStorage.setItem("UserId", userId);
        navigate("/")
    };

    const handleLogin = (body) => {
        UserLoginApi(body)
            .then((res) => {
                if (res?.userId) {
                    handleUserSuccess(res.userId);
                }
            })
            .catch((err) => {
                console.error("yd", err);
            });
    };

    const handleRegister = (body) => {
        UserRegisterApi(body)
            .then((res) => {
                if (res?.userId) {
                    handleUserSuccess(res.userId);
                }
            })
            .catch((err) => {
                console.error("yd", err);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = { email: e.target[0].value, password: e.target[2].value };

        if (!isLogin) {
            if (user.password !== e.target[4].value) {
                alert("Confirmation password doesn't match");
                return;
            }
        }

        if (isLogin) {
            handleLogin(user);
        } else {
            handleRegister(user);
        }
    };

    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Paper
                component="form"
                onSubmit={handleSubmit}
                elevation={3}
                sx={{
                    marginBlock: 4,
                    paddingInline: 6,
                    paddingBlock: 8,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 3,
                }}
            >
                <Typography variant="h4">
                    {isLogin ? "Login" : "Register"}
                </Typography>

                <TextField name="email" label="Email" type="email" required />

                <TextField
                    name="password"
                    label="Password"
                    type="password"
                    required
                />

                {!isLogin ? (
                    <TextField
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        required
                    />
                ) : null}

                <Button variant="contained" type="submit">
                    {isLogin ? "Login" : "Register"}
                </Button>

                <Typography variant="caption">
                    {isLogin ? (
                        <>
                            Want to create account?{" "}
                            <Button variant="text" onClick={handleLoginSwitch}>
                                Register here
                            </Button>
                            "
                        </>
                    ) : (
                        <>
                            Already have an account?{" "}
                            <Button variant="text" onClick={handleLoginSwitch}>
                                Login here
                            </Button>
                        </>
                    )}
                </Typography>
            </Paper>
        </Box>
    );
}

export default Login;
