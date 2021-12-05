const initialState = {}

const projectReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_PROJECT": {
            let newState = { ...state }
            newState = action.payload.projectDetails
            return newState;
        }
        default:
            return state;
    }
}

export default projectReducer;