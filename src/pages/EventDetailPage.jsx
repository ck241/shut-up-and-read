/**
 * EventDetailPage.jsx
 * Darstellung eines einzelnen Events anhand seiner ID.
 */

import {Link, useParams} from 'react-router-dom';
import eventHeaderImage from '../assets/header_events.webp';
import useEvent from '../hooks/useEvent.js';

// Konstanten für die Texte auf der Event-Detailseite
const eventsLink = '/events';
const backToEventsText = '<- Zurück zu den Events';
const headerSmallTitle = 'Event-Details';
const loadingTitle = 'Event wird geladen …';
const loadingText = 'Einen kleinen Moment – die Details werden abgerufen.';
const errorTitle = 'Event konnte nicht geladen werden';
const descriptionTitle = 'Über dieses Event';
const noDescriptionText = 'Für dieses Event wurde noch keine Beschreibung hinterlegt.';
const dateLabel = 'Datum';
const timeLabel = 'Uhrzeit';
const locationLabel = 'Ort';
const eventIdLabel = 'Event-ID';
const coordinatesLabel = 'Koordinaten';

/**
 * Darstellung der Detailseite eines einzelnen Events.
 * @returns {JSX.Element} Die Event-Detailseite
 */
function EventDetailPage() {
  // Extrahiere die Event-ID aus den URL-Parametern und verwende den useEvent-Hook, um die Event-Daten zu laden
  const {id} = useParams();
  const {event, isLoading, error} = useEvent(id);

  // Berechne das Datum, ob es ein Wochenende ist, und formatiere die Anzeige
  const eventDate = event ? new Date(event.date) : null;
  const isWeekend = eventDate && (eventDate.getDay() === 0 || eventDate.getDay() === 6);
  const dateTheme = isWeekend ? 'from-red-900 to-red-950' : 'from-cyan-900 to-cyan-800';
  const weekdayTheme = isWeekend ? 'text-red-900' : 'text-cyan-900';
  const formattedWeekday = eventDate ? new Intl.DateTimeFormat('de-DE', {weekday: 'long'}).format(eventDate) : '';
  const formattedDate = eventDate ? new Intl.DateTimeFormat('de-DE', {day: '2-digit', month: 'long', year: 'numeric'}).format(eventDate) : '';
  const formattedTime = eventDate ? new Intl.DateTimeFormat('de-DE', {hour: '2-digit', minute: '2-digit'}).format(eventDate) : '';
  const hasCoordinates = event?.latitude !== null && event?.latitude !== undefined && event?.longitude !== null && event?.longitude !== undefined;

  return (
    <div className="relative min-h-screen overflow-hidden bg-stone-50 px-5 py-12 text-red-950 sm:px-8 sm:py-20 lg:px-12">
      <section className="relative mx-auto max-w-6xl">
        <div className="relative isolate overflow-hidden rounded-3xl px-6 py-12 text-white shadow-xl shadow-cyan-950/15 sm:px-10 sm:py-14">
          <img alt="Lesende Menschen bei einem Event" className="absolute inset-0 -z-20 h-full w-full object-cover object-top-left" src={eventHeaderImage} />
          <div className="absolute inset-0 -z-10 bg-linear-to-r from-cyan-950/95 via-cyan-900/80 to-red-950/55" />

          <Link className="inline-flex items-center gap-2 text-xl font-bold text-sky-200 transition hover:text-white" to={eventsLink}>
            {backToEventsText}
          </Link>

          <div className="mt-10 max-w-3xl">
            <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-sky-300">{headerSmallTitle}</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">{event?.title ?? loadingTitle}</h1>
          </div>
        </div>

        {isLoading ? (
          <div className="mt-8 rounded-3xl border border-red-950/10 bg-white/85 p-8 text-stone-600 shadow-xl shadow-cyan-950/5 backdrop-blur-sm">
            <p className="font-black text-red-950">{loadingTitle}</p>
            <p className="mt-2 leading-6">{loadingText}</p>
          </div>
        ) : error ? (
          <div className="mt-8 rounded-3xl border border-red-900/15 bg-red-900/5 p-8 text-red-950 shadow-xl shadow-cyan-950/5" role="alert">
            <p className="font-black">{errorTitle}</p>
            <p className="mt-2 leading-6">{error}</p>
            <Link className="mt-6 inline-flex font-bold text-cyan-900 transition hover:text-cyan-700" to={eventsLink}>
              {backToEventsText}
            </Link>
          </div>
        ) : (
          <article className="mt-8 grid gap-6 lg:grid-cols-[18rem_minmax(0,1fr)]">
            <aside className={`rounded-3xl bg-linear-to-br p-7 text-white shadow-xl shadow-cyan-950/15 ${dateTheme}`}>
              <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-white/75">{formattedWeekday}</p>
              <time className="mt-5 block text-3xl font-black tracking-tight" dateTime={event.date}>
                {formattedDate}
              </time>
              <p className="mt-3 text-lg font-bold text-white/90">{formattedTime} Uhr</p>
            </aside>

            <div className="rounded-3xl border border-red-950/10 bg-white/85 p-6 shadow-xl shadow-cyan-950/5 backdrop-blur-sm sm:p-8">
              <p className={`text-sm font-extrabold uppercase tracking-[0.18em] ${weekdayTheme}`}>{descriptionTitle}</p>
              <p className="mt-4 whitespace-pre-line text-base leading-8 text-stone-700">{event.description || noDescriptionText}</p>

              <dl className="mt-8 grid gap-5 border-t border-red-950/10 pt-6 sm:grid-cols-2">
                <div>
                  <dt className="text-xs font-extrabold uppercase tracking-[0.16em] text-stone-500">{locationLabel}</dt>
                  <dd className="mt-2 font-bold text-red-950">{event.location}</dd>
                </div>
                <div>
                  <dt className="text-xs font-extrabold uppercase tracking-[0.16em] text-stone-500">{dateLabel}</dt>
                  <dd className="mt-2 font-bold text-red-950">
                    {formattedWeekday}, {formattedDate}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-extrabold uppercase tracking-[0.16em] text-stone-500">{timeLabel}</dt>
                  <dd className="mt-2 font-bold text-red-950">{formattedTime} Uhr</dd>
                </div>
                <div>
                  <dt className="text-xs font-extrabold uppercase tracking-[0.16em] text-stone-500">{eventIdLabel}</dt>
                  <dd className="mt-2 font-bold text-red-950">#{event.id}</dd>
                </div>
                {hasCoordinates && (
                  <div className="sm:col-span-2">
                    <dt className="text-xs font-extrabold uppercase tracking-[0.16em] text-stone-500">{coordinatesLabel}</dt>
                    <dd className="mt-2 font-bold text-red-950">
                      {event.latitude}, {event.longitude}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </article>
        )}
      </section>
    </div>
  );
}

export default EventDetailPage;
