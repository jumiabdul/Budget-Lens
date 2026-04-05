import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from "./slices/transactionSlice";
import budgetReducer from "./slices/budgetSlice";
import userReducer from "./slices/userSlice";
import goalReducer from "./slices/goalSlice";

const store = configureStore(
    {
        reducer: {
            transactions: transactionReducer,
            budgets: budgetReducer,
            user: userReducer,
            goals: goalReducer,
        },
    }
);

export default store;
