/**
 * AddEventPage.jsx
 * Formular zum Erstellen eines neuen Events.
 */

import {Link} from 'react-router-dom';
import {useState} from 'react';
import eventHeaderImage from '../assets/header_events.webp';
import {createEvent} from '../api/events.js';

// Initiale Formulardaten für das Erstellen eines neuen Events
const initialFormData = {
  title: '',
  description: '',
  date: '',
  location: '',
};

// String-Konstanten für die Add-Event-Seite
const eventsLink = '/events';
const headerImageAlt = 'Lesende Menschen bei einem Event';
const headerSmallTitle = 'Gemeinsam lesen';
const headerBigTitle = 'Plane dein nächstes Event.';
const headerSubtitle = 'Teile einen Ort, eine Zeit und deine Idee – die richtigen Menschen finden den Weg zu deinem Lese-Event.';
const detailsSmallTitle = 'Event-Details';
const detailsBigTitle = 'Worum geht es?';
const titleLabel = 'Titel *';
const titlePlaceholder = 'Zum Beispiel: Lesen im Park';
const descriptionLabel = 'Beschreibung';
const descriptionPlaceholder = 'Was erwartet die Teilnehmenden?';
const dateLabel = 'Datum & Uhrzeit *';
const locationLabel = 'Ort *';
const locationPlaceholder = 'Stadtbibliothek, Berlin';
const sidebarBigTitle = 'Fast geschafft.';
const errorTitle = 'Event konnte nicht gespeichert werden';
const successTitle = 'Gespeichert';
const successMessageText = 'Dein Event wurde gespeichert.';
const submittingButtonText = 'Event wird gespeichert …';
const submitButtonText = 'Event veröffentlichen';
const backButtonText = 'Zurück zu den Events';

/**
 * Darstellung der Seite zum Erstellen eines neuen Events.
 * @returns {JSX.Element} - Die Add-Event-Seite
 */
