import { NavLink, Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth';
import { useContext } from 'react';
import styles from './Header.module.css';
import utilStyles from '../utils/utils.module.css';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav } from 'react-bootstrap';
import { Navbar, Container, NavDropdown } from 'react-bootstrap';

const Header = () => {
	const { authUser } = useContext(AuthContext);

	const logoutHandler = () => {};

	return (
		<header>
			<Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
				<Container>
					<LinkContainer to='/'>
						<Navbar.Brand href='/'>AlbumLists</Navbar.Brand>
					</LinkContainer>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className='ml-auto'>
							{authUser ? (
								<NavDropdown title={authUser.username} id='username'>
									<LinkContainer to='/signout'>
										<NavDropdown.Item onClick={logoutHandler}>
											Logout
										</NavDropdown.Item>
									</LinkContainer>
								</NavDropdown>
							) : (
								<LinkContainer to='/signin'>
									<Nav.Link>
										<i className='fas fa-user' />Sign In
									</Nav.Link>
								</LinkContainer>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>

		// <div className={styles.navContainer}>
		// 	<div className={`${utilStyles.container} ${styles.navFlex} `}>
		// 		<Link to='/'>
		// 			<h1 className=''>AlbumLists</h1>
		// 		</Link>
		// 		{/* login links, logout links */}
		// 		{authUser ? (
		// 			<nav className={styles.navLinks}>
		// 				<span className={styles.navGreeting}>Welcome, {authUser.username}</span>
		// 				<Link className='signout' to='/signout'>
		// 					Sign Out
		// 				</Link>
		// 			</nav>
		// 		) : (
		// 			<nav className={styles.navLinks}>
		// 				<NavLink className='signup' to='/signup'>
		// 					Sign Up
		// 				</NavLink>
		// 				<NavLink className='signin' to='/signin'>
		// 					Sign In
		// 				</NavLink>
		// 			</nav>
		// 		)}
		// 	</div>
		// </div>
	);
};

export default Header;
