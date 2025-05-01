import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DataSlice } from '../../store/data/data.slice'
import { DataSelectors } from '../../store/data/data.selectors'

export interface MusicClockProperties {
}
export const MusicClock = ({
}: MusicClockProperties) => {

  // #region Hooks
  const dispatch = useDispatch()
  const circleDraging = useSelector(DataSelectors.circleDraging)
  // #endregion

  // #region Callbacks
  function handleMouseOver(e: React.MouseEvent<HTMLElement>) {
    e.stopPropagation()
    if (!circleDraging) {
      dispatch(DataSlice.actions.enterCircle(null))
    }
  }
  // #endregion

  // #region Rendering
  const classes = ['ap-music-clock']
  return (
    <div
      className={classes.join(' ')}
      onMouseOver={handleMouseOver}
    >
      <div className='ap-music-clock-inner' />
    </div>
  )
  // #endregion
}
