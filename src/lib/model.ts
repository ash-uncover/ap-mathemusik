

export type MusicState =
  | 'STOP'
  | 'PLAY'
export const MusicStates: {
  STOP: MusicState
  PLAY: MusicState
} = {
  STOP: 'STOP',
  PLAY: 'PLAY',
}

export interface Circle {
  key: string
  notes: Note[]
}
export interface Note {
  sound: string | null
}