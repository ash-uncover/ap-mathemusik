import { RootState } from '../state'
import { DataModel } from './data.state'

export const base = (state: RootState): DataModel => state.data

export const duration = (state: RootState): number => base(state).duration

export const DataSelectors = {
  duration
}
