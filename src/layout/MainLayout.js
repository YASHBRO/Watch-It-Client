import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

function MainLayout() {
    const [headerHeight, setHeaderHeight] = useState(0);

    useEffect(() => {
        const headerEle = document.getElementById("AppHeader");
        const headerRect = headerEle.getBoundingClientRect();
        setHeaderHeight(headerRect.bottom);
    }, []);

    return (
        <div style={{ width: "100%", height: "100%" }}>
            <Header />
            <div
                style={{
                    marginTop: String(headerHeight) + "px",
                    width: "100%",
                    height: "100%",
                }}
            >
                <Outlet />
            </div>
        </div>
    );
}

export default MainLayout;
