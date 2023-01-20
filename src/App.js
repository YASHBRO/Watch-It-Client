import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router";

import { UserContext } from "./context/User";
import { useState } from "react";

function App() {
    const [userId, setUserId] = useState();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <UserContext.Provider
            value={{ userId, setUserId, isLoggedIn, setIsLoggedIn }}
        >
            <BrowserRouter>
                <AppRouter />
            </BrowserRouter>
        </UserContext.Provider>
    );
}

export default App;
