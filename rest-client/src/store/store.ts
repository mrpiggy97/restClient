import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./reducer"

const store = configureStore({
    reducer:{
        authentication : authenticationReducer,
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch