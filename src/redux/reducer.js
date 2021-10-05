import { combineReducers } from "redux";
import authReducer from "./reducers/Auth"
let reducer = combineReducers({
    auth: authReducer
});

const rootReducer = (state, action) => {
    return reducer(state, action);
}


export default rootReducer;