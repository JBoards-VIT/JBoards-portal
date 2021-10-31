const initialState = {
    isLoggedIn: localStorage.getItem("LoggedIn") || false,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN": {
            localStorage.setItem("LoggedIn", true)
            return { ...state, isLoggedIn: true };
        }
        case "LOGOUT": {
            localStorage.removeItem("LoggedIn")
            return { ...state, isLoggedIn: false };
        }
        default:
            return state;
    }
}

export default authReducer;