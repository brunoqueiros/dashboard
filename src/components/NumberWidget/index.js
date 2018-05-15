import React from 'react';
import Widget from '../Widget';
import Variation from '../Variation';

export default ({
  title,
  loading,
  error,
  amount,
  amountDescription,
  variationAmount,
  variationDirection,
  data
}) => (
  <Widget title={title} loading={loading} error={error}>
    {variationAmount && <Variation amount={variationAmount} direction={variationDirection} />}
    <div className="text-large">{amount}</div>
    <span className="text-small text-uppercase">{amountDescription}</span>
  </Widget>
);
