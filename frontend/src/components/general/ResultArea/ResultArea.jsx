import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Spinner from 'react-spinkit';
import _ from 'underscore';
import moment from 'moment';
import PatientItem from '../PatientItem/PatientItem.jsx';

import './ResultArea.css';

class ResultArea extends Component {

  static defaultProps = {
  };

  static propTypes = {
  };

  state = {
    isLoading: true,
  };

  componentDidMount() {
    if (this.props.patientList) {
      this.setState({ isLoading: false });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.patientList || this.props.patientList !== nextProps.patientList) {
      this.setState({ isLoading: false });
    } else {
      this.setState({ isLoading: true });
    }
  }

  render() {
    const {
      patientList,
      filterBy,
    } = this.props;

    return (
      <div className="col-md-8 col-md-offset-1 result-area">
          {
            this.state.isLoading ?
              (
                <Spinner spinnerName="circle" className="loading-result"/>
              )
              :
              (
                <div>
                  <h4>{this.filterPatient().length || 'No'} results</h4>
                  <ul className="list-group scroll-list-group">
                    {
                      this.filterPatient().map((item, index) => {
                          return (
                            <li className="list-group-item" key={index}>
                              <PatientItem item={item}/>
                            </li>
                          );
                        })

                    }
                  </ul>
                </div>
              )
          }
      </div>
    );
  }

  filterPatient = () => {
    const {
      patientList,
      filterTime,
      filterStatus,
    } = this.props;

    let
      filteredPatientByStatus = patientList,
      filteredPatient = patientList;

    // #1: Filter by status via filterStatus
    if (filterStatus) {
      if (filterStatus.value === 'all') {
        filteredPatientByStatus = patientList;
      } else {
        filteredPatientByStatus =  _.filter(patientList, (pat) => {
          return pat.status == filterStatus.value;
        });
      }
    }

    // #2: Filter by time via filterTime
    if (filterTime) {
      switch (filterTime.value) {

        case 'last day':
          const hNow = moment();
          let diffInHours = '';
          filteredPatient = _.filter(filteredPatientByStatus, (pat) => {
            diffInHours = hNow.diff(pat.updatedAt, 'hours');
            return diffInHours <= 24;
          });
          break;

        case 'last week':
          const dNow = moment();
          let diffInDays = '';
          filteredPatient = _.filter(filteredPatientByStatus, (pat) => {
            diffInDays = dNow.diff(pat.updatedAt, 'days');
            return diffInDays <= 7;
          });
          break;

        default:
          filteredPatient = filteredPatientByStatus;
          break;
      }
    } else {
      filteredPatient = filteredPatientByStatus || patientList;
    }

    return filteredPatient;
  }
}

const mapStateToProps = (state, props) => {
  return {
    patientList: state.patientList,
    filterTime: state.filterTime,
    filterStatus: state.filterStatus,
  }
}

export default connect(mapStateToProps, null)(ResultArea);
