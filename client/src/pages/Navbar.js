import React from 'react';
import {
Nav,
NavLink,
Bars,
NavMenu,
NavBtn,
NavBtnLink,
} from './NavbarElements';

const Navbar = () => {
return (
	<>
	<Nav>
		<Bars />
		<NavMenu>
		<NavLink to='/about'>
			About
		</NavLink>
		</NavMenu>
		<NavBtn>
		<NavBtnLink to='/login'> Login</NavBtnLink>
		</NavBtn>
	</Nav>
	</>
);
};

export default Navbar;
