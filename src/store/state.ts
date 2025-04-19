import { AppModel } from './app/app.state'
import { DataModel } from './data/data.state'

export type RootState = {
  app: AppModel,
  data: DataModel,
}