import { Circle } from '../../lib/model'
import { RootState } from '../state'
import { DataModel } from './data.state'

export const base = (state: RootState): DataModel => state.data

export const musicState = (state: RootState) => base(state).musicState
export const duration = (state: RootState) => base(state).duration
export const circles = (state: RootState) => base(state).circles
export const circleByKey = (key: string) => (state: RootState) => base(state).circles.find(c => c.key === key)
export const circleByIndex = (index: number) => (state: RootState) => base(state).circles[index]
export const circleHovered = (state: RootState) => base(state).circleHovered

export const DataSelectors = {
  musicState,
  duration,
  circles,
  circleByIndex,
  circleByKey,
  circleHovered,
}
