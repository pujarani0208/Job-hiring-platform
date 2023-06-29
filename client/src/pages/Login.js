import React, { Component } from 'react'
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
   CardTitle,
   CardSubtitle,
  CardBody,
  Alert,
  Spinner
} from "reactstrap";
import { connect } from "react-redux"; // API to connect component state to redux store
import PropTypes from "prop-types";
import { buttonClicked,isLoading } from "../actions/uiActions";
import { login } from "../actions/authActions";
import Navbar from './Navbar';
import { Link } from 'react-router-dom'
import './style.css';



class Login extends Component {

  state = {
    email: "",
    password: "",
    msg: "",
  }

  static propTypes = {
    buttonClicked: PropTypes.func.isRequired,
    isLoading: PropTypes.func.isRequired,
    button: PropTypes.bool,
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    status: PropTypes.object.isRequired,
    loading: PropTypes.bool
  };

  componentDidMount() {
    this.props.buttonClicked();
}

componentDidUpdate(prevProps) {
      const status = this.props.status;

     if (status !== prevProps.status) {

      if (status.id === "LOGIN_FAIL") {
        this.setState({ msg: status.statusMsg });
      }
    }
};


onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

onSubmit = (e) => {
    e.preventDefault();

    const { email, password} = this.state;

    const user = { email, password};
    this.props.isLoading();
    this.props.login(user);
  };


  render() {
    let className = 'divStyle';
    if (!this.props.button) {
      className = 'formStyleLogin';
    }
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
    return (
      <>
     <div className='main'>
      <div className="navbarMain">
        <Navbar></Navbar>
        </div>
      <div className={className}>
        <Card>
            <CardTitle>
              <h2>
                <strong>Login</strong>
              </h2>
            </CardTitle>
            <CardSubtitle className="text-muted">
              Already have an account?
              <Link to="/register"> Register </Link>
            </CardSubtitle>
            <CardBody className='card'>
            {alert}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
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

                    <Label for="password">Password</Label>
                    <Input
                      type="password"
                      name="password"
                      id="password"
                      size="lg"
                      placeholder="Enter your Password"
                      className="mb-3"
                      onChange={this.onChange}
                    />
                    <Button color="info" className="button">
                       { this.props.loading ?
                       <span >Logging in.. <Spinner size="sm" color="light" /></span> : <span>Login</span>}
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
  loading: state.ui.loading
});

export default connect(mapStateToProps,{ login, isLoading, buttonClicked })(Login);
