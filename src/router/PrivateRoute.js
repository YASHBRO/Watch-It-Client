import { useContext, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { UserContext } from "../context/User";
import CheckLogIn from "../utils/CheckLogIn";

function PrivateRoute() {
    const user = useContext(UserContext);

    useEffect(() => {
        const userId = CheckLogIn();
        if (!userId) {
            user.setIsLoggedIn(false);
        } else {
            user.setUserId(userId);
        }
    }, [user]);

    return user?.isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
