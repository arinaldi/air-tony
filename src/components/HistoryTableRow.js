import React from 'react';
import PropTypes from 'prop-types';
import { formatDate } from '../utilities';

function HistoryTableRow({ location }) {
  const circleStyle = {
    background: location.color,
  };

  const formattedDate = formatDate(location.date);
  const { date, time } = formattedDate;

  return (
    <tr>
      <td>{date}<br />{time}</td>
      <td>{location.name}</td>
      <td>{location.aqi}</td>
      <td>
        <p className="circle" style={circleStyle} />
      </td>
      <td>{location.description}</td>
    </tr>
  );
}

HistoryTableRow.propTypes = {
  location: PropTypes.shape({
    date: PropTypes.string,
    name: PropTypes.string,
    aqi: PropTypes.number,
    description: PropTypes.string,
    color: PropTypes.string,
  }).isRequired,
};

export default HistoryTableRow;
