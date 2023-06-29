import {
Nav,
NavLink,
Bars,
NavMenu,
NavBtn,
NavBtnLink,
} from './NavbarElements';
import {
	Button
  } from "reactstrap";
import './style.css';
import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import './style.css';
import { Redirect } from 'react-router-dom'
import { buttonReset} from '../actions/uiActions';
import { logout } from '../actions/authActions';


class InnerNavbar extends Component {
	// Constructor
	constructor(props) {
		super(props);
    const propTypes = {
      button: PropTypes.bool,
      authState: PropTypes.object.isRequired,
      buttonReset: PropTypes.func.isRequired,
      logout: PropTypes.func.isRequired,
    };
	
}

onLogout = (e) => {
    e.preventDefault();
    this.props.buttonReset();
    this.props.logout();
  };
render() {
	if(!this.props.authState.isAuthenticated) {
		return <Redirect to="/login" />
	}
    const {user} = this.props.authState;
	return (
	<>
	<Nav>
		<Bars />
		<NavMenu>
		<NavLink to='/profile' activeStyle>
			About
		</NavLink>
		{user.userType === 'GET_HIRED' && <NavLink to='/getAllPostedJobs' activeStyle>
			Find jobs
		</NavLink>}
		{user.userType === 'HIRE' && <NavLink to='/viewPostedJobs' activeStyle>
			View jobs
		</NavLink>}
		<NavLink to='/profileForm' activeStyle>
			Profile
		</NavLink>
		</NavMenu>
		  <NavBtn onClick={this.onLogout} color="secondary">Logout</NavBtn>
	</Nav>
	</>
);
};
}
const mapStateToProps = (state) => ({ //Maps state to redux store as props
	button: state.ui.button,
	authState: state.auth,
  });
export default connect(mapStateToProps, { logout, buttonReset })(InnerNavbar);