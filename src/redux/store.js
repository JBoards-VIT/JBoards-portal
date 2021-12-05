import { applyMiddleware, createStore } from "redux"
import thunk from "redux-thunk"
import reducer from "./reducer"

export default function configureStore(initialState) {
    return createStore(reducer, initialState, applyMiddleware(thunk));
}