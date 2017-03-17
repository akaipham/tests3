import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { searchPatient } from '../../../actions';

import './SearchArea.css';

class SearchArea extends Component {
  searchPatient = () => {
    const keyword = document.getElementById('keyword').value;
    this.props.searchPatient(keyword);
  };

  render() {
    return (
      <div className="row search-area center-block">
        <form>
          <div className="form-group col-md-5 custom-search-input">
            <input type="text" className="form-control" id="keyword" placeholder="Enter patient ID, name, phone..."></input>
          </div>
          <div className="form-group col-md-5 custom-search-input">
            <input type="email" className="form-control" id="temp" placeholder="Find in all hospital"></input>
          </div>
          <div className="col-md-1 text-center">
            <button type="button" className="btn btn-warning" onClick={this.searchPatient.bind(this)}><span className="glyphicon glyphicon-search"></span>  Find</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => ({
  searchPatient: (param) => dispatch(searchPatient(param)),
});

export default connect(null, mapDispatchToProps)(SearchArea);