function AddEventPage() {
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  /**
   * Aktualisiert die Formulardaten, wenn der Benutzer Eingaben macht.
   * @param {Object} event - Das Ereignisobjekt des Eingabefelds
   */
  function handleChange(event) {
    const {name, value} = event.target;

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }));
  }

  /**
   * Verarbeitet das Absenden des Formulars zum Erstellen eines neuen Events.
   * @param {Object} event - Das Ereignisobjekt des Formulars
   */
  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setSuccessMessage('');
    setIsSubmitting(true);

    // Bereite die Event-Daten für die API-Anfrage vor
    const eventData = {
      title: formData.title.trim(),
      date: new Date(formData.date).toISOString(),
      location: formData.location.trim(),
      ...(formData.description.trim() ? {description: formData.description.trim()} : {}),
    };

    // Sende die Event-Daten an die API, um ein neues Event zu erstellen
    try {
      await createEvent(eventData);
      setFormData(initialFormData);
      setSuccessMessage(successMessageText);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-stone-50 px-5 py-1 text-red-950 sm:px-8 sm:py-20 lg:px-12">
      <section className="relative mx-auto max-w-6xl">
        <div className="relative isolate overflow-hidden rounded-3xl px-6 py-12 text-white shadow-xl shadow-cyan-950/15 sm:px-10 sm:py-14">
          <img alt={headerImageAlt} className="absolute inset-0 -z-20 h-full w-full object-cover object-top-left" src={eventHeaderImage} />
          <div className="absolute inset-0 -z-10 bg-linear-to-r from-cyan-950/95 via-cyan-900/80 to-red-950/55" />

          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-sky-300">{headerSmallTitle}</p>
              <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">{headerBigTitle}</h1>
              <p className="mt-5 text-lg leading-8 text-stone-200">{headerSubtitle}</p>
            </div>
          </div>
        </div>

        <form className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]" onSubmit={handleSubmit}>
          <div className="rounded-3xl border border-red-950/10 bg-white/85 p-6 shadow-xl shadow-cyan-950/5 backdrop-blur-sm sm:p-8">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-cyan-900">{detailsSmallTitle}</p>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-red-950">{detailsBigTitle}</h2>
            </div>

            <div className="mt-8 grid gap-6">
              <label className="grid gap-2 text-sm font-bold text-red-950">
                {titleLabel}
                <input
                  className="h-14 rounded-2xl border border-stone-200 bg-stone-50 px-4 text-base font-normal text-red-950 outline-none transition placeholder:text-stone-400 focus:border-cyan-900 focus:ring-4 focus:ring-cyan-900/10"
                  maxLength="255"
                  name="title"
                  onChange={handleChange}
                  placeholder={titlePlaceholder}
                  required
                  type="text"
                  value={formData.title}
                />
              </label>

              <label className="grid gap-2 text-sm font-bold text-red-950">
                {descriptionLabel}
                <textarea
                  className="min-h-36 resize-y rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-base font-normal text-red-950 outline-none transition placeholder:text-stone-400 focus:border-cyan-900 focus:ring-4 focus:ring-cyan-900/10"
                  maxLength="255"
                  name="description"
                  onChange={handleChange}
                  placeholder={descriptionPlaceholder}
                  value={formData.description}
                />
              </label>

              <div className="grid gap-6 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-bold text-red-950">
                  {dateLabel}
                  <input
                    className="h-14 rounded-2xl border border-stone-200 bg-stone-50 px-4 text-base font-normal text-red-950 outline-none transition focus:border-cyan-900 focus:ring-4 focus:ring-cyan-900/10"
                    name="date"
                    onChange={handleChange}
                    required
                    type="datetime-local"
                    value={formData.date}
                  />
                </label>

                <label className="grid gap-2 text-sm font-bold text-red-950">
                  {locationLabel}
                  <input
                    className="h-14 rounded-2xl border border-stone-200 bg-stone-50 px-4 text-base font-normal text-red-950 outline-none transition placeholder:text-stone-400 focus:border-cyan-900 focus:ring-4 focus:ring-cyan-900/10"
                    maxLength="255"
                    name="location"
                    onChange={handleChange}
                    placeholder={locationPlaceholder}
                    required
                    type="text"
                    value={formData.location}
                  />
                </label>
              </div>
            </div>
          </div>

          <aside className="h-fit rounded-3xl border border-red-950/10 bg-white/85 p-6 shadow-xl shadow-cyan-950/5 backdrop-blur-sm lg:sticky lg:top-8">
            <h2 className="mt-2 text-2xl font-black tracking-tight text-red-950">{sidebarBigTitle}</h2>

            {error && (
              <div aria-live="polite" className="mt-6 rounded-2xl border border-red-900/15 bg-red-900/5 p-4 text-sm text-red-950">
                <p className="font-black">{errorTitle}</p>
                <p className="mt-1 leading-6">{error}</p>
              </div>
            )}

            {successMessage && (
              <div aria-live="polite" className="mt-6 rounded-2xl border border-cyan-900/15 bg-cyan-900/5 p-4 text-sm text-cyan-950">
                <p className="font-black">{successTitle}</p>
                <p className="mt-1 leading-6">{successMessage}</p>
              </div>
            )}

            <button
              className="mt-6 inline-flex h-14 w-full cursor-pointer items-center justify-center rounded-2xl bg-red-900 px-6 text-base font-bold text-white shadow-lg shadow-red-950/20 transition duration-200 hover:-translate-y-0.5 hover:bg-red-950 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? submittingButtonText : submitButtonText}
            </button>

            <Link className="mt-4 inline-flex w-full justify-center text-sm font-bold text-cyan-900 transition hover:text-cyan-700" to={eventsLink}>
              {backButtonText}
            </Link>
          </aside>
        </form>
      </section>
    </div>
  );
}

export default AddEventPage;
