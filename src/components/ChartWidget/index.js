import React from 'react';
import Widget from '../Widget';
import Chart from '../Chart';
import Variation from '../Variation';
import './styles.css';

export default ({
  title,
  amount,
  amountDescription,
  variationAmount,
  variationDirection,
  data
}) => (
  <Widget className="widget--chart" title={title}>
    <div className="row">
      <div>
        <div className="text-medium">{amount}</div>
        <span className="text-small text-uppercase">{amountDescription}</span>
      </div>
      {variationAmount && <Variation amount={variationAmount} direction={variationDirection} />}
    </div>
    <Chart data={data} />
  </Widget>
);
