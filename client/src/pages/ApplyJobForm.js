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
  Alert,
  Spinner
} from "reactstrap";
import PropTypes from "prop-types";
import './style.css';
import { Redirect } from 'react-router-dom'
import { applyJobForm } from '../actions/jobActions';
import { logout } from '../actions/authActions';
import { buttonClicked, buttonReset } from "../actions/uiActions";

 export class ApplyJobForm extends Component {
  constructor(props) {
		super(props);
    this.state={
      value:this.props.location.state,
  }
  const state = {
    msg: "",
    gender: "",
    uniqueIdentity: "",
    location: "",
    salary: "",
    description: "",
    personName: "",
    contactNo: "",
    contactPersonProfile: "",
    address: "",
    email: "",
  };
  const propTypes = {
    buttonClicked: PropTypes.func.isRequired,
    button: PropTypes.bool,
    authState: PropTypes.object.isRequired,
    buttonReset: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    applyJobForm: PropTypes.func.isRequired,
    status: PropTypes.object.isRequired,
  };
  }

  onLogout = (e) => {
    e.preventDefault();
    this.props.buttonReset();
    this.props.logout();
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Removes sign in and register buttons from homepage
  // upon mounting of Register component
  componentDidMount() {
    this.props.buttonClicked();
  }
  componentDidUpdate(prevProps) {
    const status = this.props.status;
    // Changes status message if it is different from previous message
    if (status !== prevProps.status) {
      if (status.id === "JOB_APPLIED") {
        this.setState({ msg: status.statusMsg });
      } else {
        this.setState({ msg: this.props.status.statusMsg });
      }
    }

    // Redirects to Log In screen after a delay of 2secs if successfully registered
    if (status.id === "JOB_APPLIED") {
      setTimeout(() => {
        this.props.history.push("/getAllPostedJobs");
      }, 2000);
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {gender , uniqueIdentity, location, description, personName, contactNo, contactPersonProfile, address, email} = this.state;
    const data = {gender , uniqueIdentity, location, description, personName, contactNo, contactPersonProfile, address, email};
    data.userId = this.props.location.state.userId;
    data.jobId = this.props.location.state.jobId;
    console.log(data);
    this.props.applyJobForm(data);
  };
  render() {
    let className = "divStyle";

    // If HTTP 400 error, render alert with red color, else if
    // it is 200 OK, render alert in green
    let alert;
    if (this.state.msg && this.props.status.respCode >= 400) {
      alert = <Alert color="danger">{this.state.msg}</Alert>;
    } else if (this.state.msg && this.props.status.respCode === 200) {
      alert = (
        <Alert color="success">
          {this.state.msg} <br /> Redirecting to Log In screen
        </Alert>
      );
    }

    if (!this.props.button) {
      className = "formStyle";
    }
    if(!this.props.authState.isAuthenticated) {
      return <Redirect to="/" />
    }
    const {user} = this.props.authState;

    return (
    
    <div className={className}>
    <Card>
        <CardBody >
          <CardTitle> <h2><strong>Apply for job</strong></h2></CardTitle>
          <CardSubtitle><h1>{ user ? `Welcome job details,${user.name}`: ''} <span role="img" aria-label="party-popper">🎉 </span> </h1></CardSubtitle>
        <Button size="lg" onClick={this.onLogout} color="primary">Logout</Button>
        {alert}
          <Form onSubmit={this.onSubmit} >
          <FormGroup>
            <br></br>
          <Label for="gender">Gender</Label>
          <Input
                  type="text"
                  name="gender"
                  id="gender"
                  placeholder="Enter your gender"
                  className="mb-3"
                  size="lg"
                  onChange={this.onChange}
                />
          <Label for="uniqueIdentity">Unique Identiy Number</Label>
          <Input
                  type="text"
                  name="uniqueIdentity"
                  id="uniqueIdentity"
                  placeholder="Enter your unique Identity Number"
                  className="mb-3"
                  size="lg"
                  onChange={this.onChange}
                />
            <Label for="location">Your Location</Label>
            <Input
                  type="text"
                  name="location"
                  id="location"
                  placeholder="Enter your location"
                  className="mb-3"
                  size="lg"
                  onChange={this.onChange}
                />
            <Label for="description">Description</Label>
            <Input
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Enter description"
                  className="mb-3"
                  size="lg"
                  onChange={this.onChange}
                />
            <Label for="personName">Enter your name</Label>
            <Input
                  type="text"
                  name="personName"
                  id="personName"
                  placeholder="Enter your name"
                  className="mb-3"
                  size="lg"
                  onChange={this.onChange}
                />
              <Label for="contactNo">Contact No.</Label>
            <Input
                  type="text"
                  name="contactNo"
                  id="contactNo"
                  placeholder="Enter your contact"
                  className="mb-3"
                  size="lg"
                  onChange={this.onChange}
                />
              <Label for="contactPersonProfile">Contact Person Profile</Label>
            <Input
                  type="text"
                  name="contactPersonProfile"
                  id="contactPersonProfile"
                  placeholder="Enter Contact Person Profile"
                  className="mb-3"
                  size="lg"
                  onChange={this.onChange}
                />
              <Label for="address">Current Address</Label>
            <Input
                  type="text"
                  name="address"
                  id="address"
                  placeholder="Enter your current address"
                  className="mb-3"
                  size="lg"
                  onChange={this.onChange}
                />
            <Label for="email">E-mail</Label>
            <Input
              type="email"
              name="email"
              id="email"
              size="lg"
              placeholder="you@youremail.com"
              className="mb-3"
              onChange={this.onChange}
            />
            <Button size="lg" color="dark" style={{ marginTop: "2rem" }} block>
               { this.props.loading ?
               <span >Applying job.. <Spinner size="sm" color="light" /></span> : <span>Apply Job</span>}
            </Button>
          </FormGroup>
        </Form>
        </CardBody>
    </Card>
    </div>    
    )
  }
}
const mapStateToProps = (state) => ({ //Maps state element in redux store to props
  //location of element in the state is on the right and key is on the left
  button: state.ui.button, //store.getState().ui.button another way to get button bool
  isAuthenticated: state.auth.isAuthenticated,
  status: state.status,
  loading: state.ui.loading,
  authState: state.auth,
  applyJobForm: state.applyJobForm,
});

export default connect(mapStateToProps, { logout, applyJobForm, buttonReset, buttonClicked })(ApplyJobForm);