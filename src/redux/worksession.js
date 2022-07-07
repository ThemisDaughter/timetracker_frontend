import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL;

export const fetchActiveSession = createAsyncThunk('worksession/fetchActiveSession', async () => {
  try {
    const { data } = await axios.get(`${baseURL}/worksession/active`);
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
    const { data } = await axios.post(`${baseURL}/worksession`, { start_time: sessionstart.start_time, todoID: sessionstart.todoID });
    const [newSession] = data
    return newSession;
  } catch (err) {
    return err.message;
  }
})

export const endWorkSession = createAsyncThunk('worksession/endWorkSession', async sessionend => {
  try {
    const { data } = await axios.patch(`${baseURL}/worksession/${sessionend.sessionID}/end`, { end_time: sessionend.end_time });
    const [response] = data;
    return response;
  } catch (err) {
    return err.message;
  }
})

export const worksessionSlice = createSlice({
  name: 'worksession',
  initialState: {
    activeSession: null,
    completedSession: null,
    todaysSessions: [],
    status: 'idle', //'succeeded', 'failed' are the other options, loading shouldn't make a difference unless connection times out
    error: null
  },
  extraReducers(builder) {
    builder
      .addCase(createNewSession.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.activeSession = action.payload;
      })
      .addCase(createNewSession.rejected, (state, action) => { 
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchActiveSession.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.activeSession = action.payload;
      })
      .addCase(fetchActiveSession.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        console.log(action.payload)
      })
      .addCase(endWorkSession.fulfilled, (state, action) => {
        state.completedSession = action.payload;
        state.status = 'idle';
        state.activeSession = null;
    })
  }
})

export default worksessionSlice.reducer;