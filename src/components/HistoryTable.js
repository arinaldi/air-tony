import React from 'react';
//import PropTypes from 'prop-types';

class HistoryTable extends React.Component {

  constructor() {
    super();
    this.renderLocation = this.renderLocation.bind(this);
  }

  renderLocation(location, i) {
    return (
      <tr key={i}>
        <td>{location.location}</td>
        <td>{location.air}</td>
      </tr>
    )
  }

  render() {
    return (
      <table className="u-full-width">
        <thead>
          <tr>
            <th>Location</th>
            <th>Air Quality</th>
          </tr>
        </thead>
        <tbody>
          {this.props.locations.map(this.renderLocation)}
        {/*console.log(this.props)*/}
        </tbody>
      </table>
    );
  }
}

export default HistoryTable;
