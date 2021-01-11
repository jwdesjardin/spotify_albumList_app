import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth';
import axios from 'axios';
import styles from './ActionBar.module.css';

const ActionBar = ({ playlist, history }) => {
	const { authUser, userPassword } = useContext(AuthContext);

	const onDeleteClick = async e => {
		// create the config object for authorization
		const credentials = btoa(authUser.username + ':' + userPassword);
		const basicAuth = 'Basic ' + credentials;
		const config = {
			headers: {
				Authorization: basicAuth
			}
		};

		try {
			// send delete request with auth to api
			const response = await axios.delete(
				`http://localhost:5000/api/playlists/${playlist.id}`,
				config
			);

			// if response is 204 redirect to courses
			if (response.status === 204) {
				history.push('/');
			}

			// if any error then show server error
		} catch (error) {
			if (error.response.status === 403) {
				history.push('/forbidden');
			}
			if (error.response.status === 404) {
				history.push('/notfound');
			} else {
				history.push('/error');
			}
		}
	};

	return (
		<div className={styles.actionBarContainer}>
			<div className={styles.flexStartAlign}>
				{/* if user is lgged in and they own this course show update and delete */}
				{authUser &&
				authUser.id === playlist.UserId && (
					<span>
						<Link className='btn btn-primary' onClick={onDeleteClick} to='/'>
							Delete Playlist
						</Link>
						<Link className='btn btn-primary' to={`/playlists/${playlist.id}/update`}>
							Edit Playlist
						</Link>
					</span>
				)}
				<Link className='btn btn-secondary' to='/'>
					Return to List
				</Link>
			</div>
		</div>
	);
};

export default ActionBar;
