/**
 * useUpcomingEvents.js
 * Hook zum Abrufen aller kommenden Events.
 */

import {getUpcomingEvents} from '../api/events.js';
import useEvents from './useEvents.js';

/**
 * Ruft alle kommenden Events ab.
 * @returns {{events: Array, isLoading: boolean, error: string}} Die Event-Daten, Lade-Status und Fehlernachricht
 */
function useUpcomingEvents() {
  return useEvents(getUpcomingEvents, false);
}

export default useUpcomingEvents;
