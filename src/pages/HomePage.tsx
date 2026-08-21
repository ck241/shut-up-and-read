/**
 * HomePage.jsx
 * Startseite der Anwendung
 */

import {Link} from 'react-router-dom';
import headerImage from '../assets/header.webp';
import useSession from '../hooks/useSession.js';
import useEvents from '../hooks/useEvents.js';
import EventCard from '../components/EventCard.jsx';

// Konstanten für den Header-Text und den Button-Text
const headerSmallTitle = 'Gemeinsam lesen';
const headerBigTitle = 'Dein nächstes Kapitel beginnt gemeinsam.';
const headerSubtitle =
  'Finde Lese-Events in deiner Nähe, tausche dich mit anderen \
  Lesebegeisterten aus und entdecke neue Geschichten. Egal ob du ein Buchclub suchst oder \
  einfach nur neue Freunde finden möchtest – bei uns bist du richtig!';
const headerButtonText = 'Jetzt mitmachen';
const headerButtonLink = '/auth/signup';
const upcomingEventsSmallTitle = 'Entdecke neue Geschichten';
const upcomingEventsTitle = 'Die nächsten Events';
const allEventsText = 'Alle Events';
const allEventsLink = '/events';
const loadingEventsText = 'Events werden geladen …';
const noEventsText = 'Es sind aktuell keine Events geplant.';
const errorEventsTitle = 'Events konnten nicht geladen werden.';

/**
 * Funktion zur Darstellung der Startseite
 * @returns {JSX.Element} - Die Startseite der Anwendung
 */
function HomePage() {
  const {isAuthenticated} = useSession();
  const {events, isLoading, error} = useEvents();

  return (
    <div className="relative min-h-screen overflow-hidden bg-stone-50 px-5 py-1 sm:px-8 sm:py-20 lg:px-12">
      <section className="relative mx-auto max-w-6xl">
        <div className="relative isolate overflow-hidden rounded-3xl px-6 py-16 text-white shadow-xl shadow-cyan-950/15 sm:px-10 sm:py-24">
          <img alt="" className="absolute inset-0 -z-20 h-full w-full object-cover object-top-left" src={headerImage} />
          <div className="absolute inset-0 -z-10 bg-linear-to-r from-cyan-950/95 via-cyan-900/80 to-red-950/55" />

          <div className="max-w-2xl">
            <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-sky-300">{headerSmallTitle}</p>
            <h1 className="mt-3 text-5xl font-black tracking-tight sm:text-6xl">{headerBigTitle}</h1>
            <p className="mt-6 text-lg leading-8 text-stone-200">{headerSubtitle}</p>
            {!isAuthenticated && (
              <Link
                className="mt-9 inline-block rounded-full bg-white/90 px-6 py-3 font-bold text-cyan-900 shadow-lg transition duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-xl"
                to={headerButtonLink}
              >
                {headerButtonText}
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="relative mx-auto mt-16 max-w-6xl pb-12 sm:mt-20">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-cyan-900">{upcomingEventsSmallTitle}</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-red-950 sm:text-4xl">{upcomingEventsTitle}</h2>
          </div>
          <Link className="inline-flex w-fit rounded-full border border-cyan-900/15 bg-white px-5 py-3 font-bold text-cyan-900 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-900/30 hover:shadow-lg" to={allEventsLink}>
            {allEventsText}
          </Link>
        </div>

        {isLoading ? (
          <p className="mt-8 text-stone-600">{loadingEventsText}</p>
        ) : error ? (
          <div className="mt-8 rounded-2xl border border-red-900/15 bg-red-900/5 p-6 text-red-950" role="alert">
            <p className="font-black">{errorEventsTitle}</p>
            <p className="mt-1 leading-6">{error}</p>
          </div>
        ) : events.length === 0 ? (
          <p className="mt-8 rounded-2xl border border-red-950/10 bg-white/80 p-6 text-stone-600 shadow-sm">{noEventsText}</p>
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

export default HomePage;
