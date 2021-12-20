import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import { setCameFromIngredients } from '../actions/index2';

import '../styles/Footer.css';

// Componente funcional de Rodapé do App Receitas
function Footer() {
  const dispatch = useDispatch();
  const handleClick = () => dispatch(setCameFromIngredients(false));

  return (
    <footer className="footer" data-testid="footer">
      <div className="footer-content">
        <Link to="/bebidas">
          <input
            type="image"
            id="icon"
            src={ drinkIcon }
            alt="drink"
            data-testid="drinks-bottom-btn"
            onClick={ handleClick }
          />
        </Link>
        <Link to="/explorar">
          <img
            id="icon"
            src={ exploreIcon }
            alt="explorar"
            data-testid="explore-bottom-btn"
          />
        </Link>
        <Link to="/comidas">
          <input
            type="image"
            id="icon"
            src={ mealIcon }
            alt="comidas"
            data-testid="food-bottom-btn"
            onClick={ handleClick }
          />
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
