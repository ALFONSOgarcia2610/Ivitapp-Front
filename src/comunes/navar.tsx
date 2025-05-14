import { Link } from '@tanstack/react-router';

export default function Navbar() {
  return (
    <nav className="flex gap-4 p-4 bg-gray-100">
      <Link to="/login">Login</Link>
      <Link to="/register">Registro</Link>
      <Link to="/pokemon">Pokémon</Link>
      <Link to="/clima">Clima</Link>
    </nav>
  );
}
