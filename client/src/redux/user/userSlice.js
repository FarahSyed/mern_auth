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
        changeState: (state, action) => {
            state.error = action.payload;
        },
    }
})

export const { signInStart, signInSuccess, signInFailure, changeState } = userSlice.actions;

export default userSlice.reducer;