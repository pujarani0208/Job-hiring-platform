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
import {CCard,
  CButton,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CCardText,} from '@coreui/react';
import PropTypes from "prop-types";
import './style.css';
import { Redirect } from 'react-router-dom'
import { buttonReset} from '../actions/uiActions';
import { logout } from '../actions/authActions';
import ApplyJobForm from './ApplyJobForm';

class ListAppliedJobs extends Component {

	// Constructor
	constructor(props) {
		super(props);

    const propTypes = {
      button: PropTypes.bool,
      authState: PropTypes.object.isRequired,
      buttonReset: PropTypes.func.isRequired,
      logout: PropTypes.func.isRequired,
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

	// ComponentDidMount is used to
	// execute the code
	componentDidMount() {
		fetch(
"http://localhost:3000/api/jobs/getAllAppliedJobs")
			.then((res) => res.json())
			.then((json) => {
				this.setState({
					items: json['job'],
					DataisLoaded: true
				});
			})
	}
	render() {
    
    if(!this.props.authState.isAuthenticated) {
      return <Redirect to="/" />
    }

    const {user} = this.props.authState;
		const { DataisLoaded, items } = this.state;
		if (!DataisLoaded) return <div>
			<h1> Pleease wait some time.... </h1> </div> ;

    return (
       <CCard>
          <br></br>

          <CButton onClick={this.onLogout} color="primary">Logout</CButton>
      <CCardTitle><h1>{ user ? `Welcome, ${user.name}`: ''} <span role="img" aria-label="party-popper">🎉 </span> </h1></CCardTitle>
      <CCardBody>

      {
                items.map((item) => ( 
                  <CCard>
                <ol key = { item._id } >
                  <CCardHeader> <h5>Applicant Name: { item.personName }</h5></CCardHeader>,
                  <CCardBody>
                  <CCardTitle><h5>Contact Number: { item.contactNo }</h5></CCardTitle>,
                  <CCardText>
                  gender: { item.gender },
                  uniqueIdentity: { item.uniqueIdentity },
                  description: { item.description },
                  contactPersonProfile: { item.contactPersonProfile },
                  address: { item.address },
                  email: { item.email }, 
                  </CCardText>
                  <Switch>
\              <Route exact path ="/#" component={ApplyJobForm}/>
            </Switch>
            { this.props.button && <Link className='divStyle' to="/#">
               <CButton size="lg"  color="light">Decline Job</CButton>
               </Link>}
                  </CCardBody>
                  </ol>
                  </CCard>
                ))
            }
         </CCardBody>
      </CCard>
  )
}
}

const mapStateToProps = (state) => ({ //Maps state to redux store as props
  button: state.ui.button,
  authState: state.auth
});

export default connect(mapStateToProps, { logout, buttonReset })(ListAppliedJobs);