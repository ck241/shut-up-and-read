/**
 * AuthNavigation.jsx
 * Komponente für die Authentifizierungs-Navigation (Anmelden/Abmelden).
 */

import {NavLink, useNavigate} from 'react-router-dom';
import useSession from '../hooks/useSession.js';

/**
 * Rendert die Navigation für An- oder Abmeldung abhängig vom Login-Status.
 * @param {Object} props - Die Eigenschaften der Komponente
 * @param {Function} props.navigationLinkClass - Klassen für Navigationslinks
 * @param {string} props.loginText - Beschriftung für den Login-Link
 * @param {string} props.logoutText - Beschriftung für den Logout-Button
 * @param {string} props.signupText - Beschriftung für den Registrierungs-Link
 * @returns {JSX.Element} Die Authentifizierungs-Navigation
 */
function AuthNavigation({navigationLinkClass, loginText, logoutText, signupText}) {
  const navigate = useNavigate();
  const {isAuthenticated, logout} = useSession();

  // Handler für den Logout-Button
  function handleLogout() {
    logout();
    navigate('/');
  }

  // Wenn der Benutzer authentifiziert ist, zeige den Logout-Button an
  if (isAuthenticated) {
    return (
      <button className="cursor-pointer rounded-full px-3 py-2 text-sm font-bold text-stone-600 transition-colors hover:bg-stone-100 hover:text-red-900" onClick={handleLogout} type="button">
        {logoutText}
      </button>
    );
  }

  // Wenn der Benutzer nicht authentifiziert ist, zeige die Login- und Signup-Links an
  return (
    <>
      <NavLink className={navigationLinkClass} to="/auth/login">
        {loginText}
      </NavLink>
      <NavLink className="inline-flex rounded-full bg-red-900 px-4 py-2 text-sm font-bold text-white transition hover:bg-red-950" to="/auth/signup">
        {signupText}
      </NavLink>
    </>
  );
}

export default AuthNavigation;
