import { combineReducers } from "redux";
import authReducer from "./reducers/Auth"
import boardReducer from "./reducers/Board"
import projectReducer from "./reducers/Project";
let reducer = combineReducers({
    auth: authReducer,
    boards: boardReducer,
    project: projectReducer
});

const rootReducer = (state, action) => {
    return reducer(state, action);
}


export default rootReducer;