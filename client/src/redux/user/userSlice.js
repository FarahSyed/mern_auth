import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: "",
    loading: "",
    error: "",
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
        },
        signInFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateUserStart: (state) => {
            state.loading = true;
        },
        updateUserSuccess: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
        },
        updateUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
        deleteUserStart: (state) => {
            state.loading = true;
        },
        deleteUserSuccess: (state) => {
            state.loading = false;
            state.currentUser = null;
        },
        deleteUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
        signOutStart: (state) => {
            state.loading = false;
        },
        signOutSuccess: (state) => {
            state.loading = false;
            state.error = false;
            state.currentUser = null;
        },
        signOutFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        changeState: (state, action) => {
            state.error = action.payload;
        },
    }
})

export const { 
    signInStart, signInSuccess, signInFailure, 
    updateUserStart, updateUserSuccess, updateUserFailure, 
    deleteUserStart, deleteUserSuccess, deleteUserFailure, 
    signOutStart, signOutSuccess, signOutFailure, 
    changeState 
} = userSlice.actions;

export default userSlice.reducer;