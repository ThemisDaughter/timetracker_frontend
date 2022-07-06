import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL;

export const createNewSession = createAsyncThunk('worksession/createNewSession', async sessionstart => {
  try {
    const response = await axios.post(`${baseURL}/worksession`, { start_time: sessionstart });
    console.log('createNewSession async thunk running')
    return response.data;
  } catch (err) {
    return err.message;
  }
})

export const worksessionSlice = createSlice({
  name: 'worksession',
  initialState: {
    session: null,
    status: 'idle', //'succeede', 'failed' are the other options, loading shouldn't make a difference unless connection times out
    error: null
  },
  // do I need the reducer?
  reducers: {
    // createSession: {
    //   reducer(state, action) {
    //     console.log('creeateSessionreducer running')
    //     const [response] = action.payload;
    //     state.session = response;
    //   }
    // }
  },
  extraReducers(builder) {
    builder
      .addCase(createNewSession.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const [activeSession] = action.payload;
        console.log('acitve session', activeSession)
        state.session = activeSession;
      })
      .addCase(createNewSession.rejected, (state, action) => { 
        state.status = 'failed';
        state.error = action.error.message
      })
  }
})

export default worksessionSlice.reducer;