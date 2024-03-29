import './style.css';
import React, { Component } from 'react';
import { connect } from "react-redux";
import { Route, Switch, Link } from 'react-router-dom'
import Popup from 'reactjs-popup';
import {
  Button,
} from "reactstrap";
import {CCard,
  CRow,
  CCol,
  CButton,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CContainer,
  CCardText,} from '@coreui/react';
import { hashHistory } from 'react-router';
import InnerNavbar from './InnerNavbar';
import PropTypes from "prop-types";
import './style.css';
import { Redirect } from 'react-router-dom'
import { buttonReset} from '../actions/uiActions';
import { logout } from '../actions/authActions';
import ApplyJobForm from './ApplyJobForm';
import ListAppliedJob from './ListAppliedJob';
import { getAllAppliedJobs, deactivateJob } from '../actions/jobActions';
import { AiFillInfoCircle } from "react-icons/ai";


class JobDetails extends Component {

	// Constructor
	constructor(props) {
		super(props);

    const propTypes = {
      button: PropTypes.bool,
      authState: PropTypes.object.isRequired,
      buttonReset: PropTypes.func.isRequired,
      logout: PropTypes.func.isRequired,
      getAllAppliedJobs: PropTypes.func.isRequired,
      deactivateJob: PropTypes.func.isRequired,
      jobId: PropTypes.object.isRequired,
      userId: PropTypes.object.isRequired
    };
		this.state = {
			items: [],
			DataisLoaded: false
		};
}
	// ComponentDidMount is used to
	// execute the code
	componentDidMount() {
		fetch(
`http://localhost:3000/api/jobs/getAllPostedJobs`)
			.then((res) => res.json())
			.then((json) => {
				this.setState({
					items: json,
					DataisLoaded: true
				});
			})
	}

	render() {
    
    if(!this.props.authState.isAuthenticated) {
      return <Redirect to="/login" />
    }

    const {user} = this.props.authState;
		const { DataisLoaded, items } = this.state;
		if (!DataisLoaded) return <div>
			<h1> Pleease wait some time.... </h1> </div> ;
    if (!items || items.length === 0) {
      return (
      <>
    <div className='main'>
      <div className="navbarMain">
        <InnerNavbar></InnerNavbar>
        </div>
        <div className='divTable'>
        <table>
        <tr>
          <th>Job Title</th>
          <th>Company Name</th>
          <th>Location</th>
          <th>Job Status</th>
          <th></th>
          <th></th>
        </tr>
        <h6>No data found...</h6>
        </table>
        </div>
        </div>
        </>
    )}
    return (
      <>
    <div className='main'>
      <div className="navbarMain">
        <InnerNavbar></InnerNavbar>
        </div>
        <div className='divTable'>
        <table>
        <tr>
          <th>Job Title</th>
          <th>Company Name</th>
          <th>Salary</th>
          <th>Location</th>
          <th>Contact</th>
          <th>Email</th>
          <th> Job Status</th>
        </tr>
            {
                items.map((item) => (
                  <tr key = { item._id } > 
              <td><Popup trigger=
                {<h6  color="dark">{item.jobTitle}<AiFillInfoCircle /></h6>}
                position="center">
                  <CCard color= {`${item.status}` === 'ACCEPT' ? 'light' : 'light'} textColor= {`${item.status}` === 'ACCEPT' ? 'primary' : 'secondary'} >
                  <CCardHeader> <h5>{item.companyName }</h5></CCardHeader>
                  <CCardBody>
                  <CCardTitle><h5>{item.jobTitle}</h5></CCardTitle>
                  <CCardText>
                  <p className='paraBreak'>
                  Openings: { item.openings }<br></br>
                  Salary: { item.salary }<br></br>
                  Description: { item.description }<br></br>
                  ContactNo: { item.contactNo }<br></br>
                  Email: { item.email }<br></br>
                  Location: {item.location}<br></br>
                  jobAddress: { item.jobAddress }</p>
                  </CCardText>
                  </CCardBody>
                  </CCard>               
                  </Popup></td>
              <td>{item.companyName }</td>
              <td>{item.salary }</td>
              <td>{item.location}</td>   
              <td>{item.contactNo}</td>   
              <td>{item.email}</td>   
              <ApplyJobForm jobId = {item._id} userId = {user.id}></ApplyJobForm>
            </tr>
                ))
            }
            </table>
            </div>
            </div>
            </>
  )
}
}

const mapStateToProps = (state) => ({ //Maps state to redux store as props
  button: state.ui.button,
  authState: state.auth,
  jobId: state.jobId,
  userId: state.userId
});

export default connect(mapStateToProps, { logout, buttonReset, deactivateJob })(JobDetails);