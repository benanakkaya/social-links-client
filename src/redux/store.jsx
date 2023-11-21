import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./User/UserSlice";

export const createStore = (preloadedState) => {
    
    const store = configureStore({
        reducer:{
            user: UserSlice
        },
        preloadedState
    })
   
    return store
}

const store = createStore();

export default store
