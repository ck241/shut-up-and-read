import {useNavigate} from 'react-router-dom';

export default function useAuth() {
  const navigate = useNavigate();

  async function login(email, password) {
    if (!email || !password) {
      throw new Error('Bitte fülle sowohl E-Mail-Adresse als auch Passwort aus.');
    }

    const response = await fetch('http://localhost:3001/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password}),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Anmeldung fehlgeschlagen. Bitte überprüfe deine Angaben.');
    }

    localStorage.setItem('user_token', data.token);
    navigate('/');
  }

  return {
    login,
  };
}
