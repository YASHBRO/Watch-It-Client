import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import About from "../pages/About";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Room from "../pages/Room";
import Rooms from "../pages/Rooms";
import PrivateRoute from "./PrivateRoute";

function AppRouter() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoute />}>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="rooms" element={<Rooms />} />
                    <Route path="room/:roomCode" element={<Room />} />
                </Route>
            </Route>
        </Routes>
    );
}

export default AppRouter;
