import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './todos';
import worksessionReducer from './worksession';

export default configureStore({
  reducer: {
    todos: todosReducer,
    worksession: worksessionReducer
  }
});