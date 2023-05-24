import React, { Component } from 'react';
import { connect } from "react-redux";
import {
  Button,
  Card,
 CardTitle,
  CardSubtitle,
  CardBody,
  Form,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Alert,
  Spinner
} from "reactstrap";
import PropTypes from "prop-types";
import './style.css';
import { Redirect } from "react-router-dom";
import InnerNavbar from './InnerNavbar';
import { postJob } from '../actions/jobActions';
import { logout } from '../actions/authActions';
import { buttonClicked, buttonReset } from "../actions/uiActions";

export class JobForm extends Component {
  constructor(props) {
		super(props);
    
    this.state={
      value:this.props.location.state,
      id: this.props.location.id,
  }
  
  const state = {
    msg: "",
    jobTitle: "",
    openings: "",
    location: "",
    buttonStatus: "Post Job",
    salary: "",
    description: "",
    companyName: "",
    contactNo: "",
    contactPersonName: "",
    jobAddress: "",
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
    registerJobs: PropTypes.func.isRequired,
    jobId: PropTypes.object.isRequired,
    id: PropTypes.object.isRequired,
  };
  }
  // Removes sign in and register buttons from homepage
  // upon mounting of Register component
  componentDidMount() {
    const {user} = this.props.authState;
    if(this.state.id !== undefined) {
    fetch(
      `http://localhost:3000/api/jobs/getJobForm/${this.state.id}`)
        .then((res) => res.json())
        .then((json) => {
          if (json) {
          this.setState({
            jobTitle: json.jobTitle,
            openings: json.openings,
            location: json.location,
            salary: json.salary,
            buttonStatus: 'Edit Job',
            description: json.description,
            companyName: json.companyName,
            contactNo: json.contactNo,
            contactPersonName: json.contactPersonName,
            jobAddress: json.jobAddress,
            email: json.email,
          });
          }
        })
    } else {
      fetch(
        `http://localhost:3000/api/profile/getProfileByUserId/${user.id}`)
          .then((res) => res.json())
          .then((json) => {
            if (Object.keys(json).length !== 0) {
            this.setState({
                contactPersonName: json.firstName + " " + json.lastName,
                contactNo: json.contactNo,
                email: json.email,
                companyName: json.company,
                buttonStatus: 'Post Job',
            });
          }})
    }
  }

  componentDidUpdate(prevProps) {
    const status = this.props.status;

    // Changes status message if it is different from previous message
    if (status !== prevProps.status) {
      if (status.id === "JOB_POSTED_SUCCESSFULLY") {
        this.setState({ msg: status.statusMsg.msg });
      } else {
        this.setState({ msg: this.props.status.statusMsg.msg });
      }
    }
    // Redirects to Log In screen after a delay of 2secs if successfully registered
    if (status.id === "JOB_POSTED_SUCCESSFULLY") {
      setTimeout(() => {
        return  this.props.history.push("/viewPostedJobs");
      }, 2000);
    }
  }

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
    const {jobTitle, openings, location, salary, description, companyName, contactNo, contactPersonName, jobAddress, email} = this.state;
    const data = {jobTitle, openings, location, salary, description, companyName, contactNo, contactPersonName, jobAddress, email};
    data.userId = user.id;
    data.id = this.state.id;
    console.log(data);
    this.props.postJob(data);
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
          {this.state.msg} <br /> Redirecting to view Jobs
        </Alert>
      );
    }

    if (!this.props.button) {
      className = "formStyle";
    }
    if(!this.props.authState.isAuthenticated) {
      return <Redirect to="/login" />
    }
    return (
      <>
   <div className='main'>
      <div className="navbarMain">
        <InnerNavbar></InnerNavbar>
        </div>
    <div className={className}>
    <Card className='card'>
    <CardTitle> <h2><strong>{this.state.buttonStatus}</strong></h2></CardTitle>
        <CardBody >
            {alert}
          <Form onSubmit={this.onSubmit}>
          <Row className="align-items-center">
        <Col xs="auto">
        <FormGroup className='formGroup'>
          <Label for="companyName">Company Name</Label>
            <Input
                  type="text"
                  name="companyName"
                  id="companyName"
                  placeholder="Enter Company Name"
                  className="mb-3"
                  value = {this.state.companyName}
                  onChange={this.onChange}
                />
          <Label for="jobTitle">Job Title</Label>
          <Input
                  type="text"
                  name="jobTitle"
                  id="jobTitle"
                  placeholder="Enter job title"
                  value = {this.state.jobTitle}
                  className="mb-3"
                  onChange={this.onChange}
                />
          <Label for="openings">No of Job Openings</Label>
          <Input
                  type="text"
                  name="openings"
                  id="openings"
                  placeholder="Enter job openings"
                  className="mb-3"
                  value = {this.state.openings}
                  onChange={this.onChange}
                />
            
            <Label for="salary"> Salary</Label>
            <Input
                  type="text"
                  name="salary"
                  id="salary"
                  placeholder="Enter Salary"
                  className="mb-3"
                  value = {this.state.salary}
                  onChange={this.onChange}
                />
              <Label for="description">Job description</Label>
            <Input
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Enter Job Description"
                  className="mb-3"
                  value = {this.state.description}
                  onChange={this.onChange}
                />
                </FormGroup>
          </Col>
                <Col xs="auto">
          <FormGroup className='formGroup'>
              <Label for="contactNo">Contact No</Label>
            <Input
                  type="text"
                  name="contactNo"
                  id="contactNo"
                  placeholder="Enter Contact No"
                  value = {this.state.contactNo}
                  className="mb-3"
                  onChange={this.onChange}
                />
              <Label for="contactPersonName">Contact Person Name</Label>
            <Input
                  type="text"
                  name="contactPersonName"
                  id="contactPersonName"
                  placeholder="Contact Person Name"
                  className="mb-3"
                  value = {this.state.contactPersonName}
                  onChange={this.onChange}
                />
                <Label for="email">E-mail</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="you@youremail.com"
              className="mb-3"
              value = {this.state.email}
              onChange={this.onChange}
            />
            <Label for="location">Job Location</Label>
            <Input
                  type="text"
                  name="location"
                  id="location"
                  placeholder="Enter job location"
                  className="mb-3"
                  value = {this.state.location}
                  onChange={this.onChange}
                />
            <Label for="jobAddress">Job Address</Label>
            <Input
                  type="text"
                  name="jobAddress"
                  id="jobAddress"
                  placeholder="Enter Job Address"
                  className="mb-3"
                  value = {this.state.jobAddress}
                  onChange={this.onChange}
                />
            </FormGroup>
          </Col>
          </Row>
            <Button color="dark" className='button'>
               { this.props.loading ?
               <span >Posting job.. <Spinner size="sm" color="light" /></span> : <span>{this.state.buttonStatus}</span>}
            </Button>
          
        </Form>
        </CardBody>
    </Card>
    </div>    
    </div>
    </>
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

export default connect(mapStateToProps, { logout, postJob, buttonReset, buttonClicked})(JobForm);
