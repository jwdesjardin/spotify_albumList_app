import React, { useContext, useState, useEffect, useRef } from 'react';
import { AuthContext } from '../context/auth';
import axios from 'axios';

import ActionBar from '../components/layout/ActionBar';
import styles from './UpdatePlaylist.module.css';
import ArtistSearch from '../components/ArtistSearch/ArtistSearch';
import AlbumSearch from '../components/AlbumSearch/AlbumSearch';
import AlbumStager from '../components/AlbumStager/AlbumStager';

import { Tabs, Tab } from 'react-bootstrap';

const UpdatePlaylists = ({ history, match }) => {
	const id = match.params.id;

	const { authUser, userPassword, spotifyToken } = useContext(AuthContext);

	const [ playlist, setPlaylist ] = useState({});
	const [ playlistTitle, setPlaylistTitle ] = useState('');
	const [ albumTitle, setAlbumTitle ] = useState('');
	const [ albumSearchResults, setAlbumSearchResults ] = useState([]);
	const [ stagedAlbums, setStagedAlbums ] = useState([]);
	const [ errors, setErrors ] = useState([]);

	const addPlaylistAlbumsToStage = async data => {
		setStagedAlbums([]);
		setPlaylist(data);
		setPlaylistTitle(data.title);
		const albums = data.Albums;

		for (let album of albums) {
			console.log(album.id);
			await addToStage(album.id);
		}
	};

	const trimTitle = albumTitle => {
		return albumTitle
			.trim()
			.split(' ')
			.map(word => word[0].toUpperCase() + word.slice(1, word.length))
			.join(' ');
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

	return (
		<div>
			<div className={styles.pageContainer}>
				<div className={styles.formContainer}>
					<h4 className={styles.formLabel}>1. Add Title</h4>
					<div className={styles.headerGrid}>
						<div className={styles.searchInputContainer}>
							<div className='flexRow flexAlign'>
								<div>
									<h2 className={styles.title}>AlbumList Title</h2>
									{authUser && (
										<p className={styles.secondaryText}>
											By: {authUser.username}
										</p>
									)}
								</div>
								<div>
									<input
										id='title'
										name='title'
										type='text'
										placeholder='AlbumList title...'
										value={albumTitle}
										onChange={e => setAlbumTitle(trimTitle(e.target.value))}
									/>
								</div>
							</div>
						</div>
					</div>

					<h4 className={styles.formLabel}>2. Create a playlist</h4>

					<Tabs defaultActiveKey='albumSearch' id='albumSeachTabs' variant='pills'>
						<Tab eventKey='albumSearch' title='Album Search'>
							<AlbumSearch setAlbumSearchResults={setAlbumSearchResults} />
						</Tab>
						<Tab eventKey='artistSearch' title='Artist Search'>
							<ArtistSearch setAlbumSearchResults={setAlbumSearchResults} />
						</Tab>
					</Tabs>

					<AlbumStager
						albumSearchResults={albumSearchResults}
						setAlbumSearchResults={setAlbumSearchResults}
						addAlbumToStage={addAlbumToStage}
						removeAlbumFromStage={removeAlbumFromStage}
						stagedAlbums={stagedAlbums}
					/>

					<div style={{ marginBottom: '7rem' }} />
				</div>
			</div>

			{stagedAlbums && (
				<ActionBar
					stagedAlbums={stagedAlbums}
					removeAlbumFromStage={removeAlbumFromStage}
					createPlaylistAlbums={stagedAlbums.length > 0 ? true : false}
					playlist={{ UserId: null }}
					history={history}
					setErrors={setErrors}
					albumTitle={albumTitle}
				/>
			)}
		</div>
	);
};

export default UpdatePlaylists;
