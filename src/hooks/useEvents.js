/**
 * useEvents.js
 * Hook zum Abrufen von Events
 */

import dummyEventsResponse from '../data/dummyEvents.js'


/**
 * Hook zum Abrufen Dummy-Events
 * @returns {Object} - Enthält die Events, den Ladezustand und die Paginierungsinformationen
 */
function useEvents() {
  return { events: dummyEventsResponse.results, isLoading: false, pagination: dummyEventsResponse }
}

export default useEvents
