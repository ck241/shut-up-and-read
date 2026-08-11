import {Route, Routes} from 'react-router-dom';
import './App.css';
import EventPage from './pages/EventPage.jsx';
import HomePage from './pages/HomePage.jsx';
import MainLayout from './layouts/MainLayout.jsx';
import FullLayout from './layouts/FullLayout.jsx';

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
      <Routes>
        <Route path="/auth" element={<FullLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
        </Route>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/events" element={<EventPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
