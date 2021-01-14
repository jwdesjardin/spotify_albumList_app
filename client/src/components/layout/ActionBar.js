import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth';
import axios from 'axios';
import styles from './ActionBar.module.css';
import CreatePlaylistAlbumsPopover from './CreatePlaylistAlbumsPopover';
import utilStyles from '../utils/utils.module.css';
const ActionBar = ({
	playlist,
	history,
	createPlaylist,
	createPlaylistAlbums,
	removeAlbumFromStage,
	stagedAlbums,
	playlist_id,
	albumTitle,
	setErrors
}) => {
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
			<div className={utilStyles.container}>
				<div className={styles.flexStartAlign}>
					{/* playlist cart */}
					{createPlaylistAlbums && (
						<div>
							<CreatePlaylistAlbumsPopover
								stagedAlbums={stagedAlbums}
								removeAlbumFromStage={removeAlbumFromStage}
								setErrors={setErrors}
								albumTitle={albumTitle}
								history={history}
								playlist_id={playlist_id}
							/>
						</div>
					)}

					<div>
						{createPlaylist && (
							<Link className='btn btn-secondary-dark' to='/playlists/create'>
								New Playlist
							</Link>
						)}
					</div>

					<div className={styles.flexStartAlign}>
						{/* if user is lgged in and they own this course show update and delete */}
						{authUser && authUser.id === playlist.UserId ? playlist_id > 0 ? (
							<Link className='btn btn-third-primary' onClick={onDeleteClick} to='/'>
								Delete Playlist
							</Link>
						) : (
							<Link
								className='btn btn-third-dark'
								to={`/playlists/${playlist.id}/update`}
							>
								Edit Playlist
							</Link>
						) : (
							''
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ActionBar;
