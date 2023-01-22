import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router";

import { UserContext } from "./context/User";
import { useState } from "react";

import { ThemeProvider } from "@mui/material/styles";
import { AppTheme } from "./theme";

function App() {
    const [userId, setUserId] = useState();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <UserContext.Provider
            value={{ userId, setUserId, isLoggedIn, setIsLoggedIn }}
        >
            <ThemeProvider theme={AppTheme}>
                <BrowserRouter>
                    <AppRouter />
                </BrowserRouter>
            </ThemeProvider>
        </UserContext.Provider>
    );
}

export default App;
