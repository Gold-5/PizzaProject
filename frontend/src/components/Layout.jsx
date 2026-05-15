import Navigation from './Navigation';
import '../styles/Layout.css';

export default function Layout({ children }) {
  return (
    <div className="layout">
      <Navigation />
      <main className="main-content">{children}</main>
      <footer className="footer">
        <p>&copy; 2026 Pizza Project. Все права защищены.</p>
      </footer>
    </div>
  );
}
