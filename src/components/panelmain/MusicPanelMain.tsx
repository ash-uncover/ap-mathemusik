import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { MusicStates } from '../../lib/model'
import { DataSelectors } from '../../store/data/data.selectors'
import { DataSlice } from '../../store/data/data.slice'
import { MusicPanelMainCircle } from './MusicPanelMainCircle'

export interface MusicPanelMainProperties {
  className: string
}
export const MusicPanelMain = ({
  className,
}: MusicPanelMainProperties) => {

  // #region Hooks
  const dispatch = useDispatch()
  const musicState = useSelector(DataSelectors.musicState)
  const circles = useSelector(DataSelectors.circles)
  const duration = useSelector(DataSelectors.duration)
  // #endregion

  // #region Callbacks
  function handleInputDurationChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = !Number.isNaN(e.target.valueAsNumber) ? e.target.valueAsNumber : 0;
    dispatch(DataSlice.actions.setDuration(value))
  }
  function handleButtonAddClick() {
    dispatch(DataSlice.actions.addCircle())
  }
  // #endregion

  // #region Rendering
  const classes = ['ap-music-panel-main']
  if (className) {
    classes.push(className)
  }
  return (
    <div
      className={classes.join(' ')}
    >
      <div>
        <h4>Cycle</h4>
        <input
          value={duration}
          type='number'
          onChange={handleInputDurationChange}
          disabled={musicState === MusicStates.PLAY}
        />
        <h4>Circles</h4>
        <button
          onClick={handleButtonAddClick}
          disabled={musicState === MusicStates.PLAY}
        >
          Add Circle
        </button>
        <ul>
          {circles.map((circle, index) => {
            return (
              <MusicPanelMainCircle
                key={circle.key}
                index={index}
              />
            )
          })}
        </ul>
      </div>

    </div>
  )
  // #endregion
}
