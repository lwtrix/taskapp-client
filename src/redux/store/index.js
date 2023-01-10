import { combineReducers, configureStore } from "@reduxjs/toolkit";
import plannersReducer from "../reducers/plannersReducer";

const mainReducer = combineReducers({
    planner: plannersReducer
})

export const store = configureStore({
    reducer: mainReducer
})