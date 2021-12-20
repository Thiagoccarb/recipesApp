import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

const RecommendedCard = ({ index, name, image, id }) => {
  const history = useHistory();
  const { location: { pathname } } = history;
  const route = pathname.includes('comidas') ? 'bebidas' : 'comidas';
  return (
    <div
      className="recomendation-card"
    >
      <Link
        to={ `/${route}/${id}` }
        data-testid={ `${index}-recomendation-card` }
      >
        <h1
          data-testid={ `${index}-recomendation-title` }
        >
          {name}
        </h1>
        <img
          className="recommended-image"
          data-testid={ `${index}-card-img` }
          src={ image }
          alt={ name }
        />
      </Link>
    </div>
  );
};

RecommendedCard.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default RecommendedCard;
