import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/Profile.css';

function Profile() {
  const user = JSON.parse(localStorage.getItem('user'));
  const { email } = user;

  const clearLocalStorage = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('mealsToken');
    localStorage.removeItem('cocktailsToken');
    localStorage.removeItem('doneRecipes');
    localStorage.removeItem('favoriteRecipes');
    localStorage.removeItem('inProgressRecipes');
  };

  return (
    <div
      className="options-container"
    >
      <Header title="Perfil" search={ false } />
      <h1 data-testid="profile-email">{email}</h1>
      <div
        className="options"
      >
        <Link to="/receitas-feitas">
          <h2 data-testid="profile-done-btn">
            Receitas Feitas
          </h2>
        </Link>
        <Link to="/receitas-favoritas">
          <h2 data-testid="profile-favorite-btn">
            Receitas Favoritas
          </h2>
        </Link>
        <Link to="/">
          <button
            type="button"
            data-testid="profile-logout-btn"
            onClick={ clearLocalStorage }
          >
            Sair
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
