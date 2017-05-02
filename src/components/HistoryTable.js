import React from 'react';
import PropTypes from 'prop-types';
import HistoryTableRow from './HistoryTableRow';

const uuidV1 = require('uuid/v1');

function HistoryTable({ locations }) {
  const locationRows = locations.map((location) => {
    return <HistoryTableRow key={uuidV1()} location={location} />;
  });

  return (
    <table className="u-full-width">
      <thead>
        <tr>
          <th>Date</th>
          <th>Name</th>
          <th>Air Quality Index</th>
          <th>Status</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {locationRows}
      </tbody>
    </table>
  );
}

HistoryTable.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default HistoryTable;
