import React from 'react';
import PropTypes from 'prop-types';

class HistoryTable extends React.Component {

  constructor() {
    super();
    this.renderLocation = this.renderLocation.bind(this);
  }

  renderLocation(location, i) {
    return (
      <tr key={i}>
        <td>{location.date}</td>
        <td>{location.name}</td>
        <td>{location.aqi}</td>
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
