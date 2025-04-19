import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useAudio } from '@sol.ac/games-common'

import { DataSelectors } from '../../store/data/data.selectors'
import { CONFIG } from '../../config'

export interface MusicCircleNoteProperties {
  active: boolean
  period: number
  position: number
}
export const MusicCircleNote = ({
  active,
  period,
  position
}: MusicCircleNoteProperties) => {

  // #region Hooks
  const duration = useSelector(DataSelectors.duration)
  const sound = useAudio([
    `${CONFIG.AP_MATHEMUSIK_PUBLIC}/sound/clap.mp3`,
  ])
  const [rotate, setRotate] = useState(0)
  const [delay, setDelay] = useState(0)
  useEffect(() => {
    setRotate(360 * position / period)
    const newDelay = duration * position / period
    setDelay(newDelay)

    if (active) {
      console.log('delay', newDelay * 1000, 'period', period * 1000, 'duration', duration * 1000)
      setTimeout(() => {
        console.log('sound')
        sound.stop()
        sound.play()
      }, newDelay*1000)
      const soundInterval = setInterval(() => {
        setTimeout(() => {
          console.log('sound')
          sound.stop()
          sound.play()
        }, newDelay*1000)
      }, duration*1000)
  
      return () => clearInterval(soundInterval)
    }
  }, [duration])
  // #endregion

  // #region Callbacks
  // #endregion

  // #region Rendering
  const classes = ['ap-music-circle-inner']
  if (active) {
    classes.push('ap-music-circle-inner--active')
  }
  return (
    <div
      className={classes.join(' ')}
      style={{
        transform: `rotate(${rotate}deg)`,
        // @ts-ignore
        '--ap-music-delay': `${delay}s`
      }}
    >
      <div className='ap-music-circle-inner-note'>
      </div>
    </div>
  )
  // #endregion
}
