import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import shareIcon from '../images/shareIcon.svg';

function ShareButton() {
  const [copied, setCopied] = useState(false);
  const history = useHistory();
  const { location: { pathname } } = history;
  const route = pathname.includes('comidas') ? 'comidas' : 'bebidas';

  const id = pathname.split('/')[2];
  const MAX_NUMBER = 2000;

  return (
    <>
      {copied ? <span>Link copiado!</span> : null}
      <CopyToClipboard
        text={ `http://localhost:3000/${route}/${id}` }
        onCopy={ () => {
          setCopied(true);
          setTimeout(() => setCopied(false), MAX_NUMBER);
        } }
      >
        <input
          type="image"
          data-testid="share-btn"
          src={ shareIcon }
          alt={ shareIcon }
        />
      </CopyToClipboard>
    </>
  );
}

export default ShareButton;
