import React, { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../styles/doneRecipes.css';

function FavoriteRecipes() {
  const [filteredItens, setFilteredItens] = useState([]);
  const [copied, setCopied] = useState(false);

  const foodsFilter = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const newItens = favoriteRecipes.filter((el) => el.type === 'comida');
    setFilteredItens(newItens);
  };

  const drinksFilter = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const newItens = favoriteRecipes.filter((el) => el.type === 'bebida');
    setFilteredItens(newItens);
  };

  const noFilter = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const newItens = favoriteRecipes;
    setFilteredItens(newItens);
  };

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    setFilteredItens(favoriteRecipes);
  }, []);

  const handleClick = async (e) => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const elementSRC = e.target.parentNode.firstChild.firstChild.src;
    const newFavoriteRecipes = favoriteRecipes.filter((el) => el.image !== elementSRC);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
    setFilteredItens(newFavoriteRecipes);
  };

  return (
    <>
      <Header
        title="Receitas Favoritas"
        visible={ false }
      />
      <button
        onClick={ noFilter }
        data-testid="filter-by-all-btn"
        type="button"
      >
        All
      </button>
      <button
        onClick={ foodsFilter }
        data-testid="filter-by-food-btn"
        type="button"
      >
        Foods
      </button>
      <button
        onClick={ drinksFilter }
        data-testid="filter-by-drink-btn"
        type="button"
      >
        Drinks
      </button>
      <div
        className="doneRecipes-card"
      >
        {
          filteredItens.map((el, i) => (
            <>
              <Link
                to={ `${el.type}` === 'bebida'
                  ? `/bebidas/${el.id}` : `/comidas/${el.id}` }
              >
                <h1
                  key={ i }
                  data-testid={ `${i}-horizontal-name` }
                >
                  {el.name}
                </h1>
              </Link>
              <div
                className="card-content"
              >
                <Link
                  to={ `${el.type}` === 'bebida'
                    ? `/bebidas/${el.id}` : `/comidas/${el.id}` }
                >
                  <img
                    data-testid={ `${i}-horizontal-image` }
                    src={ el.image }
                    alt={ el.name }
                  />
                </Link>
                <h2
                  data-testid={ `${i}-horizontal-top-text` }
                >
                  {`${el.type === 'bebida'
                    ? el.alcoholicOrNot : el.area} - ${el.category}`}
                </h2>
                <CopyToClipboard
                  text={ `http://localhost:3000/${el.type === 'comida' ? 'comidas' : 'bebidas'}/${el.id}` }
                  onCopy={ () => setCopied(true) }
                >
                  <input
                    type="image"
                    data-testid={ `${i}-horizontal-share-btn` }
                    src={ shareIcon }
                    alt={ shareIcon }
                  />
                </CopyToClipboard>
                {copied ? <span>Link copiado!</span> : null}
                <input
                  onClick={ (e) => handleClick(e) }
                  data-testid={ `${i}-horizontal-favorite-btn` }
                  type="image"
                  src={ blackHeartIcon }
                  alt="favorite-btn"
                />
                <h2
                  data-testid={ `${i}-horizontal-done-date` }
                >
                  {el.doneDate}
                </h2>
              </div>
            </>
          ))
        }
      </div>
    </>
  );
}

export default FavoriteRecipes;
