import {createSlice} from "@reduxjs/toolkit"


const initiaFruitInfoState  = {
    fruits: []
}

export const fruitSlice = createSlice({
    name: "fruitInfoSlice", // slice name
    initialState: initiaFruitInfoState,
    reducers: {
        setFruits: (state, action) => {
            state.fruits = [...state.fruits, action.payload]
        }
    }
})

export const {setFruits} = fruitSlice.actions

export default fruitSlice.reducer
