import React from 'react';
//import PropTypes from 'prop-types';

function formatDate(isoDate) {
  const date = new Date(isoDate);
  const newDate = {
    date: date.toDateString().substring(4),
    time: date.toLocaleTimeString()
  };
  return newDate;
}

class HistoryTable extends React.Component {

  constructor() {
    super();
    this.renderLocation = this.renderLocation.bind(this);
  }

  renderLocation(location, i) {

    const circleStyle = {
      background: location.color
    };

    const formattedDate = formatDate(location.date);

     return (
      <tr key={i}>
        <td>{formattedDate.date}<br/>{formattedDate.time}</td>
        <td>{location.name}</td>
        <td>{location.aqi}</td>
        <td>
          <p className="circle" style={circleStyle}></p> 
        </td>
        <td>{location.desc}</td>
      </tr>
    )
  }

  render() {
    return (
      <table className="u-full-width">
        <thead>
          <tr>
            <th>Date</th>
            <th>Name</th>
            <th>AQI</th>
            <th>Status</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {this.props.locations.map(this.renderLocation)}
        </tbody>
      </table>
    );
  }
}

export default HistoryTable;
