import { Circle } from '../../lib/model'
import { RootState } from '../state'
import { DataModel } from './data.state'

export const base = (state: RootState): DataModel => state.data

export const musicState = (state: RootState) => base(state).musicState
export const duration = (state: RootState): number => base(state).duration
export const circles = (state: RootState): Circle[] => base(state).circles

export const DataSelectors = {
  musicState,
  duration,
  circles
}
