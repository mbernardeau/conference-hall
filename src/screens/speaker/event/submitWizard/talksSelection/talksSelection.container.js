import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import loader from 'components/loader'
import TalksSelection from './talksSelection'

const mapStore = (store, { eventId }) => {
  const talks = store.ui.speaker.myTalks.getAsArray().filter((talk) => !talk.archived)

  return {
    loaded: store.ui.speaker.myTalks.isInitialized(),
    talks,
    load: () => store.dispatch('@@ui/ON_LOAD_SPEAKER_TALKS'),
    onSelect: (talkId) => {
      store.dispatch({ type: '@@ui/GO_TO_EVENT_SUBMISSION', payload: { eventId, talkId } })
    },
  }
}

export default compose(inject(mapStore), loader)(TalksSelection)
