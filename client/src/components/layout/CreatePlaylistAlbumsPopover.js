import React, { useContext } from 'react';
import { Popover, OverlayTrigger } from 'react-bootstrap';
import PopoverAlbums from '../utils/PopoverAlbums';
import { AuthContext } from '../../context/auth';
import axios from 'axios';

import styles from './CreatePlaylistAlbumsPopover.module.css';

const CreatePlaylistAlbumsPopover = ({
	albumTitle,
	stagedAlbums,
	removeAlbumFromStage,
	setErrors,
	history,
	playlist_id
}) => {
	const { authUser, userPassword } = useContext(AuthContext);

	const createPlaylist = async () => {
		// create the config object for authorization
		const credentials = btoa(authUser.username + ':' + userPassword);
		const basicAuth = 'Basic ' + credentials;
		const config = {
			headers: {
				Authorization: basicAuth
			}
		};

		const body = {
			title: albumTitle
		};

		// post the body and config to the api; redirect to login on success
		const createdPlaylist = await axios.post(
			'http://localhost:5000/api/playlists',
			body,
			config
		);

		console.log(createdPlaylist);
		// add albums to play list
		stagedAlbums.forEach(async album => {
			try {
				await axios.post(
					`http://localhost:5000/api/playlists/${createdPlaylist.data.id}/${album.id}`,
					config
				);
			} catch (error) {
				console.log('error adding albums to playlist');
			}
		});
	};

	const updatePlaylist = async playlistId => {
		// create the config object for authorization
		const credentials = btoa(authUser.username + ':' + userPassword);
		const basicAuth = 'Basic ' + credentials;
		const config = {
			headers: {
				Authorization: basicAuth
			}
		};

		const trimmedSplitTitle = albumTitle
			.trim()
			.split(' ')
			.map(word => word[0].toUpperCase() + word.slice(1, word.length))
			.join(' ');

		const body = {
			title: trimmedSplitTitle
		};

		// post the body and config to the api; redirect to login on success
		await axios.put(`http://localhost:5000/api/playlists/${playlistId}`, body, config);

		// clear all staged albums

		//get playlist id
		const { data } = await axios.get(
			`http://localhost:5000/api/playlists/${playlistId}`,
			body,
			config
		);

		//for each album delete playlist album
		const albums = data.Albums;
		console.log(albums);
		for (let album of albums) {
			console.log(album);
			try {
				await axios.delete(`http://localhost:5000/api/playlists/${playlistId}/${album.id}`);
				console.log('deleted', album.id);
			} catch (error) {
				console.log('error deleting albums from playlist');
			}
		}

		// add albums to play list
		stagedAlbums.forEach(async album => {
			try {
				await axios.post(
					`http://localhost:5000/api/playlists/${playlistId}/${album.id}`,
					config
				);
				console.log('adding', album.id);
			} catch (error) {
				console.log('error adding albums to playlist');
			}
		});
	};

	const updatePlaylistHandler = async e => {
		e.preventDefault();

		// create albums that are not in db
		stagedAlbums.forEach(async album => {
			console.log(album.id);

			try {
				await axios.get(`http://localhost:5000/api/albums/${album.id}`);
			} catch (error) {
				console.log(error.response);
				if (error.response.status === 404) {
					console.log('404');
					const body = {
						id: album.id,
						img_url_1: album.images[0] ? album.images[0].url : null,
						img_url_2: album.images[1] ? album.images[1].url : null,
						img_url_3: album.images[2] ? album.images[2].url : null,
						artist: album.artists[0]['name'],
						year: album.release_date.substring(0, 4),
						title: album.name
					};

					await axios.post('http://localhost:5000/api/albums', body);
				} else {
					console.log('error creating albums');
				}
			}
		});

		try {
			if (playlist_id) {
				await updatePlaylist(e.target.value);
			} else {
				await createPlaylist();
			}
			history.push('/');
		} catch (error) {
			// if error is bad request set errors in state; else show server error
			if (error.response && error.response.status === 400) {
				const messages =
					error.response && error.response.data.errors
						? error.response.data.errors
						: error.message;
				setErrors([ ...messages ]);
			} else {
				history.push('/error');
			}
		}
	};

	const popover = (
		<Popover id='popover-basic'>
			<Popover.Title as='h3'>{albumTitle}</Popover.Title>
			<Popover.Content>
				<div className={styles.popoverContainer}>
					{stagedAlbums.length > 0 &&
						stagedAlbums.map(album => (
							<PopoverAlbums
								album={album}
								key={album.id}
								removeAlbumFromStage={removeAlbumFromStage}
							/>
						))}
					{playlist_id > 0 ? (
						<button
							className='btn btn-third-fill'
							value={playlist_id}
							onClick={updatePlaylistHandler}
						>
							Update Playlist
						</button>
					) : (
						<button className='btn btn-secondary-fill' onClick={updatePlaylistHandler}>
							Create Playlist
						</button>
					)}
				</div>
			</Popover.Content>
		</Popover>
	);

	console.log(playlist_id);

	return (
		<div className={styles.buttonContainer}>
			<OverlayTrigger trigger='click' placement='top' rootClose={true} overlay={popover}>
				{stagedAlbums && (
					<button className='btn btn-primary-fill'>
						Playlist <span className={styles.albumCount}>{stagedAlbums.length}</span>
					</button>
				)}
			</OverlayTrigger>
		</div>
	);
};

export default CreatePlaylistAlbumsPopover;
