import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import InputForm from '../components/InputForm';
import CurrentLocation from '../components/CurrentLocation';
import HistoryTable from '../components/HistoryTable';

const App = props => (
  <div className="container">
    <div className="row">
      <div className="six columns">
        <h1>Air Tony</h1>
        <InputForm fetchLocation={props.fetchLocation} />
        <p style={{color: props.message[1]}}>{props.message[0]}</p>
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
)

const AppContainer = connect(
  function mapStateToProps(state) {
    return {
      locations: state.locations,
      message: state.message,
    };
  },
  function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
  }
)(App);

export default AppContainer;
