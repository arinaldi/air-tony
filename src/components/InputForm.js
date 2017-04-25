import React from 'react';
//import PropTypes from 'prop-types';

class InputForm extends React.Component {

  handleSubmit(e) {
    e.preventDefault();
    const location = this.refs.location.value;
    this.props.fetchLocation(location);
    this.refs.locationForm.reset();
  }

  render() {
    return (
      <form ref="locationForm" onSubmit={this.handleSubmit.bind(this)}>
        <input className="u-full-width" type="text" placeholder="Enter location" ref="location" />
      </form>
    );
  }
}

export default InputForm;
