import React from 'react';
import PropTypes from 'prop-types';

function CurrentLocation(props) {
  const { name, aqi, color } = props.location;
  const circleStyle = {
    background: color,
  };

  return (
    <div className="current-location">
      <h4>{name}</h4>
      <p className="big-circle" style={circleStyle}>{aqi}</p>
    </div>
  );
}

CurrentLocation.propTypes = {
  location: PropTypes.shape({
    date: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    aqi: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  }),
};

CurrentLocation.defaultProps = {
  location: {
    date: '2017-05-02T15:53:39',
    name: 'Slam dunking air quality',
    aqi: 100,
    description: 'Great air quality',
    color: 'lightblue',
  },
};

export default CurrentLocation;
