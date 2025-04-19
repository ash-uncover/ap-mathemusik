import {
  CaseReducer,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'

import { AppModel, AppLoadStatus, AppLoadStatuses } from './app.state'

// #region State
const initialState: AppModel = {
  embedded: false,
  language: 'fr',
  loadStatus: AppLoadStatuses.NONE,
}
// #endregion

// #region Reducers
interface PayloadEmbedded {
  embedded: boolean
}
const setEmbedded: CaseReducer<AppModel, PayloadAction<PayloadEmbedded>> = (state, action) => {
  const {
    embedded
  } = action.payload
  state.embedded = embedded
}
const setLanguage: CaseReducer<AppModel, PayloadAction<string>> = (state, action) => {
  state.language = action.payload
}
const setLoadStatus: CaseReducer<AppModel, PayloadAction<AppLoadStatus>> = (state, action) => {
  state.loadStatus = action.payload
}
// #endregion

// #region Slice
export const AppSlice = createSlice({
  name: 'app',
  initialState,

  reducers: {
    setLanguage,
    setEmbedded,
    setLoadStatus,
  },
})
// #endregion

export default AppSlice.reducer
