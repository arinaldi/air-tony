import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import * as actions from '../actions';
import InputForm from '../components/InputForm';
import CurrentLocation from '../components/CurrentLocation';
import HistoryTable from '../components/HistoryTable';
import { changeStatusColor } from '../utilities';

function App(props) {
  return (
    <div className="container">
      <div className="row">
        <div className="six columns">
          <h1>Air Tony</h1>
          <InputForm
            fetchLocation={props.fetchLocation}
            changeStatus={props.changeStatus}
          />
          <p style={{ color: changeStatusColor(props.message[1]) }}>{props.message[0]}</p>
        </div>
        <div className="six columns">
          <CurrentLocation location={props.locations[0]} />
        </div>
      </div>
      <div className="row">
        <div className="twelve columns">
          <HistoryTable locations={props.locations} />
        </div>
      </div>
    </div>
  );
}

App.propTypes = {
  fetchLocation: PropTypes.func.isRequired,
  changeStatus: PropTypes.func.isRequired,
  locations: PropTypes.arrayOf(PropTypes.object).isRequired,
  message: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const AppContainer = connect(
  function mapStateToProps({ locations, message }) {
    return {
      locations,
      message,
    };
  },
  function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
  },
)(App);

export default AppContainer;
