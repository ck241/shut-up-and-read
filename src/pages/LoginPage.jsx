import {Link} from 'react-router-dom';
import logo from '../assets/logo.svg';
import FullLayout from '../layouts/FullLayout';

function LoginPage() {
  return (
    <FullLayout header="Anmelden und weiterlesen" subheader="Willkommen zurück">
      <div className="w-full rounded-4xl border border-red-950/10 bg-white/90 p-8 shadow-2xl shadow-cyan-950/10 backdrop-blur-sm sm:p-10">
        <img src={logo} alt="Logo" className="mx-auto h-28 w-auto" />
        <div className="grid gap-6">
          <label className="grid gap-2 text-sm font-semibold text-red-950">
            E-Mail-Adresse
            <input
              type="email"
              placeholder="name@example.com"
              className="h-14 w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 text-base text-red-950 outline-none transition focus:border-cyan-900 focus:ring-4 focus:ring-cyan-900/10"
            />
          </label>

          <label className="grid gap-2 text-sm font-semibold text-red-950">
            Passwort
            <input
              type="password"
              placeholder="••••••••"
              className="h-14 w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 text-base text-red-950 outline-none transition focus:border-cyan-900 focus:ring-4 focus:ring-cyan-900/10"
            />
          </label>

          <button className="inline-flex h-14 w-full items-center justify-center rounded-2xl bg-cyan-900 px-6 text-base font-bold text-white shadow-lg shadow-cyan-950/20 transition duration-200 hover:bg-cyan-800">
            Anmelden
          </button>

          <p className="text-center text-sm text-stone-600">
            Noch kein Konto?{' '}
            <Link to="/auth/signup" className="font-semibold text-cyan-900 hover:text-cyan-700">
              Registrieren
            </Link>
          </p>
        </div>
      </div>
    </FullLayout>
  );
}

export default LoginPage;
