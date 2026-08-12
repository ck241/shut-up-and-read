/**
 * ProtectedRoute.jsx
 * Komponente, die den Zugriff auf geschützte Routen basierend auf der Authentifizierung des Benutzers steuert.
 */

import {Navigate, Outlet} from 'react-router-dom';
import useSession from '../hooks/useSession.js';

/**
 * Leitet nicht angemeldete Benutzer zur Anmeldung weiter.
 * @returns {JSX.Element} Geschützte Inhalte oder Weiterleitung zum Login
 */
function ProtectedRoute() {
  // Holt den Authentifizierungsstatus des Benutzers aus dem Session-Hook
  const {isAuthenticated} = useSession();

  // Wenn der Benutzer authentifiziert ist, rendere die geschützten Inhalte (Outlet), andernfalls leite zur Login-Seite weiter
  return isAuthenticated ? <Outlet /> : <Navigate replace to="/auth/login" />;
}

export default ProtectedRoute;
