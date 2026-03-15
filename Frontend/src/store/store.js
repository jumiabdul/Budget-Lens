import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from "./slices/transactionSlice";
import budgetReducer from "./slices/budgetSlice";
import userReducer from "./slices/userSlice";

const store = configureStore(
    {
        reducer: {
            transactions: transactionReducer,
            budgets: budgetReducer,
            user: userReducer,
        },
    }
);

export default store;
