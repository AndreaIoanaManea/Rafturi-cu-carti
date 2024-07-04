import React, { useReducer } from 'react';
import './style.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { Favorites } from './pages/Favorites';
import { Header } from './components/Header';
import { FavoritesContext } from './store/Favorites/context';
import {
  initialState as favoritesInitialState,
  favoritesReducer,
} from './store/Favorites/reducer';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Header />
        <Home />
      </>
    ),
  },
  {
    path: '/products',
    element: (
      <>
        <Header />
        <Products />
      </>
    ),
  },
  {
    path: '/favorites',
    element: (
      <>
        <Header />
        <Favorites />
      </>
    ),
  },
]);

export default function App() {
  const [favoritesState, favoritesDispatch] = useReducer(
    favoritesReducer,
    favoritesInitialState
  );

  const favoritesContextValue = {
    favoritesState,
    favoritesDispatch,
  };

  return (
    <FavoritesContext.Provider value={favoritesContextValue}>
      <div className="App primary">
        <RouterProvider router={router} />
      </div>
    </FavoritesContext.Provider>
  );
}
