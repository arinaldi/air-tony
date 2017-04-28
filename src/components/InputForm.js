import React from 'react';

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
        <input className="search" type="text" placeholder="Search" ref="location" />
        <input type="submit" value="submit" />
      </form>
    );
  }
}

export default InputForm;
