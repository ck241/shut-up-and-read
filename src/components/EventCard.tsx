/**
 * EventCard.jsx
 * Darstellung einer einzelnen Event-Karte
 */

import {Link} from 'react-router-dom';

// Theme für Wochentage
const weekdayCardTheme = {
  date: 'from-cyan-900 to-cyan-800',
  glow: 'from-cyan-900/15 via-cyan-900/5 to-transparent',
  tag: 'bg-cyan-900/10 text-cyan-900 ring-cyan-900/10',
  weekday: 'text-cyan-900',
}
// Theme für Wochenenden
const weekendCardTheme = {
  date: 'from-red-900 to-red-950',
  glow: 'from-red-900/15 via-red-900/5 to-transparent',
  tag: 'bg-red-900/10 text-red-900 ring-red-900/10',
  weekday: 'text-red-900',
}

interface EventCardEvent {
  id: string | number;
  date: string;
  title: string;
  description?: string | null;
  location: string;
}

interface EventCardProps {
  event: EventCardEvent;
}

/**
 * Darstellung einer einzelnen Event-Karte
 * @param {Object} param0 - Die Eigenschaften des EventCards
 * @param {Object} param0.event - Das Event-Objekt
 * @returns {JSX.Element} - Die Event-Karte
 */
function EventCard({ event }: EventCardProps) {
  // Datum des Events ermitteln und prüfen, ob es ein Wochenende ist
  const eventDate = new Date(event.date)
  const isWeekend = eventDate.getDay() === 0 || eventDate.getDay() === 6
  const theme = isWeekend ? weekendCardTheme : weekdayCardTheme
  const day = new Intl.DateTimeFormat('de-DE', { day: '2-digit' }).format(eventDate)
  const month = new Intl.DateTimeFormat('de-DE', { month: 'short' }).format(eventDate)
  const weekday = new Intl.DateTimeFormat('de-DE', { weekday: 'long' }).format(eventDate)
  const timeFormatter = new Intl.DateTimeFormat('de-DE', { hour: '2-digit', minute: '2-digit' })
  const time = `${timeFormatter.format(eventDate)} Uhr`

  return (
    <Link className="group block rounded-3xl outline-none focus-visible:ring-4 focus-visible:ring-cyan-900/30" to={`/events/${event.id}`}>
      <article className="relative isolate overflow-hidden rounded-3xl border border-red-950/10 bg-white/80 p-5 shadow-lg shadow-cyan-950/5 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-sky-600/30 hover:shadow-xl hover:shadow-cyan-950/10 sm:p-6">
        <div className={`absolute inset-0 -z-10 bg-linear-to-br ${theme.glow}`} />

        <div className="flex gap-5">
          <div className={`flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-2xl bg-linear-to-br text-white shadow-lg ${theme.date}`}>
            <span className="text-xs font-bold uppercase tracking-[0.18em]">{month}</span>
            <span className="text-3xl font-black leading-none">{day}</span>
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              <span className={`rounded-full px-3 py-1 text-xs font-bold ring-1 ${theme.tag}`}>Event</span>
              <span className={`font-black capitalize ${theme.weekday}`}>{weekday}</span>
            </div>
            <h2 className="mt-4 text-xl font-black tracking-tight text-red-950 sm:text-2xl">{event.title}</h2>
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-stone-600">{event.description}</p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-red-950/10 pt-4 text-sm">
          <div>
            <p className="font-bold text-cyan-900">{time}</p>
            <p className="mt-1 text-stone-500">{event.location}</p>
          </div>
        </div>
      </article>
    </Link>
  )
}

export default EventCard
