import { createSlice } from "@reduxjs/toolkit"

const transactionSlice = createSlice({
    name: "transactions",
    initialState: [],
    reducers: {
        addTransaction: (state, action) => {
            state.push(action.payload);
        },
        deleteTransaction: (state, action) => {
            return state.filter((t) => t.id !== action.payload)
        },
        resetTransactions: () =>{
            return [];
        }
    },
});

export const { addTransaction, deleteTransaction, resetTransactions } = transactionSlice.actions;
export default transactionSlice.reducer; 