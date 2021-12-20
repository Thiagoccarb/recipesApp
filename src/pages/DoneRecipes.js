import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import '../styles/doneRecipes.css';

function DoneRecipes() {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  const [filteredItens, setFilteredItens] = useState(doneRecipes);
  const [copied, setCopied] = useState(false);
  const MAX_NUMBER = 3000;

  const foodsFilter = () => {
    const newItens = doneRecipes.filter((el) => el.type === 'comida');
    setFilteredItens(newItens);
  };

  const drinksFilter = () => {
    const newItens = doneRecipes.filter((el) => el.type === 'bebida');
    setFilteredItens(newItens);
  };

  const noFilter = () => {
    const newItens = doneRecipes;
    setFilteredItens(newItens);
  };

  return (
    <>
      <Header
        title="Receitas Feitas"
        visible={ false }
      />
      <div
        className="buttons-container"
      >
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
      </div>
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
                {
                  el.tags.map((e, index) => (
                    <h1
                      key={ index }
                      data-testid={ `${i}-${e}-horizontal-tag` }
                    >
                      {e}
                    </h1>
                  ))
                }
                <div
                  className="date-shareButton-container"
                >
                  <CopyToClipboard
                    text={ `http://localhost:3000/${el.type === 'comida' ? 'comidas' : 'bebidas'}/${el.id}` }
                    onCopy={ () => {
                      setCopied(true);
                      setTimeout(() => setCopied(false), MAX_NUMBER);
                    } }
                  >
                    <input
                      type="image"
                      data-testid={ `${i}-horizontal-share-btn` }
                      src={ shareIcon }
                      alt={ shareIcon }
                    />
                  </CopyToClipboard>
                  {copied ? <span>Link copiado!</span> : null}
                  <h2
                    data-testid={ `${i}-horizontal-done-date` }
                  >
                    {el.doneDate}
                  </h2>
                </div>
              </div>
            </>
          ))
        }
      </div>
    </>
  );
}

export default DoneRecipes;
