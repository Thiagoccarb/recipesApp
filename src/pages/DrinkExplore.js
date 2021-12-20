import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunkRandomMealorDrinkID, thunkMealorDrinkIngredient } from '../actions';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/DrinkExplore.css';

function DrinkExplore() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { location: { pathname } } = history;
  const id = useSelector((state) => state.randomMeal.randomMealID);

  const handleClick = () => dispatch(thunkRandomMealorDrinkID(pathname));

  useEffect(() => {
    dispatch(thunkMealorDrinkIngredient(pathname));
    handleClick();
  }, []);

  return (
    <>
      <Header
        title="Explorar Bebidas"
        visible={ false }
      />
      <div
        className="explore-buttons"
      >
        <Link
          to="/explorar/bebidas/ingredientes"
        >
          <button
            type="button"
            data-testid="explore-by-ingredient"
          >
            Por Ingredientes
          </button>
        </Link>
        <Link
          to={ `/bebidas/${id}` }
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

DrinkExplore.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default DrinkExplore;
