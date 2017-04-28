import React from 'react';

class CurrentLocation extends React.Component {

  render() {
    const { location } = this.props;
    const circleStyle = {
      background: location.color
    };

    return (
      <div className="current-location">
        <h4>{location.name}</h4>
        <p className="big-circle" style={circleStyle}>{location.aqi}</p> 
      </div>
    );
  }
}

export default CurrentLocation;
