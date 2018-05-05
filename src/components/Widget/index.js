import React, { Fragment } from 'react';
import classnames from 'classnames';
import './styles.css';

export default ({
  children,
  noPadding = false,
  title = '',
  col = 1,
  row = 1
}) => (
  <div className={classnames(`widget widget--col-${col} widget--row-${row}`, {
    'widget--no-padding': noPadding
  })}>
    {title && <span className="widget-title">{title}</span>}
    <span className="widget-content">
      {children}
    </span>
  </div>
);
