export const login = (token, user) => {
    return {
        type: "LOGIN",
        payload: {
            token,
            user
        }
    }
}

export const setUser = (user) => {
    return {
        type: "SET_USER",
        payload: {
            user: user
        }
    }
}
export const logout = () => {
    return {
        type: "LOGOUT"
    }
}