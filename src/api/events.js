/**
 * events.js
 * API-Funktionen für Events
 */

// Definiere die Basis-URL der API und den Schlüssel für den Token im lokalen Speicher
const apiBaseUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:3001/api';
const tokenStorageKey = 'user_token';

/**
 * Erstellt ein neues Event über die API.
 * @param {Object} eventData - Die Daten des neuen Events
 * @returns {Promise<Object>} Das von der API erstellte Event
 */
export async function createEvent(eventData) {
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
  const responseData = await response.json().catch(() => null);

  // Überprüfe, ob die Antwort der API erfolgreich war
  if (!response.ok) {
    throw new Error(responseData?.error ?? 'Das Event konnte nicht gespeichert werden.');
  }

  return responseData;
}
