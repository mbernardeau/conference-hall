import React from 'react'
import PropTypes from 'prop-types'

import InputButton from 'components/form/inputButton'

import styles from './betaAccess.module.css'

const BetaAccess = ({ validateAccessKey, error }) => (
  <div className={styles.wrapper}>
    <h1 className={styles.title}>Beta Access key needed</h1>
    <p>The organizer hall is in closed-beta access, you need a key to access it.</p>
    <div className={styles.form}>
      <InputButton
        btnLabel="Access beta"
        type="text"
        placeholder="Please type your beta access key here"
        onClick={validateAccessKey}
      />
    </div>
    <div className={styles.request}>
      <a href="https://forms.gle/AnArRCSHibmG59zw7" target="NEW">
        Request a beta key
      </a>
    </div>
    {error && <div className={styles.error}>{error}</div>}
  </div>
)

BetaAccess.propTypes = {
  validateAccessKey: PropTypes.func.isRequired,
  error: PropTypes.string,
}

BetaAccess.defaultProps = {
  error: undefined,
}

export default BetaAccess
