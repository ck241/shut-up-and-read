/**
 * NotFoundPage.jsx
 * Darstellung für nicht existierende Seiten.
 */

/**
 * NotFoundPage-Komponente
 * @returns {JSX.Element} Die 404-Seite
 */
function NotFoundPage(): React.JSX.Element {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-5 text-center">
      <h1 className="text-2xl font-black tracking-tight text-red-950 sm:text-3xl">404 – Seite nicht gefunden</h1>
    </div>
  );
}

export default NotFoundPage;
