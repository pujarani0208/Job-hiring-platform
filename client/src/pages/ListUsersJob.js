import './style.css';
import React, { Component } from 'react';
import { connect } from "react-redux";
import { Route, Switch, Link } from 'react-router-dom'
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
import InnerNavbar from './InnerNavbar';
import {CCard,
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
import { declineJobAplication , deleteJobAplication} from '../actions/jobActions';

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
      deleteJobAplication: PropTypes.func.isRequired,
    };
  
    const onLogout = (e) => {
      e.preventDefault();
      this.props.buttonReset();
      this.props.logout();
    };

		this.state = {
			items: [],
			DataisLoaded: false
		};

  }

 componentDidMount() {
    const {user} = this.props.authState;
    fetch(
    `http://localhost:3000/api/jobs/getAppliedJobsForUser/${user.id}`)
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
    return (
      <>
      <div className="navbarMain">
        <InnerNavbar></InnerNavbar>
        </div>
      <div className='myDiv'>
        <div className='listMain'>
      <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 3 }}>
      {
                items.map((item) => ( 
                  <CCol xs>
                  <CCard color= {`${item.status}` === 'ACCEPT' ? 'light' : 'light'} textColor= {`${item.status}` === 'ACCEPT' ? 'primary' : 'secondary'} >
                <ol key = { item._id } >
                  <CCardHeader> <h5>Applicant Name: { item.personName }</h5></CCardHeader>,
                  <CCardBody>
                  <CCardTitle><h5>Contact Number: { item.contactNo }</h5></CCardTitle>,
                  <CCardText>
                  status: {item.status},
                  userId: {user.id}
                  gender: { item.gender },
                  uniqueIdentity: { item.uniqueIdentity },
                  description: { item.description },
                  contactPersonProfile: { item.contactPersonProfile },
                  address: { item.address },
                  email: { item.email }, 
                  </CCardText>
            <CButton size="lg"  color="light" onClick={() => this.props.deleteJobAplication(`${item._id}`)}>Delete</CButton>
               <CButton size="lg"  color="light" onClick={() => this.props.declineJobAplication(`${item._id}`)}>Decline</CButton>
                  </CCardBody>
                  </ol>
                  </CCard>
                  </CCol>
                ))
            }
        </CRow>
      </div>
      </div>
      </>
  )
}
}

const mapStateToProps = (state) => ({ //Maps state to redux store as props
  button: state.ui.button,
  authState: state.auth,
});

export default connect(mapStateToProps, { logout, buttonReset, declineJobAplication, deleteJobAplication })(ListAppliedJobs);