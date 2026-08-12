/**
 * useEvents.js
 * Hook zum Abrufen von kommenden Events
 */

import {useEffect, useState} from 'react';
import {getUpcomingEvents} from '../api/events.js';

/**
 * Hook zum Abrufen von kommenden Events
 * @returns {{events: Array, isLoading: boolean, error: string}} - Die Event-Daten, Lade-Status und Fehlernachricht
 */
function useEvents() {
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
        const upcomingEvents = await getUpcomingEvents(abortController.signal);

        // Überprüfen, ob der Request nicht abgebrochen wurde, bevor der State aktualisiert wird
        if (!abortController.signal.aborted) {
          setEvents(upcomingEvents);
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
  }, []);

  // Rückgabe der Event-Daten, Lade-Status und Fehlernachricht
  return {events, isLoading, error};
}

export default useEvents;
