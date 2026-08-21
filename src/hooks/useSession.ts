/**
 * useSession.js
 * React-Hook, der den Authentifizierungsstatus des Benutzers verwaltet und eine Abmeldefunktion bereitstellt.
 */
import {useEffect, useState} from 'react';

// Schlüssel für die Speicherung des Tokens im Local Storage
const userTokenStorageKey = 'user_token';
const authChangeEvent = 'auth-change';

export interface UseSessionResult {
  isAuthenticated: boolean;
  logout: () => void;
}

/**
 * Gibt den aktuellen Authentifizierungsstatus zurück.
 * @returns {boolean} true, wenn der Benutzer authentifiziert ist, sonst false
 */
function getAuthenticationStatus(): boolean {
  return Boolean(localStorage.getItem(userTokenStorageKey));
}

/**
 * Stellt den aktuellen Login-Status und die Abmeldung bereit.
 * @returns {{isAuthenticated: boolean, logout: () => void}} Login-Status und Logout-Funktion
 */
function useSession(): UseSessionResult {
  // Initialisiert den Authentifizierungsstatus basierend auf dem gespeicherten Token
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(getAuthenticationStatus);

  // Synchronisiert den Authentifizierungsstatus, wenn sich der Token ändert oder die Seite neu geladen wird
  useEffect(() => {
    function syncAuthenticationStatus() {
      setIsAuthenticated(getAuthenticationStatus());
    }

    // Fügt Event-Listener hinzu, um den Authentifizierungsstatus bei Änderungen zu synchronisieren
    window.addEventListener(authChangeEvent, syncAuthenticationStatus);
    window.addEventListener('storage', syncAuthenticationStatus);

    // Bereinigt die Event-Listener, wenn die Komponente unmontiert wird
    return () => {
      window.removeEventListener(authChangeEvent, syncAuthenticationStatus);
      window.removeEventListener('storage', syncAuthenticationStatus);
    };
  }, []);

  /**
   * Entfernt den Authentifizierungstoken aus dem Local Storage und aktualisiert den Authentifizierungsstatus.
   * Löst ein benutzerdefiniertes Event aus, um andere Komponenten über die Änderung zu informieren.
   */
  function logout(): void {
    localStorage.removeItem(userTokenStorageKey);
    setIsAuthenticated(false);
    window.dispatchEvent(new Event(authChangeEvent));
  }

  // Gibt den aktuellen Authentifizierungsstatus und die Abmeldefunktion zurück
  return {isAuthenticated, logout};
}

export default useSession;
