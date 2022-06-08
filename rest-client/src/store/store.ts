import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./reducer"

const store = configureStore({
    reducer:{
        authentication : authenticationReducer,
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch