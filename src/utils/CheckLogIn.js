const CheckLogIn = () => {
    const localUserId = localStorage.getItem("UserId");
    if (localUserId) {
        return localUserId;
    } else {
        return false;
    }
};

export default CheckLogIn;
