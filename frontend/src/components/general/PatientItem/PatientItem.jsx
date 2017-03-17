import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'
import moment from 'moment';

import './PatientItem.css';

export default class PatientItem extends Component {

  render() {
    const {
      item,
    } = this.props;
    return (
      <div className="media">
        <div className="media-left">
          <a href={'/edit/' + item._id}>
            <img className="media-object strict-size" src={item.profilePhoto || `http://placehold.it/100x100`} alt="..."></img>
          </a>
        </div>
        <div className="media-body">
          <div className="edit-wrapper text-center" onClick={this.goToUpdateProfile}>
            <a href={`/edit/${item._id}`} >
              <span className="glyphicon glyphicon-pencil"></span>
            </a>
          </div>
          <h4 className="media-heading"><a href={'/edit/' + item._id}>{item.name}</a> <span className="label label-success">NEW</span></h4>
          <div className="row">
            <div className="col-md-6">
              <p>CP &middot; Full time &middot; <span className="text-info">Need apointment</span></p>
              <p>Updated Time: {this.formatDate(item.updatedAt)}</p>
            </div>
            <div className="col-md-6">
              {
                item.contacts[0] ?
                  (
                    <p><i className="fa fa-lg fa-map-marker" aria-hidden="true"></i> {item.contacts[0].address}</p>
                  )
                  :
                  ''
              }
            </div>
          </div>
        </div>
      </div>
    );
  }

  formatDate = (date) => {
    return moment(date).format("ddd, MM Do YY, h:mm:ss a");
  };
}

PatientItem.propTypes = {
  item: PropTypes.object.isRequired,
};
