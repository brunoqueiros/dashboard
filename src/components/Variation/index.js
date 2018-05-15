import React from 'react';
import classnames from 'classnames';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faChevronUp from '@fortawesome/fontawesome-free-solid/faChevronUp';
import faChevronDown from '@fortawesome/fontawesome-free-solid/faChevronDown';

export default ({ amount, direction }) => (
  <span className={classnames('text-small', {
    'text-green': direction === 'up',
    'text-red': direction === 'down',
  })}>
    {amount} {direction === 'up' ?
      <FontAwesomeIcon icon={faChevronUp} /> :
      <FontAwesomeIcon icon={faChevronDown} />
    }
  </span>
);
