/**
 * HomePage.jsx
 * TODO
 */

import { Link } from 'react-router-dom'
import headerImage from '../assets/header.webp'
import logo from '../assets/logo.svg'


/**
 * Funktion zur Darstellung der Startseite
 * @returns {JSX.Element} - Die Startseite der Anwendung
 */
function HomePage() {

  // Konstanten für den Header-Text und den Button-Text
  const headerTitle = 'Dein nächstes Kapitel beginnt gemeinsam.'
  const headerSubtitle = 'Finde Lese-Events in deiner Nähe, tausche dich mit anderen \
  Lesebegeisterten aus und entdecke neue Geschichten. Egal ob du ein Buchclub suchst oder \
  einfach nur neue Freunde finden möchtest – bei uns bist du richtig!'
  const headerButtonText = 'Jetzt mitmachen'  // TODO <- if/else (Jetzt mitmachen / Events entdecken)
  const headerButtonLink = '/signup'  // TODO <- if/else (/signup /events)

  return (
    <div className="relative isolate overflow-hidden px-5 py-20 text-white sm:px-8 sm:py-56 lg:px-12">
      <img alt="" className="absolute inset-0 -z-20 h-full w-full object-cover object-top-left" src={headerImage} />
      <div className="absolute inset-0 -z-10 bg-black/55" />

      <div className="absolute right-5 top-5 w-32 rounded-2xl bg-white/55 p-4 shadow-xl sm:right-8 sm:top-8 sm:w-80 lg:right-12">
        <img alt="Shut Up and Read" className="h-auto w-full" src={logo} />
      </div>

      <div className="mx-auto max-w-6xl pt-28 sm:pt-0">
        <div className="max-w-2xl">
          <h1 className="mt-5 text-5xl font-black tracking-tight sm:text-6xl">
            {headerTitle}
          </h1>
          <p className="mt-6 text-lg leading-8 text-stone-300">
            {headerSubtitle}
          </p>
          <Link
            className="mt-9 inline-block rounded-full bg-red-900 px-6 py-3 font-bold transition-colors hover:bg-red-950"
            to={headerButtonLink}
          >
            {headerButtonText}
          </Link>
        </div>

      </div>
    </div>
  )
}

export default HomePage
