import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import InputForm from '../components/InputForm';
import HistoryTable from '../components/HistoryTable';

const App = props => (
  <div className="container">
    <div className="row">
      <div className="twelve columns">
        <h1>Air Tony</h1>
      </div>
    </div>
    <div className="row">
      <div className="twelve columns">
        <InputForm fetchLocation={props.fetchLocation} />
      </div>
    </div>
    <div className="row">
      <div className="twelve columns">
        <p>Loading or error message</p>
        <HistoryTable locations={props.locations} />
      </div>
    </div>
  </div>
);

const AppContainer = connect(
  function mapStateToProps(state) {
    return {
      locations: state.locations,
    };
  },
  function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
  },
)(App);

export default AppContainer;
