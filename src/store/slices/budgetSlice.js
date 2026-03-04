import { createSlice } from "@reduxjs/toolkit"

const budgetSlice = createSlice({
    name: "budgets",
    initialState: [],
    reducers: {
        setBudget: (state, action) => {
            state.push(action.payload);
        },
        resetBudgets: () => {
            return [];
        }
    },
});

export const { setBudget, resetBudgets } = budgetSlice.actions;
export default budgetSlice.reducer; 