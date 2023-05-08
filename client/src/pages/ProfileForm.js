import React, { Component } from 'react';
import { connect } from "react-redux";
import {
  Button,
  Card,
 CardTitle,
  CardSubtitle,
  CardBody,
  Form,
  Col,
  Row,
  FormGroup,
  Label,
  Input,
  Alert,
  Spinner
} from "reactstrap";
import InnerNavbar from './InnerNavbar';
import PropTypes from "prop-types";
import './style.css';
import { Redirect } from 'react-router-dom'
import { saveProfile } from '../actions/ProfileActions';
import { logout } from '../actions/authActions';
import { buttonClicked, buttonReset } from "../actions/uiActions";

 export class ProfileFormEdit extends Component {
  constructor(props) {
		super(props);
    this.state={
      value:this.props.location.state,
  }
  const state = {
    msg: "",
    id: "",
    gender: "",
    uniqueIdentity: "",
    description: "",
    firstName: "",
    lastName: "",
    contactNo: "",
    buttonStatus: 'Save Profile',
    address: "",
    email: "",
    dob: "",
  };
  const propTypes = {
    buttonClicked: PropTypes.func.isRequired,
    button: PropTypes.bool,
    authState: PropTypes.object.isRequired,
    buttonReset: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    saveProfile: PropTypes.func.isRequired,
    status: PropTypes.object.isRequired,
  };
  }
  componentDidMount() {
    const {user} = this.props.authState;
    fetch(
    `http://localhost:3000/api/profile/getProfileByUserId/${user.id}`)
      .then((res) => res.json())
      .then((json) => {
        if (Object.keys(json).length !== 0) {
        this.setState({
            id : json._id,
            gender: json.gender,
            uniqueIdentity: json.uniqueIdentity,
            description: json.description,
            firstName: json.firstName,
            lastName: json.lastName,
            contactNo: json.contactNo,
            address: json.address,
            email: json.email,
            buttonStatus : 'Edit Profile',
            dob: json.dob,
        });
        } else {
          this.setState({
            buttonStatus : 'Save Profile'
          })
        }
      })
  }
  onLogout = (e) => {
    e.preventDefault();
    this.props.buttonReset();
    this.props.logout();
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidUpdate(prevProps) {
    const status = this.props.status;
    // Changes status message if it is different from previous message
    if (status !== prevProps.status) {
      if (status.id === "PROFILE_SAVED") {
        this.setState({ msg: status.statusMsg });
      } else {
        this.setState({ msg: this.props.status.statusMsg });
      }
    }

    // Redirects to Log In screen after a delay of 2secs if successfully registered
    if (status.id === "PROFILE_SAVED") {
      setTimeout(() => {
        this.props.history.push("/about");
      }, 2000);
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {user} = this.props.authState;
    const {gender , uniqueIdentity, description, firstName, lastName, contactNo, address, dob, email} = this.state;
    const data = {gender , uniqueIdentity, description, firstName, lastName, contactNo, address, dob, email};
    data.userId = user.id;
    data._id = this.state.id
    this.props.saveProfile(data);
  };
  render() {
    let className = "divStyle";
    let alert;
    if (this.state.msg && this.props.status.respCode >= 400) {
      alert = <Alert color="danger">{this.state.msg}</Alert>;
    } else if (this.state.msg && this.props.status.respCode === 200) {
      alert = (
        <Alert color="success">
          {this.state.msg} <br /> Redirecting to About page
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
      <div className="navbarMain">
        <InnerNavbar></InnerNavbar>
        </div>
    <div className={className}>
    <Card>
    <CardTitle> <h2><strong>{this.state.buttonStatus}</strong></h2></CardTitle>
        <CardBody >
        {alert}
          <Form onSubmit={this.onSubmit} >
          <Row className="align-items-center">
        <Col xs="auto">
          <FormGroup>
          <Label for="firstName">First name</Label>
            <Input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value = {this.state.firstName}
                  placeholder="Enter your First name"
                  className="mb-3"
                  onChange={this.onChange}
                />
            <Label for="uniqueIdentity">Unique Identity Number</Label>
          <Input
                  type="text"
                  name="uniqueIdentity"
                  id="uniqueIdentity"
                  placeholder="Enter your unique Identity Number"
                  className="mb-3"
                  value = {this.state.uniqueIdentity}
                  onChange={this.onChange}
                />
             <Label for="contactNo">Contact No.</Label>
            <Input
                  type="text"
                  name="contactNo"
                  id="contactNo"
                  placeholder="Enter your contact"
                  className="mb-3"
                  value = {this.state.contactNo}
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
            </FormGroup>
          </Col>
                <Col xs="auto">
          <FormGroup>
          <Label for="lastName">Last name</Label>
            <Input
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Enter your Last name"
                  className="mb-3"
                  value = {this.state.lastName}
                  onChange={this.onChange}
                />
            <Label for="dob">Date of Birth</Label>
            <Input
                  type="date"
                  name="dob"
                  id="dob"
                  className="mb-3"
                  value = {this.state.dob}
                  onChange={this.onChange}
                />
              <Label for="address">Address</Label>
            <Input
                  type="text"
                  name="address"
                  id="address"
                  placeholder="Enter your address"
                  className="mb-3"
                  value = {this.state.address}
                  onChange={this.onChange}
                />
               <Label for="gender">Gender</Label>
            <Input
                  type="text"
                  name="gender"
                  id="gender"
                  placeholder="Gender"
                  className="mb-3"
                  value = {this.state.gender}
                  onChange={this.onChange}
                />
               <Label for="description">Description</Label>
            <Input
                  type="text"
                  name="description"
                  id="description"
                  placeholder="description"
                  className="mb-3"
                  value = {this.state.description}
                  onChange={this.onChange}
                />
            </FormGroup>
            </Col>
            </Row>
            <FormGroup>
            <Button color="dark" style={{ marginTop: "2rem" }} block>
               { this.props.loading ?
               <span >Applying job.. <Spinner size="sm" color="light" /></span> : <span>{this.state.buttonStatus}</span>}
            </Button>
          </FormGroup>
        </Form>
        </CardBody>
    </Card>
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
  saveProfile: state.applyJobForm,
});

export default connect(mapStateToProps, { logout, saveProfile, buttonReset, buttonClicked })(ProfileFormEdit);
