import React, { Component } from 'react';
import { connect } from 'react-redux';
import { filterPatientByStatus, filterPatientByTime } from '../../../actions';

import './FilterArea.css';

class FilterArea extends Component {
  state = {
    statusOptions: ['all', 'open', 'close'],
    statusFilter: 'all',
    timeOptions: ['all', 'last day', 'last week'],
    timeFilter: 'all',
  };

  handleChangeStatus = (status) => {
    this.setState({ statusFilter: status });
    this.props.filterPatientByStatus({
      value: status,
    });
  };

  handleChangeTime = (time) => {
    this.setState({ timeFilter: time });
    this.props.filterPatientByTime({
      value: time,
    });
  };

  render() {
    return (
      <div className="col-md-3 filter-area">
        <div className="filter-status">
          <h5 className="text-muted">STATUS</h5>
          <div className="dropdown">
            <button className="btn btn-default dropdown-toggle custom-dropdown" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
              <span className="pull-left">{this.state.statusFilter}</span>
              <span className="caret custom-caret pull-right"></span>
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
              {
                this.state.statusOptions.map((item, index) => {
                  return (
                    <li key={index}><a onClick={this.handleChangeStatus.bind(this, item)}>{item}</a></li>
                  )
                })
              }
            </ul>
          </div>
        </div>

        <div className="filter-time">
          <h5 className="text-muted">UPDATED TIME</h5>
          <div className="dropdown">
            <button className="btn btn-default dropdown-toggle custom-dropdown" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
              <span className="pull-left">{this.state.timeFilter}</span>
              <span className="caret custom-caret pull-right"></span>
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
              {
                this.state.timeOptions.map((item, index) => {
                  return (
                    <li key={index}><a onClick={this.handleChangeTime.bind(this, item)}>{item}</a></li>
                  )
                })
              }
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => ({
  filterPatientByStatus: (filterStatus) => dispatch(filterPatientByStatus(filterStatus)),
  filterPatientByTime: (filterTime) => dispatch(filterPatientByTime(filterTime)),
});

export default connect(null, mapDispatchToProps)(FilterArea);
