import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './features/todos';

export default configureStore({
  reducer: {
    todos: todosReducer
  }
});