import { createSlice } from '@reduxjs/toolkit'

import { DataModel } from './data.state'

// #region Initial State
const initialState: DataModel = {
  duration: 2,
}
// #endregion

// #region Reducers
// #endregion

export const DataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
  },
})

export default DataSlice.reducer