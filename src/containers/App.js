import React, { Component } from 'react';
import InputForm from '../components/InputForm';
import HistoryTable from '../components/HistoryTable';
//import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';

class App extends Component {

  render() {
    const { addLocation, locations } = this.props;

    return (
      <div className="container">
        <div className="row">
          <div className="twelve columns">
            <h1>Air Tony</h1>
          </div>
        </div>
        <div className="row">
          <div className="twelve columns">
            <InputForm locations={locations} addLocation={addLocation} />
          </div>
        </div>
        <div className="row">
          <div className="twelve columns">
            <p>Loading or error message</p>
            <HistoryTable locations={locations} />
          </div>
        </div>
      </div>
    );
  }
}

//export default App;

const AppContainer = connect(
  function mapStateToProps(state) {
    return {
      locations: state.locations
    };
  },
  function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
  }
)(App);

export default AppContainer;
