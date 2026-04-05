import { createSlice } from "@reduxjs/toolkit"

const goalSlice = createSlice({
    name: "goals",
    initialState: [],
    reducers: {
        setGoals: (state, action) => {
            return action.payload;
        },
        addGoal: (state, action) => {
            state.push(action.payload);
        },
        deleteGoal: (state, action) => {
            return state.filter((t) => t._id !== action.payload)
        },
        editGoal: (state, action) => {
            const index = state.findIndex((b) => b._id === action.payload._id);
            if (index !== -1) state[index] = action.payload;
        },
        resetGoals: () => {
            return [];
        }
    },
});

export const { setGoals, addGoal, deleteGoal, editGoal, resetGoals } = goalSlice.actions;
export default goalSlice.reducer; 