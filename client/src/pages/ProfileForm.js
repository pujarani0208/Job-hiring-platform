import React, { Component } from 'react';
import { connect } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
    jobExperience: "0",
    company: "",
    errors: {},
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
            dob:  json.dob,
            jobExperience: json.jobExperience,
            company: json.company,
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
  handleValidation() {
    let formIsValid = true;
    const errors =  Object.assign({},this.state.errors);
    const {user} = this.props.authState;
    //Name
    if (this.state.firstName === '' || this.state.firstName === undefined) {
      errors['firstName'] = "Cannot be empty!";
      formIsValid = false;
    }
    if (typeof this.state.firstName !== "undefined") {
      if (!this.state.firstName.match(/^[a-zA-Z]+$/)) {
        errors['firstName'] = "Only letters allowed!";
        formIsValid = false;        
      }
      if (!(this.state.firstName.length > 2)) {
        errors['firstName'] = "Size must be greater than 2!";
        formIsValid = false;
      }
    }
    //last name
    if (typeof this.state.lastName !== "undefined") {
      if (!this.state.lastName.match(/^[a-zA-Z]+$/)) {
        errors['lastName'] = "Only letters allowed!";
        formIsValid = false;
      }
    }
  
    //uniqueIdentity
    if (this.state.uniqueIdentity === '') {
      errors['uniqueIdentity'] = "Cannot be empty!";
      formIsValid = false;
    }
    if (typeof this.state.uniqueIdentity !== "undefined") {
      if (!(this.state.uniqueIdentity.length > 6)) {
        errors['uniqueIdentity'] = "Size must be greater than 6!";
        formIsValid = false;
      }
    }

    //uniqueIdentity
    if (this.state.company === '' && user.userType === 'HIRE') {
      errors['company'] = "Cannot be empty!";
      formIsValid = false;
    }
  
    //Email
    if (this.state.email === '') {
      errors['email'] = "Cannot be empty!";
      formIsValid = false;
    }

    if (typeof this.state.email !== "undefined") {
      let lastAtPos = this.state.email.lastIndexOf("@");
      let lastDotPos = this.state.email.lastIndexOf(".");

      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          this.state.email.indexOf("@@") == -1 &&
          lastDotPos > 2 &&
          this.state.email.length - lastDotPos > 2
        )
      ) {
        errors['email'] = "Email is not valid!";
        formIsValid = false;
      }
    }
    //DOB
      if (this.state.dob === '') {
        errors['dob'] = "Cannot be empty!";
        formIsValid = false;
      }
    //Gender
      if (this.state.gender === '') {
        errors['gender'] = "Cannot be empty!";
        formIsValid = false;
      }
    
    //Contact Number
    if (this.state.contactNo === '') {
      errors['contactNo'] = "Cannot be empty!";
      formIsValid = false;
    }
    if (typeof this.state.contactNo !== "undefined") {
      if (!this.state.contactNo.match(/^\+{0,2}([\-\. ])?(\(?\d{0,3}\))?([\-\. ])?\(?\d{0,3}\)?([\-\. ])?\d{3}([\-\. ])?\d{4}/)) {
        errors['contactNo'] = "Invalid contact Number!";
        formIsValid = false;
      }
    }
  
  this.setState({
      errors :  errors
  })
    return formIsValid;
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    const errors =  Object.assign({},this.state.errors);
    //Name
    errors[e.target.name] = '';
    if (e.target.name === 'firstName') {
    if (e.target.value === '' || e.target.value === undefined) {
      errors[e.target.name] = "Cannot be empty!";
    }
    if (!(e.target.value.length > 2)) {
      errors[e.target.name] = "Size must be greater than 2!";
    }
    if (typeof e.target.value !== "undefined") {
      if (!e.target.value.match(/^[a-zA-Z]+$/)) {
        errors[e.target.name] = "Only letters allowed!";
      }
    }
  }
    //last name
    if (e.target.name === 'lastName') {
    if (typeof e.target.value !== "undefined") {
      if (!e.target.value.match(/^[a-zA-Z]+$/)) {
        errors[e.target.name] = "Only letters allowed!";
      }
    }
  }
    //uniqueIdentity
    if (e.target.name === 'uniqueIdentity') {
    if (e.target.value === '') {
      errors[e.target.name] = "Cannot be empty!";
    }
    if (typeof e.target.value !== "undefined") {
      if (!(e.target.value.length > 6)) {
        errors[e.target.name] = "Size must be greater than 6!";
      }
    }
  }
  //dob
  if (e.target.name === 'dob') {
    if (e.target.value === '') {
      errors[e.target.name] = "Cannot be empty!";
    }
  }
  //gender
  if (e.target.name === 'gender') {
    if (e.target.value === '') {
      errors[e.target.name] = "Cannot be empty!";
    }
  }
  //copmany
  if (e.target.name === 'company') {
    if (e.target.value === '') {
      errors[e.target.name] = "Cannot be empty!";
    }
  }
  if (e.target.name === 'email') {

    //Email
    if (e.target.value === '') {
      errors[e.target.name] = "Cannot be empty!";
    }

    if (typeof e.target.value !== "undefined") {
      let lastAtPos = e.target.value.lastIndexOf("@");
      let lastDotPos = e.target.value.lastIndexOf(".");

      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          e.target.value.indexOf("@@") == -1 &&
          lastDotPos > 2 &&
          e.target.value.length - lastDotPos > 2
        )
      ) {
        errors[e.target.name] = "Email is not valid!";
      }
    }
  }
    //Contact Number
    if (e.target.name === 'contactNo') {
    if (e.target.value === '') {
      errors[e.target.name] = "Cannot be empty!";
    }
    if (typeof e.target.value !== "undefined") {
      if (!(e.target.value.match(/^\+{0,2}([\-\. ])?(\(?\d{0,3}\))?([\-\. ])?\(?\d{0,3}\)?([\-\. ])?\d{3}([\-\. ])?\d{4}/))) {
        errors[e.target.name] = "Invalid contact number!";
      }
    }
  }
  if (errors[e.target.name] === "") {
    delete errors[e.target.name];
  }
  this.setState({
      errors :  errors
  })
  };

  componentDidUpdate(prevProps) {
    const status = this.props.status;
    // Changes status message if it is different from previous message
    if (status !== prevProps.status) {
      if (status.id === "PROFILE_SAVED_SUCCESSFULLY") {
        this.setState({ msg: status.statusMsg });
      } else {
        this.setState({ msg: this.props.status.statusMsg });
      }
      if (status.id === "PROFILE_SAVED_SUCCESSFULLY") {
        setTimeout(() => {
          this.props.history.push("/profile");
        }, 6000);
      }
    }
    
  }

  onSubmit = (e) => {
    e.preventDefault();
    if (this.handleValidation()) {
      const {user} = this.props.authState;
      const {gender , uniqueIdentity, company, description, firstName, lastName, jobExperience, contactNo, address, dob, email} = this.state;
      const data = {gender , uniqueIdentity, company, description, firstName, jobExperience, lastName, contactNo, address, dob, email};
      data.userId = user.id;
      data._id = this.state.id
      this.props.saveProfile(data);    
    } else {
      toast("Form has errors!",{
        position: toast.POSITION.TOP_RIGHT,
        className: 'errorToastMessage'}, {autoClose:3000}) 
    }

  };
  render() {
    let className = "divStyle";
    let alert;
    if (this.state.msg && this.props.status.respCode >= 400) {
      alert = toast(`${this.state.msg}`,{
        position: toast.POSITION.TOP_RIGHT,
        className: 'errorToastMessage'}, {autoClose:3000})
    } else if (this.state.msg && this.props.status.respCode === 200) {
      alert = toast(`${this.state.msg}`,
      {
        position: toast.POSITION.TOP_RIGHT,
        className: 'toastMessage'},
         {autoClose:3000});
    }
    let {errors} = this.state;
    if (!this.props.button) {
      className = "formStyle";
    }
    if(!this.props.authState.isAuthenticated) {
      return <Redirect to="/login" />
    }
    const {user} = this.props.authState;

    return (
      <>
      <div className='main'>
      <div className="navbarMain">
        <InnerNavbar></InnerNavbar>
        </div>
        {alert}
        <ToastContainer />
    <div className={className}>
      
    <Card>
    <CardTitle> <h2 ><strong>{this.state.buttonStatus}</strong></h2></CardTitle>
        <CardBody className='card'>
        {/* {alert} */}
          <Form onSubmit={this.onSubmit} >
          <Row className="align-items-center">
        <Col xs="auto">
          <FormGroup className='formGroup'>
          <Label for="firstName"><div class="required-field">First name</div></Label>
            <Input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value = {this.state.firstName}
                  placeholder="Enter your First name"
                  className="mb-3"
                  onChange={this.onChange}
                  />
          {errors !== undefined && <div className ='fieldError'>{errors['firstName']}</div>}
            <Label for="uniqueIdentity" ><div class="required-field">Unique Identity Number</div></Label>
          <Input
                  type="text"
                  name="uniqueIdentity"
                  id="uniqueIdentity"
                  placeholder="Enter your unique Identity Number"
                  className="mb-3"
                  value = {this.state.uniqueIdentity}
                  onChange={this.onChange}
                />
            {errors !== undefined &&  <div className ='fieldError'>{errors['uniqueIdentity']}</div>}
             <Label for="contactNo"><div class="required-field">Contact No.</div></Label>
            <Input
                  type="text"
                  name="contactNo"
                  id="contactNo"
                  placeholder="Enter your contact"
                  className="mb-3"
                  value = {this.state.contactNo}
                  onChange={this.onChange}
                />
            {errors !== undefined && <div className ='fieldError'>{errors['contactNo']}</div>}
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
            {errors !== undefined && <div className ='fieldError'>{errors['email']}</div>}

            {user.userType === 'GET_HIRED' && <Label for="jobExperience">Experience Years</Label>}
            {user.userType === 'GET_HIRED' && <Input
              type="jobExperience"
              name="jobExperience"
              id="jobExperience"
              placeholder="Years"
              className="mb-3"
              value = {this.state.jobExperience}
              onChange={this.onChange}
            />}
            {user.userType === 'GET_HIRED' && errors !== undefined && <div className ='fieldError'>{errors['jobExperience']}</div>}
            {user.userType === 'HIRE' && <Label for="company"><div class="required-field">Company</div></Label>}
            {user.userType === 'HIRE' && <Input
              type="company"
              name="company"
              id="company"
              placeholder="Company Name"
              className="mb-3"
              value = {this.state.company}
              onChange={this.onChange}
            />}
            {user.userType === 'HIRE' && errors !== undefined && <div className ='fieldError'>{errors['company']}</div>}
            </FormGroup>
          </Col>
                <Col xs="auto">
                <FormGroup className='formGroup'>
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
            {errors !== undefined && <div className ='fieldError'>{errors['lastName']}</div>}
            <Label for="dob"><div class="required-field">Date of Birth</div></Label>
            <Input
                  type="date"
                  name="dob"
                  id="dob"
                  className="mb-3"
                  value = {this.state.dob}
                  onChange={this.onChange}
                />
            {errors !== undefined && <div className ='fieldError'>{errors['dob']}</div>}
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
               <Label for="gender"><div class="required-field">Gender</div></Label>
            <Input
                  type="text"
                  name="gender"
                  id="gender"
                  placeholder="Gender"
                  className="mb-3"
                  value = {this.state.gender}
                  onChange={this.onChange}
                />
              {errors !== undefined && <div className ='fieldError'>{errors['gender']}</div>}
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
            <Button color="info" className='button'>
               { this.props.loading ?
               <span >Applying job.. <Spinner size="sm" color="info" /></span> : <span>{this.state.buttonStatus}</span>}
            </Button>
          </FormGroup>
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
  saveProfile: state.applyJobForm,
});

export default connect(mapStateToProps, { logout, saveProfile, buttonReset, buttonClicked })(ProfileFormEdit);
