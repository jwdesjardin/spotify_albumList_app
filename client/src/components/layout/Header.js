import { NavLink, Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth';
import { useContext } from 'react';
import styles from './Header.module.css';
import utilStyles from '../utils/utils.module.css';

const Header = () => {
	const { authUser } = useContext(AuthContext);

	return (
		<div className={styles.navContainer}>
			<div className={`${utilStyles.container} ${styles.navFlex} `}>
				<Link to='/'>
					<h1 className=''>AlbumLists</h1>
				</Link>
				{/* login links, logout links */}
				{authUser ? (
					<nav className={styles.navLinks}>
						<span className={styles.navGreeting}>Welcome, {authUser.username}</span>
						<Link className='signout' to='/signout'>
							Sign Out
						</Link>
					</nav>
				) : (
					<nav className={styles.navLinks}>
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
