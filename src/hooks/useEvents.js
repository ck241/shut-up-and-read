/**
 * useEvents.js
 * Hook zum Abrufen und Sortieren von Events
 */

import {useEffect, useState} from 'react';
import {getEvents} from '../api/events.js';

/**
 * Funktionaler Hook zum Abrufen und optionalen Sortieren von Events.
 * @param {Function} requestEvents - API-Funktion zum Abrufen der Events
 * @param {boolean} shouldSort - Legt fest, ob die Events nach Datum sortiert werden sollen
 * @returns {{events: Array, isLoading: boolean, error: string}} - Die Event-Daten, Lade-Status und Fehlernachricht
 */
function useEvents(requestEvents = getEvents, shouldSort = true) {
  // State-Variablen für die Event-Daten, Lade-Status und Fehlernachricht
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // useEffect-Hook, um die Events beim Mounten der Komponente zu laden
  useEffect(() => {
    const abortController = new AbortController();

    // Funktion zum Laden der Events
    async function loadEvents() {
      // Setze den Lade-Status auf true und die Fehlermeldung auf leer, bevor der Request gestartet wird
      try {
        const eventsResponse = await requestEvents(abortController.signal);
        const loadedEvents = Array.isArray(eventsResponse) ? eventsResponse : eventsResponse.results;
        const eventsToDisplay = shouldSort ? [...loadedEvents].sort((firstEvent, secondEvent) => new Date(firstEvent.date) - new Date(secondEvent.date)) : loadedEvents;

        // Überprüfen, ob der Request nicht abgebrochen wurde, bevor der State aktualisiert wird
        if (!abortController.signal.aborted) {
          setEvents(eventsToDisplay);
        }
      } catch (requestError) {
        // Fehlerbehandlung: Wenn der Request nicht abgebrochen wurde, setze die Fehlermeldung
        if (requestError.name !== 'AbortError') {
          setError(requestError.message);
        }
      } finally {
        // Setze den Lade-Status auf false, wenn der Request nicht abgebrochen wurde
        if (!abortController.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadEvents();

    // Cleanup-Funktion, um den Request abzubrechen, wenn die Komponente unmountet wird
    return () => abortController.abort();
  }, [requestEvents, shouldSort]);

  // Rückgabe der Event-Daten, Lade-Status und Fehlernachricht
  return {events, isLoading, error};
}

export default useEvents;
