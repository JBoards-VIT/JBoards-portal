const initialState = {
    isLoggedIn: localStorage.getItem("authToken") ? localStorage.getItem("authToken") : false,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN": {
            const newState = { ...state }
            localStorage.setItem("authToken", action.payload.token)
            newState.isLoggedIn = true
            newState.user = action.payload.user
            return newState;
        }
        case "SET_USER": {
            const newState = { ...state }
            newState.user = action.payload.user
            return newState
        }
        case "LOGOUT": {
            localStorage.removeItem("authToken")
            return { user: {}, isLoggedIn: false };
        }
        default:
            return state;
    }
}

export default authReducer;