/**
 * HomePage.jsx
 * TODO
 */

import { Link } from 'react-router-dom'
import headerImage from '../assets/header.webp'


/**
 * Funktion zur Darstellung der Startseite
 * @returns {JSX.Element} - Die Startseite der Anwendung
 */
function HomePage() {

  // Konstanten für den Header-Text und den Button-Text
  const headerSmallTitle = 'Gemeinsam lesen'
  const headerBigTitle = 'Dein nächstes Kapitel beginnt gemeinsam.'
  const headerSubtitle = 'Finde Lese-Events in deiner Nähe, tausche dich mit anderen \
  Lesebegeisterten aus und entdecke neue Geschichten. Egal ob du ein Buchclub suchst oder \
  einfach nur neue Freunde finden möchtest – bei uns bist du richtig!'
  const headerButtonText = 'Jetzt mitmachen'  // TODO <- if/else (Jetzt mitmachen / Events entdecken)
  const headerButtonLink = '/signup'  // TODO <- if/else (/signup /events)

  return (
    <div className="relative min-h-screen overflow-hidden bg-stone-50 px-5 py-1 sm:px-8 sm:py-20 lg:px-12">

      <section className="relative mx-auto max-w-6xl">
        <div className="relative isolate overflow-hidden rounded-3xl px-6 py-16 text-white shadow-xl shadow-cyan-950/15 sm:px-10 sm:py-24">
          <img alt="" className="absolute inset-0 -z-20 h-full w-full object-cover object-top-left" src={headerImage} />
          <div className="absolute inset-0 -z-10 bg-linear-to-r from-cyan-950/95 via-cyan-900/80 to-red-950/55" />

          <div className="max-w-2xl">
            <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-sky-300">{headerSmallTitle}</p>
            <h1 className="mt-3 text-5xl font-black tracking-tight sm:text-6xl">
              {headerBigTitle}
            </h1>
            <p className="mt-6 text-lg leading-8 text-stone-200">
              {headerSubtitle}
            </p>
            <Link
              className="mt-9 inline-block rounded-full bg-white/90 px-6 py-3 font-bold text-cyan-900 shadow-lg transition duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-xl"
              to={headerButtonLink}
            >
              {headerButtonText}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
