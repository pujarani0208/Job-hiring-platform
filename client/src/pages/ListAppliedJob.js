import './style.css';
import React, { Component } from 'react';
import { connect } from "react-redux";
import { Route, Switch, Link } from 'react-router-dom'
import InnerNavbar from './InnerNavbar';
import {
  Button,
  Card,
 CardTitle,
  CardSubtitle,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Spinner
} from "reactstrap";
import {CCard,
  CCollapse,
  CButton,
  CRow,
  CCol,
  CCardFooter,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CCardText,} from '@coreui/react';
import PropTypes from "prop-types";
import './style.css';
import { Redirect } from 'react-router-dom'
import { buttonReset} from '../actions/uiActions';
import { logout } from '../actions/authActions';
import { declineJobAplication , acceptJobAplication} from '../actions/jobActions';
import ApplyJobForm from './ApplyJobForm';
import ViewProfile from './ViewProfile';

class ListAppliedJobs extends Component {

	// Constructor
	constructor(props) {
		super(props);
    const propTypes = {
      button: PropTypes.bool,
      authState: PropTypes.object.isRequired,
      buttonReset: PropTypes.func.isRequired,
      logout: PropTypes.func.isRequired,
      declineJobAplication: PropTypes.func.isRequired,
      acceptJobAplication: PropTypes.func.isRequired,
    };
  
		this.state = {
			items: [],
			DataisLoaded: false,
		};
    
  }

 componentDidMount() {
  const jobId  = this.props.location.state.jobId;
    fetch(
    `http://localhost:3000/api/jobs/getAppliedJobs/${jobId}`)
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
		const { DataisLoaded, items } = this.state;
   
		if (!DataisLoaded) return <div>
			<h1> Pleease wait some time.... </h1> </div> ;
    if (!items || items.length === 0) {
      return (
        <>
        <div className="navbarMain">
          <InnerNavbar></InnerNavbar>
          </div>
          <div className='divTable'>
          <table>
          <tr>
          <th>Profile</th>
          <th>Description</th>
        </tr>
        <h6>No data found...</h6>
          </table>
          </div>
          </>
      )
    }
    return (
      <>
      <div className="navbarMain">
        <InnerNavbar></InnerNavbar>
        </div>
        <div className='divTable'>
        <table>
        <tr>
          <th>Profile</th>
          <th>Description</th>
        </tr>
        {
          items.map((item) => ( 
              <tr key = { item._id } > 
              <td> { item.personName }
              {/* <Button onClick={() => onButtonClick()}>Profile</Button> */}
                  {/* <Collapse isOpen={this.state.visible}> */}
              <ViewProfile userId = {item.userId}></ViewProfile>
                  {/* </Collapse> */}
              </td>
              <td>{ item.description } </td>
              <td>{item.location}</td>
              <td><CButton color="light" onClick={() => this.props.acceptJobAplication(`${item._id}`)}>Accept</CButton></td>
              <td><CButton color="light" onClick={() => this.props.declineJobAplication(`${item._id}`)}>Decline</CButton></td>
                  {/* <CCard  class='jobCard' color= {`${item.status}` === 'ACCEPT' ? 'light' : 'light'} textColor= {`${item.status}` === 'ACCEPT' ? 'primary' : 'secondary'} > */}
            </tr>
            ))
          }
          </table>
      </div>
      </>
  )
}
}

const mapStateToProps = (state) => ({ //Maps state to redux store as props
  button: state.ui.button,
  authState: state.auth,
});

export default connect(mapStateToProps, { logout, buttonReset, declineJobAplication, acceptJobAplication })(ListAppliedJobs);