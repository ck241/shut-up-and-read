/**
 * useUpcomingEvents.js
 * Hook zum Abrufen aller kommenden Events.
 */

import {getUpcomingEvents} from '../api/events';
import useEvents from './useEvents';

export type UseUpcomingEventsResult = ReturnType<typeof useEvents>;

/**
 * Ruft alle kommenden Events ab.
 * @returns {{events: Array, isLoading: boolean, error: string}} Die Event-Daten, Lade-Status und Fehlernachricht
 */
function useUpcomingEvents(): UseUpcomingEventsResult {
  return useEvents(getUpcomingEvents, false);
}

export default useUpcomingEvents;
