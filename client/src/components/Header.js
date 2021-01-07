import { NavLink, Link } from 'react-router-dom';
import { AuthContext } from '../context/auth';
import { useContext } from 'react';

const Header = () => {
	const { authUser } = useContext(AuthContext);

	return (
		<div className='header'>
			<div className='bounds'>
				<Link to='/'>
					<h1 className='header--logo'>AlbumLists</h1>
				</Link>
				{/* login links, logout links */}
				{authUser ? (
					<nav>
						<span>Welcome, {authUser.username}</span>
						<Link className='signout' to='/signout'>
							Sign Out
						</Link>
					</nav>
				) : (
					<nav>
						<NavLink className='signup' to='/signup'>
							Sign Up
						</NavLink>
						<NavLink className='signin' to='/signin'>
							Sign In
						</NavLink>
					</nav>
				)}
			</div>
		</div>
	);
};

export default Header;
