import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Spinner from 'react-spinkit';
import { getPatientDetail } from '../../../actions';
import  Contact  from '../../general/Contact/Contact.jsx';
import axios from 'axios';
import blobUtil from 'blob-util';

import './PatientEditPage.css';

// const DEV_API_HOST = "http://localhost:3333";

class PatientEditPage extends Component {

  state = {
    patientDetail: {},
    isLoading: true,
    profilePhotoFile: null,
  };

  componentDidMount() {
    if (this.props.params) {
      this.props.getPatientDetail(this.props.params.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.patientDetail) {
      this.setState({
        patientDetail: nextProps.patientDetail,
        isLoading: false,
      });
    }
  }

  render () {
    let {
      patientDetail,
      isLoading,
    } = this.state;

    return (
      <div>
      {
        isLoading ?
        (
          <Spinner spinnerName="circle" className="loading-result"/>
        )
        :
        (
          <div className="container wrapper-inside">
            <div className="row custom-row">
                <div className="col-md-3">
                  <div className="text-center profile-wrapper">
                    <div className="image-upload">
                      <label className="upload-area" htmlFor="file-input">
                          <img src={(patientDetail.profilePhoto) ? (patientDetail.profilePhoto) : `http://placehold.it/100x100`} className="avatar img-circle" alt="avatar" width='124' height='124'/>
                      </label>
                      <input id="file-input" type="file" className="form-control" onChange={(e) => this.handleChangeImage(e)}/>
                    </div>
                  </div>
                </div>

                <div className="col-md-9">
                  <div className="row custom-row">
                    <div className="col-md-6 box-wrapper">
                      <p>PATIENT ID</p>
                      <input type="text" className="form-control" placeholder="12345" value={patientDetail._id} onChange={() => {}}  disabled/>
                    </div>
                    <div className="col-md-6 box-wrapper right">
                      <p>PATIENT NAME</p>
                      <input type="text" className="form-control" placeholder="username" value={patientDetail.name} onChange={(e) => this.handleChangeAll(e, 'name')}/>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 box-wrapper">
                      <p>BIRTHDAY</p>
                      <input type="text" className="form-control" placeholder="Birthday" value={patientDetail.birthday} onChange={(e) => this.handleChangeAll(e, 'birthday')}/>
                    </div>
                    <div className="col-md-6 box-wrapper right">
                      <p>GENDER</p>
                      <div className="option-wrapper">
                        <input type="radio" name="gender_select" id="maleOption" className="css-checkbox"
                               checked={patientDetail.gender === 'Male'}
                               onChange={() => this.handleChangeGender('Male')}
                        />

                        <label htmlFor="maleOption" className="css-label radGroup2">Male</label>
                        <input type="radio" name="gender_select" id="femaleOption" className="css-checkbox"
                               checked={patientDetail.gender === 'Female'}
                               onChange={() => this.handleChangeGender('Female')}
                        />

                          <label htmlFor="femaleOption" className="css-label radGroup2">Female</label>
                      </div>
                    </div>
                  </div>
                </div>
            </div>

            <div className="row custom-row">
              <div className="box-textarea-wrapper">
                <p>PAST MEDIACATION</p>
                <textarea className="form-control" rows="4" placeholder="Mediacation" value={patientDetail.pastMediacation} onChange={(e) => this.handleChangeAll(e, 'pastMediacation')}> </textarea>
              </div>
            </div>

            <div className="row custom-row">
              <div className="box-textarea-wrapper">
                <p>TAGS</p>
                <textarea className="form-control" rows="1" placeholder="Add a tag" value={this.joinTags(patientDetail.tags)} onChange={(e) => this.handleChangeAll(e, 'tags')}> </textarea>
              </div>
            </div>

            <hr />

            {
              patientDetail.contacts && patientDetail.contacts.length > 0 ?
                (
                  patientDetail.contacts.map((item, index) => {
                    return <Contact contact={item} key={index} contactNumber={index} handleChangeContact={this.handleChangeContact}/>;
                  })
                )
                :
                ''
            }

            <div className="row">
              <p className="text-info add-contact-btn" onClick={this.handleAddContact}><span className="glyphicon glyphicon-plus"> </span> Add another contact</p>
            </div>

            <hr />

            <div className="row custom-row">
              <div className="col-md-12">
                <p className="heading-section">Are you planning for pregnancy?</p>
                <div className="option-wrapper">
                  <div className="col-md-6">
                    <input type="radio" name="confirm_preg" id="yesOption" className="css-checkbox"
                           checked={patientDetail.answer.value}
                           onChange={() => this.handleChangeAll(true)}
                    />


                    <label htmlFor="yesOption" className="css-label radGroup2">Yes</label>
                  </div>
                  <div className="col-md-6">
                    <input type="radio" name="confirm_preg" id="noOption" className="css-checkbox"
                           checked={!patientDetail.answer.value}
                           onChange={() => this.handleChangeAnswer(false)}
                    />


                    <label htmlFor="noOption" className="css-label radGroup2">No</label>
                  </div>
                </div>
              </div>
            </div>

            <div className="row custom-row">
              <div className="col-md-12 box-textarea-wrapper">
                <p>IF YES, PLEASE ELABORATE</p>
                <textarea className="form-control" rows="4" placeholder="Elaborate" value={patientDetail.answer.context} onChange={(e) => this.handleChangeAll(e, 'answer.context')}> </textarea>
              </div>
            </div>

            <div className="row">
              <div className="col-md-2 col-no-padding">
                <button type="button" className="btn btn-block btn-warning" onClick={() => this.handleUploadInfo()}>Save</button>
              </div>
            </div>
          </div>
        )
      }
      </div>
    );
  }

  handleUploadInfo = () => {
    // Upload profile and fetch profile photo URL
    if (this.state.profilePhotoFile) {
      let formData = new FormData();
      let xhr      = new XMLHttpRequest();
      const self = this;

      formData.append("vault-file", this.state.profilePhotoFile, this.state.profilePhotoFile.name);

      xhr.open("POST", `/api/upload-file`, true);

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            let newAccess = self.state.patientDetail;
            newAccess.profilePhoto = JSON.parse(xhr.responseText).tmpUrl;
            self.setState({
              patientDetail: newAccess,
            }, () => {
              axios.put(`/api/patient`, self.state.patientDetail)
                .then(function (response) {
                  if (response.status === 200 || response.statusText === 'OK') {
                    browserHistory.push('/');
                  }
                })
                .catch(function (error) {
                  console.log(error)
                });
            });

          } else {
            console.error(xhr.statusText);
          }
        }
      };

