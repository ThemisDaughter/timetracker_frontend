import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL;

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ async thunk for todos fetching ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  try {
    const response = await axios.get(baseURL);
    console.log('axios response in thunk file', response.data)
    return response.data;
  } catch (err) {
    return err.message;
  }
})

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

export const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
    status: 'idle', //| 'loading' | 'succeeded' | 'failed', // Adding a debouncer later to stop loading screeen from appearing if it takes less than .5 seconds to load
    error: null
  },
  reducers: {
    addTodo: {
      reducer(state, action) {
        console.log('payload', action.payload)
        state.todos.push(action.payload);
      }
    },
    deletePost: {
      reducer(state, action) {
        const { id } = action.payload;
       state.todos = state.todos.filter(todo => todo.id !== id)
     }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTodos.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.todos = state.todos.concat(action.payload);
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
    })
  }
})

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ selector functions ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// to keep all logic in one file, according to https://redux.js.org/tutorials/essentials/part-5-async-logic
const selectAllTodos = state => state.todos.todos;
const selectTodoById = (state, todoId) =>
  state.todos.todos.find(todo => todo.id === todoId);

export { selectAllTodos, selectTodoById };
export const { addTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;