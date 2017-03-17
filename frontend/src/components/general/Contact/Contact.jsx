import React, { Component } from 'react';
import { connect } from 'react-redux';
import { filterPatient } from '../../../actions';

import './Contact.css';

class Contact extends Component {
  render() {
    const {
      contact,
      contactNumber,
      handleChangeContact,
    } = this.props;

    return (
      <div className="row">
        <div className="col-md-1">
          <p className="heading-section">Contact #{contactNumber + 1}</p>
        </div>
        <div className="col-md-10 col-md-offset-1">
          <div className="row custom-row">
            <div className="col-md-6 box-wrapper">
              <p>ADDRESS</p>
              <input type="text" className="form-control" placeholder="" value={contact.address} onChange={(e) => handleChangeContact(e, contact, contactNumber, 'contact.address')} />
            </div>
            <div className="col-md-6 box-wrapper right">
              <p>POSTAL CODE</p>
              <input type="text" className="form-control" placeholder="" value={contact.postalCode} onChange={(e) => handleChangeContact(e, contact, contactNumber, 'contact.postalCode')} />
            </div>
          </div>

          <div className="row custom-row">
            <div className="col-md-12 box-wrapper full">
              <p>EMAIL</p>
              <input type="text" className="form-control" placeholder="" value={contact.email} onChange={(e) => handleChangeContact(e, contact, contactNumber, 'contact.email')} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;
