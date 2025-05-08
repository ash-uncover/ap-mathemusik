import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Slider } from '@sol.ac/games-common'

import { DataSelectors } from '../../store/data/data.selectors'
import { DataSlice } from '../../store/data/data.slice'

export interface MusicPanelDetailsProperties {
  className: string
}
export const MusicPanelDetails = ({
  className,
}: MusicPanelDetailsProperties) => {

  // #region Hooks
  const dispatch = useDispatch()
  const circleSelected = useSelector(DataSelectors.circleSelected)
  const circle = useSelector(DataSelectors.circleByKey(circleSelected))
  // #endregion

  // #region Callbacks
  function onSliderRotationChange(rotate: number) {
    dispatch(DataSlice.actions.updateCircleRotate({
      key: circle.key,
      rotate
    }))
  }
  // #endregion

  // #region Rendering
  const classes = ['ap-music-panel-details']
  if (className) {
    classes.push(className)
  }
  if (circle) {
    return (
      <div
        className={classes.join(' ')}
      >
        <div>{circle.key}</div>
        <Slider
          label='Rotate'
          min={0}
          max={360}
          value={Math.round(circle.rotate)}
          onChange={onSliderRotationChange}
        ></Slider>
        <ul>
          {circle.notes.map((note, index) => {
            return (
              <li
                key={`ap-music-panel-details-circle-${circle.key}-note-${index}`}
              >
                {note.sound || '-'}
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
  return (
    <div
      className={classes.join(' ')}
    >
      Select a circle
    </div>
  )
  // #endregion
}
