import React from 'react';
import PropTypes from 'prop-types';

function CurrentLocation({ location }) {
  const circleStyle = {
    background: location.color,
  };

  return (
    <div className="current-location">
      <h4>{location.name}</h4>
      <p className="big-circle" style={circleStyle}>{location.aqi}</p>
    </div>
  );
}

CurrentLocation.propTypes = {
  location: PropTypes.shape({
    name: PropTypes.string.isRequired,
    aqi: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
  }),
};

CurrentLocation.defaultProps = {
  location: PropTypes.shape({
    name: 'Air Tony',
    aqi: 100,
    color: 'blue',
  }),
};

export default CurrentLocation;