      xhr.send(formData);
    } else {
      axios.put(`/api/patient`, this.state.patientDetail)
        .then(function (response) {
          if (response.status === 200 || response.statusText === "OK") {
            browserHistory.push('/');
          }
        })
        .catch(function (error) {
          console.log(error)
        });
    }
  };

  handleChangeImage = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];


    reader.onloadend = () => {
      let newAccess = this.state.patientDetail;
      newAccess.profilePhoto = reader.result;

      this.setState({
        profilePhotoFile: file,
        patientDetail: newAccess,
      });
    };

    reader.readAsDataURL(file)
  };

  handleChangeAll = (event, type) => {
    event.preventDefault();

    let newAccess = this.state.patientDetail;
    const val = event.target.value;

    switch (type) {
      case 'name':
        newAccess.name = val;
        break;
      case 'birthday':
        newAccess.birthday = val;
        break;
      case 'pastMediacation':
        newAccess.pastMediacation = val;
        break;
      case 'tags':
        newAccess.tags = this.splitTags(val);
        break;
      case 'answer.context':
        newAccess.answer.context = val;
        break;
      default:
        break;
    }

    this.setState({ patientDetail: newAccess });
  };

  handleChangeContact = (event, contact, contactNumber, type) => {
    const contactId = contact._id;
    const val = event.target.value;

    let newAccess = this.state.patientDetail;

    this.state.patientDetail.contacts.map((item, index) => {
      if (item._id === contactId || contactNumber === index) {
        switch (type) {
          case 'contact.address':
            newAccess.contacts[index].address = val;
            break;
          case 'contact.postalCode':
            newAccess.contacts[index].postalCode = val;
            break;
          case 'contact.email':
            newAccess.contacts[index].email = val;
            break;
        }
      }
    });

    this.setState({ patientDetail: newAccess });
  };

  handleAddContact = () => {
    let newAccess = this.state.patientDetail;

    newAccess.contacts.push({
      address: 'Sample address',
      postalCode: 'Sample Postal Code',
      email: 'Sample Email',
    });

    this.setState({ patientDetail: newAccess });
  }

  handleChangeAnswer = (answer) => {
    let newAccess = this.state.patientDetail;
    newAccess.answer.value = answer;
    this.setState({
      patientDetail: newAccess,
    });
  };

  handleChangeGender = (gender) => {
    let newAccess = this.state.patientDetail;
    newAccess.gender = gender;
    this.setState({
      patientDetail: newAccess,
    });
  };

  joinTags = (tags) => {
    if (tags)
      return tags.join(',');
  };

  splitTags = (tags) => {
    return tags.split(',');
  }
}

const mapStateToProps = (state, props) => {
  return {
    patientDetail: state.patientDetail,
  }
};

const mapDispatchToProps = (dispatch, props) => ({
  getPatientDetail: (patientId) => dispatch(getPatientDetail(patientId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PatientEditPage);
