import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        setUser: (state, action) => {
            return action.payload;
        },
        resetUser: () => {
            return null;
        },
        setPremium: (state) => {
            if (state) state.isPremium = true;
        },
    }
});

export const { setUser, resetUser, setPremium } = userSlice.actions;
export default userSlice.reducer;
