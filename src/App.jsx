import { Link, Route, Routes } from 'react-router-dom'
import './App.css'

function HomePage() {
  return <h1>Hauptseite</h1>
}

function EventPage() {
  return <h1>Event</h1>
}

function LoginPage() {
  return <h1>Login</h1>
}

function SignupPage() {
  return <h1>Registrieren</h1>
}

function NotFoundPage() {
  return <h1>404 – Seite nicht gefunden</h1>
}

function App() {
  return (
    <>
      <nav aria-label="Hauptnavigation">
        <Link to="/">Startseite</Link>{' '}
        <Link to="/events/1">Event</Link>{' '}
        <Link to="/login">Login</Link>{' '}
        <Link to="/signup">Registrieren</Link>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/events/:id" element={<EventPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  )
}

export default App
