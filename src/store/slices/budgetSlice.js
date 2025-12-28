import { createSlice } from "@reduxjs/toolkit"

const budgetSlice = createSlice({
    name: "budgets",
    initialState: [],
    reducers: {
        setBudget: (state, action) => {
            state.push(action.payload);
        },
    },
});

export const { setBudget } = budgetSlice.actions;
export default budgetSlice.reducer; 