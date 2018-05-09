import React, { Fragment } from 'react';
import classnames from 'classnames';
import Error from '../Error';
import Loader from '../Loader';
import './styles.css';

export default ({
  children,
  lastUpdated,
  noPadding = false,
  error = false,
  loading = false,
  title = '',
  col = 1,
  row = 1
}) => (
  <div className={classnames(`widget widget--col-${col} widget--row-${row}`, {
    'widget--no-padding': noPadding
  })}>
    {title && <span className="widget-title">{title}</span>}
    <span className="widget-content">
      {error ?
        <Error />
      :
        loading ? <Loader /> : children
      }
    </span>
    {lastUpdated && <span className="text-small">Last updated at {lastUpdated}</span>}
  </div>
);
