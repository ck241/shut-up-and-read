import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header.jsx";
import EventPage from "./pages/EventPage.jsx";
import HomePage from "./pages/HomePage.jsx";

function LoginPage() {
  return <h1>Login</h1>;
}

function SignupPage() {
  return <h1>Registrieren</h1>;
}

function NotFoundPage() {
  return <h1>404 – Seite nicht gefunden</h1>;
}

function App() {
  return (
    <>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/events" element={<EventPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
