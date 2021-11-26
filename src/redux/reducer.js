import { combineReducers } from "redux";
import authReducer from "./reducers/Auth"
import boardReducer from "./reducers/Board"
let reducer = combineReducers({
    auth: authReducer,
    boards: boardReducer,
});

const rootReducer = (state, action) => {
    return reducer(state, action);
}


export default rootReducer;