import { Circle, MusicState } from '../../lib/model'

export interface DataModel {
  musicState: MusicState
  duration: number
  
  circles: Circle[]
  
  circleHovered: string
  circleSelected: string
  circleDraging: CircleDragModel
}

export interface CircleDragModel {
  key: string
  initialAngle: number
}