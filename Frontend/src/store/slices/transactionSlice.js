import { createSlice } from "@reduxjs/toolkit"

const transactionSlice = createSlice({
    name: "transactions",
    initialState: [],
    reducers: {
        setTransactions: (state, action) => {
            return action.payload;
        },
        addTransaction: (state, action) => {
            state.push(action.payload);
        },
        deleteTransaction: (state, action) => {
            return state.filter((t) => t._id !== action.payload)
        },
        editTransaction: (state, action) => {
            const index = state.findIndex((t) => t._id === action.payload._id);
            if (index !== -1) state[index] = action.payload;
        },
        resetTransactions: () => {
            return [];
        }
    },
});

export const { setTransactions, addTransaction, deleteTransaction, editTransaction, resetTransactions } = transactionSlice.actions;
export default transactionSlice.reducer; 