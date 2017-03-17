import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { resetErrorMessage } from '../actions'

import './App.css'

class App extends Component {

  render() {
    return (
      <div className="container-fluid">
        {this.props.children}
      </div>
    )
  }
}

App.defaultProps = {
  // Injected by React Redux
  errorMessage: PropTypes.string,
  resetErrorMessage: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
  // Injected by React Router
  children: PropTypes.node,
};

const mapStateToProps = (state, ownProps) => ({
  errorMessage: state.errorMessage,
  inputValue: ownProps.location.pathname.substring(1)
});

export default connect(mapStateToProps, {
  resetErrorMessage
})(App)
