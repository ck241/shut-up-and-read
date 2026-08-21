/**
 * useEvent.js
 * Hook zum Abrufen eines einzelnen Events.
 */

import {useEffect, useState} from 'react';
import {getEventById} from '../api/events';

export interface UseEventResult {
  event: Awaited<ReturnType<typeof getEventById>> | null;
  isLoading: boolean;
  error: string;
}

/**
 * Ruft ein Event anhand seiner ID ab und verwaltet Lade- und Fehlerzustände.
 * @param {string} eventId - Die ID des abzurufenden Events
 * @returns {{event: Object|null, isLoading: boolean, error: string}} Event-Daten, Lade-Status und Fehlernachricht
 */
function useEvent(eventId: string | undefined): UseEventResult {
  // State-Variablen für das Event, den Ladezustand und mögliche Fehler
  const [event, setEvent] = useState<UseEventResult['event']>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  // useEffect-Hook, um das Event beim Mounten oder bei Änderungen der eventId zu laden
  useEffect(() => {
    const abortController = new AbortController();

    // Funktion zum Laden des Events
    async function loadEvent() {
      setIsLoading(true);
      setError('');
      setEvent(null);

      // Versuche, das Event von der API abzurufen
      try {
        const loadedEvent = await getEventById(eventId as string, abortController.signal);

        if (!abortController.signal.aborted) {
          setEvent(loadedEvent);
        }
        // Wenn die Anfrage erfolgreich war, setze das Event in den State
      } catch (requestError) {
        if ((requestError as Error).name !== 'AbortError' && !abortController.signal.aborted) {
          setError((requestError as Error).message);
        }
        // Wenn ein Fehler auftritt, setze die Fehlermeldung in den State
      } finally {
        if (!abortController.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadEvent();

    // Cleanup-Funktion, um die Anfrage abzubrechen, wenn die Komponente unmountet oder die eventId sich ändert
    return () => abortController.abort();
  }, [eventId]);

  return {event, isLoading, error};
}

export default useEvent;
