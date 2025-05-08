import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UUID } from '@sol.ac/js-utils'

import { CircleDragModel, DataModel } from './data.state'
import { MusicState, MusicStates } from '../../lib/model'

// #region Initial State
const initialState: DataModel = {
  musicState: MusicStates.STOP,
  duration: 2,
  circles: [
    { key: 'a', defaultNote: 'clap', rotate: 0, notes: [{ sound: 'clap' }, { sound: 'null' }, { sound: 'clap' }, { sound: 'clap' }, { sound: 'null' }] },
    { key: 'b', defaultNote: 'ball', rotate: 0, notes: [{ sound: 'null' }, { sound: 'ball' }, { sound: 'ball' }, { sound: 'null' }, { sound: 'ball' }, { sound: 'ball' }, { sound: 'null' }, { sound: 'ball' }] }
  ],
  circleHovered: null,
  circleDraging: null,
  circleSelected: null,
}
// #endregion

// #region Reducers
const setDuration: CaseReducer<DataModel, PayloadAction<number>> = (state, action) => {
  state.duration = action.payload
}
const addCircle: CaseReducer<DataModel, PayloadAction<void>> = (state, action) => {
  state.circles = [
    { key: UUID.next(), defaultNote: 'clap', rotate: 0, notes: [{ sound: 'clap' }, { sound: 'null' }, { sound: 'clap' }, { sound: 'clap' }, { sound: 'null' }, { sound: 'clap' }, { sound: 'null' }] },
    ...state.circles
  ]
}
export interface CircleRotatePayload {
  key: string
  rotate: number
}
const updateCircleRotate: CaseReducer<DataModel, PayloadAction<CircleRotatePayload>> = (state, action) => {
  const circleIndex = state.circles.findIndex(c => c.key === action.payload.key)
  if (circleIndex > -1) {
    const circle = {
      ...state.circles[circleIndex],
      rotate: action.payload.rotate
    }
    const circles = [...state.circles]
    circles[circleIndex] = circle
    state.circles = circles
  }
}
const deleteCircle: CaseReducer<DataModel, PayloadAction<number>> = (state, action) => {
  const newCircles = state.circles.filter((c, i) => i !== action.payload)
  state.circles = newCircles
}
const setMusicState: CaseReducer<DataModel, PayloadAction<MusicState>> = (state, action) => {
  state.musicState = action.payload
}
const selectCircle: CaseReducer<DataModel, PayloadAction<string>> = (state, action) => {
  state.circleSelected = action.payload
}
const enterCircle: CaseReducer<DataModel, PayloadAction<string>> = (state, action) => {
  state.circleHovered = action.payload
}
const leaveCircle: CaseReducer<DataModel, PayloadAction<string>> = (state, action) => {
  if (state.circleHovered === action.payload) {
    state.circleHovered = null
  }
}
const dragCircleStart: CaseReducer<DataModel, PayloadAction<CircleDragModel>> = (state, action) => {
  state.circleDraging = action.payload
  state.circleSelected = action.payload.key
}
const dragCircleStop: CaseReducer<DataModel, PayloadAction<string>> = (state, action) => {
  state.circleDraging = null
}
// #endregion

export const DataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setDuration,

    addCircle,
    updateCircleRotate,
    deleteCircle,
    setMusicState,

    enterCircle,
    leaveCircle,
    selectCircle,
    dragCircleStart,
    dragCircleStop,
  },
})

export default DataSlice.reducer