/**
 * EventPage.jsx
 * Rendert die Event-Seite der Anwendung, auf der Benutzer anstehende
 * Lese-Events finden und hinzufügen können.
 */

import {Link} from 'react-router-dom';
import EventCard from '../components/EventCard.jsx';
import useUpcomingEvents from '../hooks/useUpcomingEvents.js';
import useSession from '../hooks/useSession.js';
import eventHeaderImage from '../assets/header_events.webp';

// String-Konstanten für die Event-Seite
const headerSmallTitle = 'Gemeinsam lesen';
const headerBigTitle = 'Deine nächsten Events.';
const headerSubtitle = 'Finde einen Ort für dein Buch, neue Perspektiven und Menschen, die Geschichten genauso lieben wie du.';
const addEventButtonText = 'Event hinzufügen';
const signupButtonText = 'Jetzt mitmachen';
const addEventButtonLink = '/events/new';
const signupButtonLink = '/auth/signup';
const upcomingEventsText = 'anstehende Events';
const loadingEventsText = 'Events werden geladen …';
const noEventsText = 'Es sind aktuell keine Events geplant.';
const errorEventsTitle = 'Events konnten nicht geladen werden.';

/**
 * Funktion zur Darstellung der Event-Seite
 * @returns {JSX.Element} - Die Event-Seite der Anwendung
 */
function EventPage() {
  // Verwenden des Hooks useUpcomingEvents, um die kommenden Event-Daten zu laden
  const {events, isLoading, error} = useUpcomingEvents();
  const {isAuthenticated} = useSession();
  const headerButtonText = isAuthenticated ? addEventButtonText : signupButtonText;
  const headerButtonLink = isAuthenticated ? addEventButtonLink : signupButtonLink;

  return (
    <div className="relative min-h-screen overflow-hidden bg-stone-50 px-5 py-12 text-red-950 sm:px-8 sm:py-20 lg:px-12">
      <section className="relative mx-auto max-w-6xl">
        <div className="relative isolate overflow-hidden rounded-3xl px-6 py-12 text-white shadow-xl shadow-cyan-950/15 sm:px-10 sm:py-14">
          <img alt="Lesende Menschen bei einem Event" className="absolute inset-0 -z-20 h-full w-full object-cover object-top-left" src={eventHeaderImage} />
          <div className="absolute inset-0 -z-10 bg-linear-to-r from-cyan-950/95 via-cyan-900/80 to-red-950/55" />

          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-sky-300">{headerSmallTitle}</p>
              <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">{headerBigTitle}</h1>
              <p className="mt-5 text-lg leading-8 text-stone-200">{headerSubtitle}</p>
            </div>

            <Link
              className="inline-flex w-fit items-center gap-2 rounded-full bg-white/90 px-5 py-3 font-bold text-cyan-900 shadow-lg transition duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-xl"
              to={headerButtonLink}
            >
              {isAuthenticated && (
                <span aria-hidden="true" className="text-lg leading-none">
                  +
                </span>
              )}
              {headerButtonText}
            </Link>
          </div>
        </div>

        <div className="mt-7 flex items-center justify-between gap-4 text-sm">
          <p className="font-semibold text-stone-600">
            <span className="font-black text-red-900">{events.length}</span> {upcomingEventsText}
          </p>
        </div>

        {isLoading ? (
          <p className="mt-10 text-stone-600">{loadingEventsText}</p>
        ) : error ? (
          <div className="mt-10 rounded-2xl border border-red-900/15 bg-red-900/5 p-6 text-red-950" role="alert">
            <p className="font-black">{errorEventsTitle}</p>
            <p className="mt-1 leading-6">{error}</p>
          </div>
        ) : events.length === 0 ? (
          <p className="mt-10 rounded-2xl border border-red-950/10 bg-white/80 p-6 text-stone-600 shadow-sm">{noEventsText}</p>
        ) : (
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {events.map((event) => (
              <EventCard event={event} key={event.id} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default EventPage;
