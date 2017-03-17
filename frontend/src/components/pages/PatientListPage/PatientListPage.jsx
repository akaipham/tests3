import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchAllPatient } from '../../../actions';

import './PatientListPage.css';

import SearchArea from '../../general/SearchArea/SearchArea.jsx';
import FilterArea from '../../general/FilterArea/FilterArea.jsx';
import ResultArea from '../../general/ResultArea/ResultArea.jsx';

class PatentListPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchAllPatient();
  }

  render () {
    return (
      <div className="container-fluid">
        <SearchArea />
        <div className="row list-area">
          <FilterArea />
          <ResultArea />
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state, props) => ({
});

const mapDispatchToProps = (dispatch, props) => ({
  fetchAllPatient: () => dispatch(fetchAllPatient()),
});

export default connect(null, mapDispatchToProps)(PatentListPage);