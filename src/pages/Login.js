import { shape, func } from 'prop-types';
import React, { useState } from 'react';
import '../styles/Login.css';

function Login({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Função para validar o email, cada check de if retornará false e o botão não ficará ativado
  const MIN_PASSWORD_LENGTH = 6;
  const validate = (password.length > MIN_PASSWORD_LENGTH
      && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email));

  const saveToken = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/comidas');
  };

  return (
    <section className="login">
      <form>
        <h1>
          Login
        </h1>
        <label htmlFor="email">
          Email
          <input
            type="text"
            id="email"
            name="email"
            value={ email }
            onChange={ (e) => setEmail(e.target.value) }
            data-testid="email-input"
            placeholder="type your email"
          />
        </label>
        <label htmlFor="password">
          Senha
          <input
            type="password"
            id="password"
            name="password"
            value={ password }
            onChange={ (e) => setPassword(e.target.value) }
            data-testid="password-input"
            placeholder="type your email"
          />
        </label>
        <button
          type="button"
          id="button"
          data-testid="login-submit-btn"
          disabled={ !validate }
          onClick={ saveToken }
        >
          Entrar
        </button>
      </form>
    </section>
  );
}

Login.propTypes = {
  history: shape({
    push: func,
  }).isRequired,
};

export default Login;
