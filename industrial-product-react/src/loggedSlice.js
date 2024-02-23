import { createSlice } from "@reduxjs/toolkit";

//application state - logged in status
export const loggedSlice = createSlice({
    name: "user",
    initialState: {
        user:null
    },
    reducers : {
        login: (state,action)=> {
            state.user = action.payload
        },

        logout: (state) => {
            state.user=null;
        }
    }
})
//component actions - useDispatch
export const {login,logout} = loggedSlice.actions;

export const selectUser = (state) => state.user.user;
//will be used in store
export default loggedSlice.reducer;
