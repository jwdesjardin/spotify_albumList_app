import React, { useContext, useState, useEffect, useRef } from 'react';
import { AuthContext } from '../context/auth';
import axios from 'axios';

import ActionBar from '../components/layout/ActionBar';
import styles from './CreatePlaylist.module.css';
import ArtistSearch from '../components/ArtistSearch/ArtistSearch';
import AlbumStager from '../components/AlbumStager/AlbumStager';

const UpdatePlaylists = ({ history, match }) => {
	const id = match.params.id;

	const { authUser, userPassword, spotifyToken } = useContext(AuthContext);

	const [ playlist, setPlaylist ] = useState({});

	const [ albumSearchResults, setAlbumSearchResults ] = useState([]);
	const [ stagedAlbums, setStagedAlbums ] = useState([]);
	const [ errors, setErrors ] = useState([]);

	const titleInput = useRef('');

	const addPlaylistAlbumsToStage = async data => {
		setStagedAlbums([]);
		setPlaylist(data);
		const albums = data.Albums;

		for (let album of albums) {
			console.log(album.id);
			await addToStage(album.id);
		}
	};

	const addToStage = async id => {
		console.log('addToStage 1');
		try {
			const bearerToken = 'Bearer ' + spotifyToken;
			const config = {
				headers: {
					Authorization: bearerToken
				}
			};

			const { data } = await axios.get(`https://api.spotify.com/v1/albums/${id}`, config);

			console.log('adding to staged albums');
			setStagedAlbums(prevState => [ ...prevState, data ]);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(
		() => {
			(async () => {
				try {
					// get course detail from api
					console.log(id);
					const { data } = await axios.get(`http://localhost:5000/api/playlists/${id}`);
					if (data) {
						// if the logged in user does not match the course fetched
						console.log(data);
						if (authUser && data.User.id !== authUser.id) {
							history.push('/forbidden');
						} else {
							// if there is a course and it matches logged user set data in state

							addPlaylistAlbumsToStage(data);
						}
					}
				} catch (error) {
					// if error is course not found show notfound page; else server error
					if (error.response && error.response.status === 404) {
						history.push('/notfound');
					} else {
						history.push('/error');
					}
				}
			})();
		},
		[ id, history, authUser ]
	);

	const addAlbumToStage = e => {
		e.preventDefault();
		const albumId = e.currentTarget.value;
		const album = albumSearchResults.filter(album => album.id === albumId);
		setStagedAlbums(prevState => setStagedAlbums([ ...prevState, ...album ]));

		const duplicate = stagedAlbums.filter(album => album.id === albumId);
		if (duplicate.length < 0) {
		}
	};

	const removeAlbumFromStage = e => {
		e.preventDefault();

		const albumId = e.currentTarget.value;
		const filteredAlbums = stagedAlbums.filter(album => album.id !== albumId);
		setStagedAlbums([ ...filteredAlbums ]);
	};

	const updateAlbumListHandler = async e => {
		e.preventDefault();
		const playlistId = e.target.value;
		//checking if each album is in db and if not creating it
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

		// create the config object for authorization
		const credentials = btoa(authUser.username + ':' + userPassword);
		const basicAuth = 'Basic ' + credentials;
		const config = {
			headers: {
				Authorization: basicAuth
			}
		};

		//update title
		const body = {
			title: titleInput.current.value
		};

		try {
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
					await axios.delete(
						`http://localhost:5000/api/playlists/${playlistId}/${album.id}`
					);
					console.log('deleted', album.id);
				} catch (error) {
					console.log('error deleting albums from playlist');
				}
			}

			// add albums to play list
			stagedAlbums.forEach(async album => {
				try {
					await axios.post(
						`http://localhost:5000/api/playlists/${playlist.id}/${album.id}`,
						config
					);
					console.log('adding', album.id);
				} catch (error) {
					console.log('error adding albums to playlist');
				}
			});
			history.push('/');
		} catch (error) {
			// if error is bad request set errors in state; else show server error
			if (error.response.status === 400) {
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

	return (
		<div className={styles.pageContainer}>
			{playlist && (
				<div className={styles.formContainer}>
					<h4 className={styles.formLabel}>1. Add Title</h4>
					<div className={styles.flex}>
						<div className={styles.searchInputContainer}>
							<input
								id='title'
								name='title'
								type='text'
								className=''
								placeholder='AlbumList title...'
								ref={titleInput}
								defaultValue={playlist.title}
							/>
							{authUser && (
								<p className={styles.secondaryText}>By: {authUser.username}</p>
							)}
						</div>

						<button
							className={styles.button}
							onClick={updateAlbumListHandler}
							value={playlist.id}
						>
							Update AlbumList
						</button>
					</div>

					<h4 className={styles.formLabel}>2. Create a playlist</h4>
					<ArtistSearch setAlbumSearchResults={setAlbumSearchResults} />

					<AlbumStager
						albumSearchResults={albumSearchResults}
						setAlbumSearchResults={setAlbumSearchResults}
						addAlbumToStage={addAlbumToStage}
						removeAlbumFromStage={removeAlbumFromStage}
						stagedAlbums={stagedAlbums}
					/>

					<div style={{ marginBottom: '7rem' }} />
					<ActionBar
						playlist={{ UserId: null }}
						history={history}
						editPage={true}
						stagedAlbums={stagedAlbums}
						removeAlbumFromStage={removeAlbumFromStage}
						createPlaylistAlbums={stagedAlbums.length > 0 ? true : false}
					/>
				</div>
			)}
		</div>
	);
};

export default UpdatePlaylists;
