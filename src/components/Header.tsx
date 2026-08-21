/**
 * Header.jsx
 * Darstellung der Kopfzeile der Anwendung mit Navigationselementen
 */

import {Link, NavLink} from 'react-router-dom';
import logo from '../assets/logo.svg';
import AuthNavigation from './AuthNavigation.jsx';

// Konstanten für die Navigationstexte
const homepage = 'Startseite';
const events = 'Events';
const login = 'Login';
const logout = 'Logout';
const signup = 'Registrieren';

// Funktion zur Bestimmung der CSS-Klassen für die Navigationslinks basierend auf dem aktiven Zustand
const navigationLinkClass = ({isActive}) =>
  `rounded-full px-3 py-2 text-sm font-bold transition-colors ${isActive ? 'bg-cyan-900/10 text-cyan-900' : 'text-stone-600 hover:bg-stone-100 hover:text-red-900'}`;

/**
 * Navigationskomponente für die Kopfzeile der Anwendung.
 * @returns {JSX.Element} Der Header der Anwendung mit Navigationselementen.
 */
function Header() {
  return (
    <header className="relative z-20 bg-stone-50 px-5 pt-5 sm:px-8 sm:pt-8 lg:px-12">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 rounded-2xl border border-red-950/10 bg-white/80 px-3 py-2 shadow-lg shadow-cyan-950/5 backdrop-blur-sm sm:px-4">
        <nav aria-label="Hauptnavigation" className="flex shrink-0 items-center gap-1">
          <NavLink className={navigationLinkClass} to="/">
            {homepage}
          </NavLink>
          <NavLink className={navigationLinkClass} to="/events">
            {events}
          </NavLink>
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-3">
          <AuthNavigation loginText={login} logoutText={logout} navigationLinkClass={navigationLinkClass} signupText={signup} />
          <Link className="ml-1 w-24 rounded-xl bg-white/70 p-2 sm:ml-2 sm:w-32" to="/">
            <img alt="Shut Up and Read" className="h-auto w-full" src={logo} />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
