import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom'
import JobForm from './JobForm';
import JobDetails from './JobDetails';
import { connect } from "react-redux";
import {
  Button,
  Card,
 CardTitle,
  CardSubtitle,
  CardBody
} from "reactstrap";
import PropTypes from "prop-types";
import './style.css';
import { Redirect } from 'react-router-dom'
import { logout } from '../actions/authActions';
import { buttonReset} from '../actions/uiActions';
import { isAuth } from '../actions/authActions'
import store from '../store';

export class Profile extends Component {

  componentDidMount() {
    // Check if session cookie is present
    store.dispatch(isAuth());
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    button: PropTypes.bool,
    authState: PropTypes.object.isRequired,
    buttonReset: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
  };


  onLogout = (e) => {
    e.preventDefault();
    this.props.buttonReset();
    this.props.logout();
  };

  render() {

    if(!this.props.authState.isAuthenticated) {
      return <Redirect to="/" />
    }

    const {user} = this.props.authState;

    return (
       <div className="container">
        <div className="main">
          <Card>
            <CardBody>
          <CardTitle><h1>{ user ? `Welcome, ${user.name}`: ''} <span role="img" aria-label="party-popper">🎉 </span> </h1></CardTitle>
          <br/>
           <CardSubtitle><h5> <span role="img" aria-label="clap">👏 </span></h5></CardSubtitle>
          <br/>
          <Switch>
              <Route exact path ="/postJob" component={JobForm}/>
              <Route exact path ="/getAllPostedJobs" component={JobDetails}/>
            </Switch>
            { this.props.button && <Link className='divStyle' to="/postJob">
               <Button size="lg"  color="light">Post new job</Button>
               </Link>}

             {this.props.button && <Link className='divStyle' to="/getAllPostedJobs">
               <Button  size="lg"  color="light">find jobs</Button>
             </Link>}
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
  authState: state.auth,
  isAuthenticated: state.auth.isAuthenticated

});

export default connect(mapStateToProps, { logout, buttonReset })(Profile);
