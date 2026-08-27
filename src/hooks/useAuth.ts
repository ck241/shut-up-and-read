import {useNavigate} from 'react-router-dom';

export default function useAuth() {
  const navigate = useNavigate();

  function validate(email: string, password: string): void {
    if (!email || !password) {
      throw new Error('Bitte fülle sowohl E-Mail-Adresse als auch Passwort aus.');
    }
  }

  async function login(email: string, password: string): Promise<void> {
    validate(email, password);

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

  async function register(email: string, password: string): Promise<void> {
    validate(email, password);

    const response = await fetch('http://localhost:3001/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password}),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Registrierung fehlgeschlagen. Bitte überprüfe deine Angaben.');
    }

    navigate('/auth/login');
  }

  return {
    login,
    register,
  };
}
