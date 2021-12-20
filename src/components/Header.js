import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  thunkMealorDrinkIng,
} from '../actions';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import '../styles/Header.css';

function Header({ title, visible }) {
  const MSG = 'Sua busca deve conter somente 1 (um) caracter';
  const validadeSearchBar = visible === 1 ? true : null;
  const [displaySearchBar, setDisplaySearchBar] = useState(false);
  const [searchBar, setSearchBar] = useState('');
  const [radio, setRadio] = useState('');
  const history = useHistory();
  const { location: { pathname } } = history;
  const dispatch = useDispatch();
  // const checkRoute = pathname.includes('comidas') ? true : null;
  const mealsOrDrinks = useSelector((state) => state.mealsOrDrinks.mealsOrDrinks);
  const goatButton = useSelector((state) => state
    .mealsOrDrinksFilteredCategory.ButtonCategory);

  const handleDisplay = () => setDisplaySearchBar(!displaySearchBar);
  const profileRedirect = () => history.push('/perfil');

  const redirect = () => {
    if (pathname.includes('comidas')) {
      return history.push(`/comidas/${mealsOrDrinks[0].idMeal}`);
    }
    return history.push(`/bebidas/${mealsOrDrinks[0].idDrink}`);
  };

  const handleClick = (searchBarValue, radioValue, pathNameValue) => {
    if (searchBarValue.length > 1 && radioValue === 'firstLetter') {
      global.alert(MSG);
    }
    return dispatch(thunkMealorDrinkIng(searchBarValue, radioValue, pathNameValue));
  };

  useEffect(() => {
    if (mealsOrDrinks === null) {
      global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
    if (mealsOrDrinks !== null
        && mealsOrDrinks.length === 1
        && goatButton !== 'Goat') return redirect();
  }, [mealsOrDrinks]);

  const searchElements = (
    <>
      <div
        className="search-input"
      >
        <input
          data-testid="search-input"
          placeholder="Buscar Receita"
          type="text"
          name="searchBar"
          value={ searchBar }
          onChange={ (e) => setSearchBar(e.target.value) }
        />
      </div>
      <div
        className="radio-button"
      >
        <label
          htmlFor="ingredient"
        >
          <input
            id="ingredient"
            data-testid="ingredient-search-radio"
            type="radio"
            value="ingredient"
            name="radio"
            onChange={ (e) => setRadio(e.target.value) }
          />
          Ingrediente
        </label>
        <label
          htmlFor="name"
        >
          <input
            id="name"
            data-testid="name-search-radio"
            type="radio"
            value="name"
            name="radio"
            onChange={ (e) => setRadio(e.target.value) }
          />
          Nome
        </label>
        <label
          htmlFor="firstLetter"
        >
          <input
            data-testid="first-letter-search-radio"
            id="firstLetter"
            type="radio"
            value="firstLetter"
            name="radio"
            onChange={ (e) => setRadio(e.target.value) }
          />
          Primeira letra
        </label>
        <button
          onClick={ () => handleClick(searchBar, radio, pathname) }
          data-testid="exec-search-btn"
          type="button"
        >
          buscar
        </button>
      </div>
    </>
  );

  return (
    <>
      <div
        className="header"
      >
        <input
          type="image"
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="profileIcon"
          onClick={ profileRedirect }
        />
        <span
          data-testid="page-title"
        >
          {title}
        </span>
        {
          validadeSearchBar && <input
            type="image"
            data-testid="search-top-btn"
            onClick={ handleDisplay }
            src={ searchIcon }
            alt="searchIcon"
          />
        }
      </div>
      {
        displaySearchBar && searchElements
      }
    </>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default Header;
