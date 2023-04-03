import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todosList: [
    {
      _id: -1,
      todo: "Go to the store today",
      descr: "Go to the store and buy: carrots, potatoes, beets. Don't forget about cucumbers!!!",
      category: "Personal",
    },
    {
      _id: -2,
      todo: "IMPORTANT: Withdraw money from ATM",
      descr: "Find the nearest ATM and withdraw about a thousand dollars",
      category: "Personal",
    },
    {
      _id: -3,
      todo: "Pick up the cat from the vet",
      descr: "Pick up Tom the cat from the vet, check how he's feeling, if he feels good - play with him.",
      category: "Personal",
    },
    {
      _id: -3,
      todo: "DEADLINE: Submit project by 8pm",
      descr: "Polish the project, refine the code, check for bugs, conduct unit tests, and submit the project to production.",
      category: "Business",
    },
  ],
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodos: (state, action) => {
      state.todosList.push(action.payload);
    },
    deleteSingleTodos: (state, action) => {
      state.todosList = state.todosList.filter(
        (item) => item._id !== action.payload
      );
    },
    deleteAllTodos: (state) => {
      state.todosList = [];
    },
  },
});

export const { addTodos, deleteSingleTodos, deleteAllTodos } =
  todoSlice.actions;
export default todoSlice.reducer;
