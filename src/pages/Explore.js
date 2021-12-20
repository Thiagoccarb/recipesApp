import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Explore.css';

function Explore() {
  return (
    <>
      <Header
        title="Explorar"
        visible={ false }
      />
      <div
        className="explore-buttons"
      >
        <Link
          to="/explorar/comidas"
        >
          <button
            type="button"
            data-testid="explore-food"
          >
            Explorar Comidas
          </button>
        </Link>
        <Link
          to="/explorar/bebidas"
        >
          <button
            data-testid="explore-drinks"
            type="button"
          >
            Explorar Bebidas
          </button>
        </Link>
      </div>
      <Footer />
    </>
  );
}

export default Explore;
