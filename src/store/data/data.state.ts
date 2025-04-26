import { Circle, MusicState } from '../../lib/model'

export interface DataModel {
  musicState: MusicState
  duration: number
  circles: Circle[]
  circleHovered: string
  circleHoveredLast: string
}