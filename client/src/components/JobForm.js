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

export class JobForm extends Component {
  state = {
    jobTitle: "",
    openings: "",
    location: "",
    salary: "",
    description: "",
    companyName: "",
    personName: "",
    contactNo: "",
    contactPersonProfile: "",
    jobAddress: "",
    email: "",
  };
  static propTypes = {
    button: PropTypes.bool,
    authState: PropTypes.object.isRequired,
    buttonReset: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    registerJobs: PropTypes.func.isRequired
  };


  onLogout = (e) => {
    e.preventDefault();
    this.props.buttonReset();
    this.props.logout();
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

onSubmit = (e) => {
    e.preventDefault();
    const {user} = this.props.authState;
    const {jobTitle, openings, location, salary, description, companyName, personName, contactNo, contactPersonProfile, jobAddress, email} = this.state;
    const data = {jobTitle, openings, location, salary, description, companyName, personName, contactNo, contactPersonProfile, jobAddress, email};
    data.userId = user.id;
    console.log(data);
    this.props.postJob(data);
  };

  render() {

    if(!this.props.authState.isAuthenticated) {
      return <Redirect to="/" />
    }

    const {user} = this.props.authState;

    return (
    <div className='formStyle'>
    <Card>
        <CardBody >
          <CardTitle> <h2><strong>Post job</strong></h2></CardTitle>
          <CardSubtitle><h1>{ user ? `Welcome job details, ${user.name}`: ''} <span role="img" aria-label="party-popper">🎉 </span> </h1></CardSubtitle>
        <Button size="lg" onClick={this.onLogout} color="primary">Logout</Button>
        {/* {this.state.msg ? (
      <Alert color="danger">{this.state.msg}</Alert>
    ) : null} */}
          <Form onSubmit={this.onSubmit} >
          <FormGroup>
            <br></br>
          <Label for="jobTitle">Job Title</Label>
          <Input
                  type="text"
                  name="jobTitle"
                  id="jobTitle"
                  placeholder="Enter job title"
                  className="mb-3"
                  size="lg"
                  onChange={this.onChange}
                />
          <Label for="openings">No ofJob Openings</Label>
          <Input
                  type="text"
                  name="openings"
                  id="openings"
                  placeholder="Enter job openings"
                  className="mb-3"
                  size="lg"
                  onChange={this.onChange}
                />
            <Label for="location">Job Location</Label>
            <Input
                  type="text"
                  name="location"
                  id="jobTlocationitle"
                  placeholder="Enter job location"
                  className="mb-3"
                  size="lg"
                  onChange={this.onChange}
                />
            <Label for="salary">Job Location</Label>
            <Input
                  type="text"
                  name="salary"
                  id="salary"
                  placeholder="Enter Salary"
                  className="mb-3"
                  size="lg"
                  onChange={this.onChange}
                />
            <Label for="description">Job description</Label>
            <Input
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Enter job description"
                  className="mb-3"
                  size="lg"
                  onChange={this.onChange}
                />
              <Label for="companyName">Job companyName</Label>
            <Input
                  type="text"
                  name="companyName"
                  id="companyName"
                  placeholder="Enter job companyName"
                  className="mb-3"
                  size="lg"
                  onChange={this.onChange}
                />
              <Label for="personName">Job personName</Label>
            <Input
                  type="text"
                  name="personName"
                  id="personName"
                  placeholder="Enter job personName"
                  className="mb-3"
                  size="lg"
                  onChange={this.onChange}
                />
              <Label for="contactNo">Job contactNo</Label>
            <Input
                  type="text"
                  name="contactNo"
                  id="contactNo"
                  placeholder="Enter job contactNo"
                  className="mb-3"
                  size="lg"
                  onChange={this.onChange}
                />
              <Label for="contactPersonProfile">Job contactPersonProfile</Label>
            <Input
                  type="text"
                  name="contactPersonProfile"
                  id="contactPersonProfile"
                  placeholder="Enter job contactPersonProfile"
                  className="mb-3"
                  size="lg"
                  onChange={this.onChange}
                />
              <Label for="jobAddress">Job jobAddress</Label>
            <Input
                  type="text"
                  name="jobAddress"
                  id="jobAddress"
                  placeholder="Enter job jobAddress"
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
               <span >Posting job.. <Spinner size="sm" color="light" /></span> : <span>Posting Job</span>}
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
  registerJobs: state.registerJobs
});

export default connect(mapStateToProps, { logout, postJob, buttonReset })(JobForm);
