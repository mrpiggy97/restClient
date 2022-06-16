import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./authenticationReducer"
import chatReducer from "./chatReducer";

const store = configureStore({
    reducer:{
        authentication : authenticationReducer,
        chat : chatReducer
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch