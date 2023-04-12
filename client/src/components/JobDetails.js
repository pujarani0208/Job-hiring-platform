import './style.css';
import React, { Component } from 'react';
import { connect } from "react-redux";
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
import PropTypes from "prop-types";
import './style.css';
import { Redirect } from 'react-router-dom'
import { postJob } from '../actions/jobActions';
import { buttonReset} from '../actions/uiActions';
import { logout } from '../actions/authActions';

class JobDetails extends Component {

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
"http://localhost:3000/api/jobs/getAllPostedJobs")
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
    <div className="container">
    <div className="main">
       <Card>
         <CardBody>
      <CardTitle><h1>{ user ? `Welcome, ${user.name}`: ''} <span role="img" aria-label="party-popper">🎉 </span> </h1></CardTitle>
      <br/>
        <CardSubtitle><h5> You are now Logged In <span role="img" aria-label="clap">👏 </span></h5></CardSubtitle>
      <br/>
      {
                items.map((item) => ( 
                <ol key = { item._id } >
                  jobTitle: { item.jobTitle },
                  openings: { item.openings },
                  location: { item.location },
                  salary: { item.salary },
                  description: { item.description },
                  companyName: { item.companyName },
                  personName: { item.personName },
                  contactNo: { item.contactNo },
                  contactPersonProfile: { item.contactPersonProfile },
                  jobAddress: { item.jobAddress },
                  email: { item.email }, 
                  </ol>
                ))
            }
      <Button size="lg" onClick={this.onLogout} color="primary">Logout</Button>
         </CardBody>
      </Card>
    </div>
  </div>
  )
}
}

const mapStateToProps = (state) => ({ //Maps state to redux store as props
  button: state.ui.button,
  authState: state.auth
});

export default connect(mapStateToProps, { logout, buttonReset })(JobDetails);