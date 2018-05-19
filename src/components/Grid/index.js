import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

class Grid extends Component {
  componentDidMount() {
    this.setPollyfills();
  }

  setPollyfills() {
    import ('../../utils/css-polyfills');
    import ('../../utils/modernizr');
  }

  render() {
    const { children, resolution } = this.props;

    return (
      <div className={`grid grid--${resolution}`}>
        {children}
      </div>
    );
  }
}

Grid.defaultProps = {
  resolution: '720p'
};

Grid.propTypes = {
  children: PropTypes.node,
  resolution: PropTypes.oneOf(['720p', '1080p', '1440p', '2160p'])
};

export default Grid;
