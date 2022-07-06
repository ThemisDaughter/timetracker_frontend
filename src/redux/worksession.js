import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL;

export const fetchActiveSession = createAsyncThunk('worksession/fetchActiveSession', async () => {
  try {
    const { data } = await axios.get(`${baseURL}/worksession/active`);
    console.log('fetching session')
    console.log('session should be ', data)
    if (data.length) {
      const [session] = data;
      return session;
    }
  } catch (err) {
    return err.message
  }
})

export const createNewSession = createAsyncThunk('worksession/createNewSession', async sessionstart => {
  try {
    const response = await axios.post(`${baseURL}/worksession`, { start_time: sessionstart.start_time, todoID: sessionstart.todoID });
    console.log('createNewSession async thunk running');
    console.log('async thunk response', response.data)
    return response.data;
  } catch (err) {
    return err.message;
  }
})

export const worksessionSlice = createSlice({
  name: 'worksession',
  initialState: {
    activeSession: null,
    status: 'idle', //'succeed', 'failed' are the other options, loading shouldn't make a difference unless connection times out
    error: null
  },
  // do I need the reducer? Short answer: no. Long answer: ??? 
  reducers: {
    createSession: {
      reducer(state, action) {
        console.log('creeateSessionreducer running')
        const [response] = action.payload;
        state.session = response;
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(createNewSession.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const [session] = action.payload;
        state.activeSession = session;
      })
      .addCase(createNewSession.rejected, (state, action) => { 
        state.status = 'failed';
        state.error = action.error.message
      })
      .addCase(fetchActiveSession.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log(action.payload);
        state.activeSession = action.payload;
      })
      .addCase(fetchActiveSession.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        console.log(action.payload)
    })
  }
})

export default worksessionSlice.reducer;