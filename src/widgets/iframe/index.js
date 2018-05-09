import React from 'react';
import Widget from '../../components/Widget';
import './styles.css';

export default ({ url, title='', col=1, row=1 }) => (
  <Widget noPadding col={col} row={row} title={title}>
    <iframe title={title} className="iframe-widget" src={url}></iframe>
  </Widget>
);
