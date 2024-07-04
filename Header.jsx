import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FavoritesContext } from '../store/Favorites/context';
import '../style.css'; // Fișierul CSS pentru stilizare personalizată

export function Header() {
  const { favoritesState } = useContext(FavoritesContext);

  return (
    <header className="custom-header">
      <nav>
        <ul className="left-nav">
          <li>
            <Link to="/">Acasă</Link>
          </li>
          <li>
            <Link to="/products">Cărți</Link>
          </li>
        </ul>
        <ul className="right-nav">
          <li>
            <Link to="/favorites">
              Favorite <span className="badge">{favoritesState.products.length}</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
