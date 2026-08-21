/**
 * events.js
 * API-Funktionen für Events
 */

// Definiere die Basis-URL der API und den Schlüssel für den Token im lokalen Speicher
const apiBaseUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:3001/api';
const tokenStorageKey = 'user_token';

export interface Event {
  id: string | number;
  title: string;
  description?: string | null;
  date: string;
  location: string;
  latitude?: number | null;
  longitude?: number | null;
}

export interface EventListResponse {
  results: Event[];
  [key: string]: unknown;
}

export type EventInput = Omit<Event, 'id'>;

interface ApiErrorResponse {
  error?: string;
}

type EventListApiResponse = EventListResponse | Event[];
type ApiResponse<T> = T | ApiErrorResponse | null;

/**
 * Ruft eine Event-Liste über den angegebenen API-Pfad ab.
 * @param {string} path - Der API-Pfad für die Event-Liste
 * @param {AbortSignal} signal - Signal zum Abbrechen der Anfrage
 * @returns {Promise<Object|Object[]>} Die Antwort der API
 */
async function fetchEventList<T extends EventListApiResponse>(path: string, signal: AbortSignal): Promise<T> {
  let response;

  // Versuche, die Event-Liste von der API abzurufen
  try {
    response = await fetch(`${apiBaseUrl}${path}`, {signal});
  } catch (networkError) {
    // Wenn der Fehler ein Abbruchfehler ist, wirf ihn weiter
    if ((networkError as Error).name === 'AbortError') {
      throw networkError;
    }

    throw new Error('Die Events-API ist nicht erreichbar. Bitte prüfe, ob der API-Server läuft.', {cause: networkError});
  }

  // Versuche, die JSON-Antwort zu parsen, auch wenn die Antwort kein gültiges JSON ist
  const responseData: ApiResponse<T> = await response.json().catch(() => null);

  // Überprüfe, ob die Antwort der API erfolgreich war
  if (!response.ok) {
    throw new Error((responseData as ApiErrorResponse | null)?.error ?? 'Events konnten nicht geladen werden.');
  }

  return responseData as T;
}

/**
 * Ruft alle Events ab.
 * @param {AbortSignal} signal - Signal zum Abbrechen der Anfrage
 * @returns {Promise<Object>} Die paginierte Antwort der API
 */
export function getEvents(signal: AbortSignal): Promise<EventListResponse> {
  return fetchEventList<EventListResponse>('/events', signal);
}

/**
 * Ruft alle kommenden Events ab.
 * @param {AbortSignal} signal - Signal zum Abbrechen der Anfrage
 * @returns {Promise<Object[]>} Die kommenden Events
 */
export function getUpcomingEvents(signal: AbortSignal): Promise<Event[]> {
  return fetchEventList<Event[]>('/events/upcoming', signal);
}

/**
 * Ruft ein einzelnes Event anhand seiner ID ab.
 * @param {string} eventId - Die ID des Events
 * @param {AbortSignal} signal - Signal zum Abbrechen der Anfrage
 * @returns {Promise<Object>} Das angefragte Event
 */
export async function getEventById(eventId: string, signal: AbortSignal): Promise<Event> {
  let response;

  // Versuche, das Event von der API abzurufen
  try {
    response = await fetch(`${apiBaseUrl}/events/${encodeURIComponent(eventId)}`, {signal});
  } catch (networkError) {
    // Wenn der Fehler ein Abbruchfehler ist, wirf ihn weiter
    if ((networkError as Error).name === 'AbortError') {
      throw networkError;
    }

    throw new Error('Die Events-API ist nicht erreichbar. Bitte prüfe, ob der API-Server läuft.', {cause: networkError});
  }

  // Versuche, die JSON-Antwort zu parsen, auch wenn die Antwort kein gültiges JSON ist
  const responseData: ApiResponse<Event> = await response.json().catch(() => null);

  // Überprüfe, ob die Antwort der API erfolgreich war
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Dieses Event wurde nicht gefunden.');
    }

    throw new Error((responseData as ApiErrorResponse | null)?.error ?? 'Das Event konnte nicht geladen werden.');
  }

  return responseData as Event;
}

/**
 * Erstellt ein neues Event über die API.
 * @param {Object} eventData - Die Daten des neuen Events
 * @returns {Promise<Object>} Das von der API erstellte Event
 */
export async function createEvent(eventData: EventInput): Promise<Event> {
  // Hole den gespeicherten API-Token aus dem lokalen Speicher
  const token = localStorage.getItem(tokenStorageKey);

  // Sende die Event-Daten an die API, um ein neues Event zu erstellen
  const response = await fetch(`${apiBaseUrl}/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? {Authorization: `Bearer ${token}`} : {}),
    },
    body: JSON.stringify(eventData),
  });

  // Versuche, die JSON-Antwort zu parsen, auch wenn die Antwort kein gültiges JSON ist
  const responseData: ApiResponse<Event> = await response.json().catch(() => null);

  // Überprüfe, ob die Antwort der API erfolgreich war
  if (!response.ok) {
    throw new Error((responseData as ApiErrorResponse | null)?.error ?? 'Das Event konnte nicht gespeichert werden.');
  }

  return responseData as Event;
}
