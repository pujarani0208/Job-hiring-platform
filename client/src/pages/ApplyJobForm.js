import React, { Component } from 'react';
import { connect } from "react-redux";

import {
  Button,
  Card,
  CardBody,
  Form,
  Col,
  Collapse,
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
import { applyJobForm } from '../actions/jobActions';
import { logout } from '../actions/authActions';
import { buttonClicked, buttonReset } from "../actions/uiActions";
import { declineJobAplication , acceptJobAplication} from '../actions/jobActions';

 export class ApplyJobForm extends Component {
  constructor(props) {
		super(props);
  const state = {
    msg: "",
    description: "",
    personName: "",
    applyStatus: "",
    status: 'APPLY',
  };
  const propTypes = {
    buttonClicked: PropTypes.func.isRequired,
    button: PropTypes.bool,
    authState: PropTypes.object.isRequired,
    buttonReset: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    applyJobForm: PropTypes.func.isRequired,
    status: PropTypes.object.isRequired,
    jobId: PropTypes.object.isRequired,
    userId: PropTypes.object.isRequired,
    declineJobAplication: PropTypes.func.isRequired,
    acceptJobAplication: PropTypes.func.isRequired,
    
  };
  
  this.state = {
    visible: false,
    id: "",
    showDeclineButton: false,
    showApplyButton: false,
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

  componentDidMount() {
    this.props.buttonClicked();
    const userId  = this.props.userId;
    const jobId  = this.props.jobId;
      fetch(
      `http://localhost:3000/api/jobs/getJobStatusForUser/${userId}/${jobId}`)
        .then((res) => res.json())
        .then((json) => {
          this.setState({
            applyStatus: json['status'],
            id: json['id']
          });
          if (this.state.applyStatus === "DECLINE") {
            this.setState({
              showDeclineButton: false,
              showApplyButton: false,
            });
          } else if (this.state.applyStatus === "PENDING") {
            this.setState({
              showDeclineButton: true,
              showApplyButton: false,
              status: 'Decline',
            });
          } else if (this.state.applyStatus === "ACCEPT") {
            this.setState({
              showDeclineButton: true,
              showApplyButton: false,
              status: 'Decline'
            });
          } else if (this.state.applyStatus === "APPLY") {
            this.setState({
              showDeclineButton: false,
              showApplyButton: true,
              status: 'Apply'
            });
          }
        })
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
        <Redirect to="/getAllPostedJobs" />
      }, 2000);
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {description} = this.state;
    const data = {description};
    data.userId = this.props.userId;
    data.jobId = this.props.jobId;
    this.props.applyJobForm(data);
  };
  render() {
    let alert;
    // if (this.state.msg && this.props.status.respCode >= 400) {
    //   alert = <Alert color="danger">{this.state.msg}</Alert>;
    // } else if (this.state.msg && this.props.status.respCode === 200) {
    //   alert = (
    //     <Alert color="success">
    //       {this.state.msg} <br /> Redirecting to Log In screen
    //     </Alert>
    //   );
    // }
    const {visible}  = this.state;
    const {showDeclineButton} = this.state;
    const {showApplyButton} = this.state;
    const onButtonClick = () => {
      const flag = visible;
      this.setState({
        visible : !flag,
        showApplyButton: !showApplyButton
      })
    }
    const onCancelClick = () => {
      const flag = visible;
      this.setState({
        visible : !flag,
        showApplyButton: !showApplyButton
      })
   }
    if(!this.props.authState.isAuthenticated) {
      return <Redirect to="/login" />
    }
    return (
      <>
          <td>{this.state.applyStatus} </td>
          <td><Collapse isOpen={this.state.visible}>
        {alert}
        <Form onSubmit={this.onSubmit} >
          <td>
            <Input
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Enter description"
                  className="mb-3"
                  onChange={this.onChange}
                />
                </td>
          <td><Button color="dark" style={{ marginTop: "2rem" }} block>
               { this.props.loading ?
               <span >Applying job.. <Spinner size="sm" color="light" /></span> : <span>Submit</span>}
            </Button>
            </td>
            <td>
            {<Button onClick={() => onCancelClick()}>Cancel</Button>}

            </td>
        </Form>
    </Collapse></td>
    <td>
      {showDeclineButton &&
        <Button color="light" onClick={() => this.props.declineJobAplication(`${this.state.id}`)}>Decline</Button>
      }
      </td>
      <td>
      {showApplyButton && 
    <Button onClick={() => onButtonClick()}>{this.state.status}</Button>}
    </td>      
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
  applyJobForm: state.applyJobForm,
});

export default connect(mapStateToProps, { logout, applyJobForm, buttonReset, buttonClicked, declineJobAplication, acceptJobAplication})(ApplyJobForm);
