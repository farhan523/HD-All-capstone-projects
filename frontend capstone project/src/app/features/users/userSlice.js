import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users : [],
    logInUser : {}
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers: {
        addUser:(state,action)=>{
            console.log(action)
            state.users.push(action.payload)
        },
        setLogInUser:(state,action)=>{
            state.logInUser = action.payload
        }
    }
})

export default userSlice.reducer;
export const {addUser , setLogInUser} = userSlice.actions;

