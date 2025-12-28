import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from "./slices/transactionSlice";
import budgetReducer from "./slices/budgetSlice"

const store = configureStore(
    {
        reducer: {
            transactions: transactionReducer,
            budgets: budgetReducer,

        },
    }
);

export default store;
