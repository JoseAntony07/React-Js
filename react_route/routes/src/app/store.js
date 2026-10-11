import {configureStore} from "@reduxjs/toolkit"
import userInfoReducer from "../slices/userSlice"
import fruitReducer from "../slices/fruitSlice"

const store = configureStore({
    // store
    reducer: {
        userInfo: userInfoReducer,
        fruitInfo: fruitReducer
    }
})


export default store
