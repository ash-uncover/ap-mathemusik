import { MusicState } from '../../lib/model'

export type AppLoadStatus =
  'NONE' |
  'LOADING' |
  'READY' |
  'STARTED'

export const AppLoadStatuses: {
  NONE: AppLoadStatus
  LOADING: AppLoadStatus
  READY: AppLoadStatus
  STARTED: AppLoadStatus
} = {
  NONE: 'NONE',
  LOADING: 'LOADING',
  READY: 'READY',
  STARTED: 'STARTED',
}

export interface AppModel {
  embedded: boolean
  language: string
  loadStatus: AppLoadStatus
}