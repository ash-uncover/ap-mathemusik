import React from 'react'
import { CONFIG } from '../config'

export const AppHeader = () => {

  // #region Hooks
  // #endregion

  // #region Callbacks
  // #endregion

  // #region Rendering
  const classes = ['ap-app-header']

  return (
    <header className={classes.join(' ')}>
      <img
        height='90%'
        src={`${CONFIG.AP_MATHEMUSIK_PUBLIC}/logo.png`}
      />
      <span
        style={{ marginTop: '0.25rem' }}
      >
        US Conflans - Basket-ball
      </span>
      <img
        height='90%'
        src={`${CONFIG.AP_MATHEMUSIK_PUBLIC}/logo.png`}
      />
    </header>
  )
  // #endregion
}
