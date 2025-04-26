import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { DataModel } from './data.state'
import { MusicState, MusicStates } from '../../lib/model'

// #region Initial State
const initialState: DataModel = {
  musicState: MusicStates.STOP,
  duration: 2,
  circles: [
    { notes: [{ sound: 'clap' }, { sound: null }, { sound: 'clap' }, { sound: 'clap' }, { sound: null }] },
    { notes: [{ sound: null }, { sound: 'ball' }, { sound: 'ball' }, { sound: null }, { sound: 'ball' }, { sound: 'ball' }, { sound: null }, { sound: 'ball' }] }
  ]
}
// #endregion

// #region Reducers
const setMusicState: CaseReducer<DataModel, PayloadAction<MusicState>> = (state, action) => {
  state.musicState = action.payload
}
// #endregion

export const DataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setMusicState,
  },
})

export default DataSlice.reducer