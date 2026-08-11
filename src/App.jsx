import {Route, Routes} from 'react-router-dom';
import './App.css';
import EventPage from './pages/EventPage.jsx';
import AddEventPage from './pages/AddEventPage.jsx';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import MainLayout from './layouts/MainLayout.jsx';

function NotFoundPage() {
  return <h1>404 – Seite nicht gefunden</h1>;
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/signup" element={<SignupPage />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="events" element={<EventPage />} />
          <Route path="events/new" element={<AddEventPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
