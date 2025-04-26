import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UUID } from '@sol.ac/js-utils'

import { DataModel } from './data.state'
import { MusicState, MusicStates } from '../../lib/model'

// #region Initial State
const initialState: DataModel = {
  musicState: MusicStates.STOP,
  duration: 2,
  circles: [
    { key: 'a', notes: [{ sound: 'clap' }, { sound: null }, { sound: 'clap' }, { sound: 'clap' }, { sound: null }] },
    { key: 'b', notes: [{ sound: null }, { sound: 'ball' }, { sound: 'ball' }, { sound: null }, { sound: 'ball' }, { sound: 'ball' }, { sound: null }, { sound: 'ball' }] }
  ],
  circleHovered: null,
  circleHoveredLast: null,
}
// #endregion

// #region Reducers
const addCircle: CaseReducer<DataModel, PayloadAction<void>> = (state, action) => {
  state.circles = [
    { key: UUID.next(), notes: [{ sound: 'clap' }, { sound: null }, { sound: 'clap' }, { sound: 'clap' }, { sound: null }, { sound: 'clap' }, { sound: null }] },
    ...state.circles
  ]
}
const deleteCircle: CaseReducer<DataModel, PayloadAction<number>> = (state, action) => {
  console.log(action.payload)
  const newCircles = state.circles.filter((c, i) => i !== action.payload)
  state.circles = newCircles
}
const setMusicState: CaseReducer<DataModel, PayloadAction<MusicState>> = (state, action) => {
  state.musicState = action.payload
}
const enterCircle: CaseReducer<DataModel, PayloadAction<string>> = (state, action) => {
  state.circleHovered = action.payload
  state.circleHoveredLast = action.payload
}
const leaveCircle: CaseReducer<DataModel, PayloadAction<string>> = (state, action) => {
  if (state.circleHovered === action.payload) {
    state.circleHovered = null
  }
}
// #endregion

export const DataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    addCircle,
    deleteCircle,
    setMusicState,

    enterCircle,
    leaveCircle,
  },
})

export default DataSlice.reducer