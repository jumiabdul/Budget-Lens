import { createSlice } from "@reduxjs/toolkit"

const budgetSlice = createSlice({
    name: "budgets",
    initialState: [],
    reducers: {
        setBudgets: (state, action) => {
            return action.payload;
        },
        addBudget: (state, action) => {
            state.push(action.payload);
        },
        deleteBudget: (state, action) => {
            return state.filter((t) => t._id !== action.payload)
        },
        editBudget: (state, action) => {
            const index = state.findIndex((b) => b._id === action.payload._id);
            if (index !== -1) state[index] = action.payload;
        },
        resetBudgets: () => {
            return [];
        }
    },
});

export const { setBudgets, addBudget, deleteBudget, editBudget, resetBudgets } = budgetSlice.actions;
export default budgetSlice.reducer; 