import {Route, Routes} from 'react-router-dom';
import './App.css';
import EventPage from './pages/EventPage';
import EventDetailPage from './pages/EventDetailPage';
import AddEventPage from './pages/AddEventPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage.jsx';
import NotFoundPage from './pages/NotFoundPage';
import SignupPage from './pages/SignupPage.jsx';
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <>
      <Routes>
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/signup" element={<SignupPage />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="events" element={<EventPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="events/new" element={<AddEventPage />} />
          </Route>
          <Route path="events/:id" element={<EventDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
