import React from 'react'
import { useDispatch } from 'react-redux'
import { DataSlice } from '../../store/data/data.slice'

export interface MusicClockProperties {
}
export const MusicClock = ({
}: MusicClockProperties) => {

  // #region Hooks
  const dispatch = useDispatch()
  // #endregion

  // #region Callbacks
  function handleMouseOver(e: React.MouseEvent<HTMLElement>) {
    e.stopPropagation()
    dispatch(DataSlice.actions.enterCircle(null))
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
