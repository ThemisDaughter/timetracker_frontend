import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL;

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ async thunk functions ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  try {
    const response = await axios.get(baseURL);
    console.log('axios response in thunk file', response.data)
    return response.data;
  } catch (err) {
    return err.message;
  }
})

export const addNewTodo = createAsyncThunk('todos/addNewTodo', async initialData => {
  try {
    const response = await axios.post(baseURL, { title: initialData.title, minutes: initialData.minutes });
    return response.data;
  } catch (err) {
    return err.message;
  }
})
export const updateCompletedTime = createAsyncThunk('todos/updateCompletedTime', async wsData => {
  try {
    const timeDiff = new Date(wsData.end_time) - new Date(wsData.start_time);
    console.log('todos received that as the time difference: ', timeDiff, 'that abou right?', `${baseURL}/todo/${wsData.todoID}/${timeDiff}`)
    const response = await axios.patch(`${baseURL}/todo/${wsData.todoID}/${timeDiff}`);
    return response.data
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
    postStatus: 'idle', // |'loading' | 'succeeded' | failed
    error: null
  },
  reducers:{
    deleteTodo: {
      reducer(state, action) {
        const [{ id }] = action.payload;
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
      .addCase(addNewTodo.pending, (state) => {
        state.postStatus = 'loading';
      })
      .addCase(addNewTodo.fulfilled, (state, action) => {
        state.postStatus = 'succeeded';
        const [newTodo] = action.payload;
        console.log('in the addCase, pushing ', JSON.stringify(action.payload) + ' into ' + JSON.stringify(state.todos))
      state.todos.push(newTodo)
      })
      .addCase(addNewTodo.rejected, (state) => {
        state.postStatus = 'failed';
      })
      .addCase(updateCompletedTime.fulfilled, (state, action) => {
        console.log(action.payload)
    })
    }
})

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ selector functions ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// to keep all logic in one file, according to https://redux.js.org/tutorials/essentials/part-5-async-logic


const selectTodoById = (state, todoId) =>
  state.todos.todos.find(todo => todo.id === todoId);

export { selectTodoById };
  
export const { deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;