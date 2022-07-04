import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [
      {
        title: 'learn blender',
        total_time_planned: 360000,
        total_time_studied: 14400,
        completed: false,
        abandoned: false
      }, {
        title: 'learn redux',
        total_time_planned: 36000,
        total_time_studied: 0,
        completed: false,
        abandoned: false
      }, {
        title: 'read Ray Dalio',
        total_time_planned: 72000,
        total_time_studied: 10800,
        completed: false,
        abandoned: false
      }, 
    ]
  },
  reducers: {
    addTodo: (state, action) => {
      state.todos = [...state.todos, action.payload]
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload.id)
    }
  }
})

export const { addTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;