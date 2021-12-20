import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

function SearchBarCard() {
  const itens = useSelector((state) => state.searchBar.mealsOrDrinks);
  const MAX_NUMBER = 12;
  const history = useHistory();
  const { location: { pathname } } = history;

  const searchError = (
    <h1>desculpe, não há receitas para a busca realizada</h1>
  );

  //  const elements = (
  //    <>
  //      {
  //        itens.map((el, index) => {
  //          if (index < MAX_NUMBER) {
  //            return (
  //              <div
  //                key={ index }
  //                data-testid={ `${index}-recipe-card` }
  //              >
  //                <span
  //                  data-testid={ `${index}-card-name` }
  //                >
  //                  {pathname.includes('comidas') ? el.strMeal : el.strDrink}
  //                </span>
  //                <img
  //                  data-testid={ `${index}-card-img` }
  //                  src={ pathname.includes('comidas')
  //                    ? el.strMealThumb : el.strDrinkThumb }
  //                  alt={ index }
  //                />
  //              </div>
  //            );
  //          }
  //          return '';
  //        })
  //      }
  //    </>
  //  );

  return (
    // <h1>olá</h1>
    itens === null
      ? searchError
      : itens.map((el, index) => {
        if (index < MAX_NUMBER) {
          return (
            <div
              key={ index }
              data-testid={ `${index}-recipe-card` }
            >
              <span
                data-testid={ `${index}-card-name` }
              >
                {pathname.includes('comidas') ? el.strMeal : el.strDrink}
              </span>
              <img
                data-testid={ `${index}-card-img` }
                src={ pathname.includes('comidas')
                  ? el.strMealThumb : el.strDrinkThumb }
                alt={ index }
              />
            </div>
          );
        }
        return '';
      })
  );
}

export default SearchBarCard;
