import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunkRandomMealorDrinkID } from '../actions';

import Header from '../components/Header';
import Footer from '../components/Footer';

function FoodExplore() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { location: { pathname } } = history;
  const id = useSelector((state) => state.randomMeal.randomMealID);

  const handleClick = () => dispatch(thunkRandomMealorDrinkID(pathname));

  useEffect(() => {
    handleClick();
  }, []);

  return (
    <>
      <Header
        title="Explorar Comidas"
        visible={ false }
      />
      <div
        className="explore-buttons"
      >
        <Link
          to="/explorar/comidas/ingredientes"
        >
          <button
            type="button"
            data-testid="explore-by-ingredient"
          >
            Por Ingredientes
          </button>
        </Link>
        <Link
          to="/explorar/comidas/area"
        >
          <button
            type="button"
            data-testid="explore-by-area"
          >
            Por Local de Origem
          </button>
        </Link>
        <Link
          to={ `/comidas/${id}` }
        >
          <button
            type="button"
            data-testid="explore-surprise"
          >
            Me Surpreenda!
          </button>
        </Link>
      </div>
      <Footer />
    </>
  );
}

export default FoodExplore;
