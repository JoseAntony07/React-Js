import {createSlice} from "@reduxjs/toolkit"


const initialUserInfoState  = {
    users: []
}

export const userSlice = createSlice({
    name: "usersInfoSlice", // slice name
    initialState: initialUserInfoState,
    reducers: {
        setUsers: (state, action) => {
            state.users = [...state.users, action.payload]
        },
        deleteUsers: (state, action) => {
            state.users = state.users.filter((user, index) => index !== action.payload)
        }
    }
})

export const {setUsers, deleteUsers} = userSlice.actions

export default userSlice.reducer
