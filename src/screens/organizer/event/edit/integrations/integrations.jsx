import React from 'react'
import PropTypes from 'prop-types'
import { forRoute } from '@k-redux-router/react-k-ramel'

import Slack from './slack'
import Api from './api'

const IntegrationsForm = ({ eventId }) => (
  <>
    <Slack eventId={eventId} />
    <Api eventId={eventId} />
  </>
)

IntegrationsForm.propTypes = {
  eventId: PropTypes.string.isRequired,
}

export default forRoute.absolute('organizer-event-edit-integrations')(IntegrationsForm)
