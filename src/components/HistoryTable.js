import React from 'react';
import PropTypes from 'prop-types';
import { formatDate } from '../utilities';

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
    const { date, time } = formattedDate;

     return (
      // TODO: use UUID
      <tr key={i}>
        <td>{date}<br/>{time}</td>
        <td>{location.name}</td>
        <td>{location.aqi}</td>
        <td>
          <p className="circle" style={circleStyle}></p> 
        </td>
        <td>{location.description}</td>
      </tr>
    );
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

HistoryTable.propTypes = {
  locations: PropTypes.array.isRequired,
};

export default HistoryTable;
