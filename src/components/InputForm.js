import React from 'react';
import PropTypes from 'prop-types';

class InputForm extends React.Component {

  constructor() {
    super();
    this.state = {
      inputText: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const location = this.state.inputText;
    if (location) {
      this.props.fetchLocation(location);
      this.setState({
        inputText: '',
      });
    } else {
      this.props.changeStatus('Input cannot be empty', 'error');
    }
  }

  handleChange({ target: { value } }) {
    this.setState({
      inputText: value,
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          className="search"
          type="text"
          placeholder="Search"
          value={this.state.inputText}
          onChange={this.handleChange}
        />
        <input type="submit" value="submit" disabled={!this.state.inputText} />
      </form>
    );
  }
}

InputForm.propTypes = {
  fetchLocation: PropTypes.func.isRequired,
  changeStatus: PropTypes.func.isRequired,
};

export default InputForm;
