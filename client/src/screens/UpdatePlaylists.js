import React, { Fragment, useContext, useState, useEffect, useRef } from 'react';
import { AuthContext } from '../context/auth';
import axios from 'axios';
import AlbumSearch from '../components/AlbumSearch';
import StagedAlbums from '../components/StagedAlbums';

const UpdatePlaylists = ({ history, match }) => {
	const id = match.params.id;

	const { authUser, userPassword, spotifyToken } = useContext(AuthContext);

	const [ playlist, setPlaylist ] = useState({});

	const [ searchResults, setSearchResults ] = useState([]);
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
		const album = searchResults.filter(album => album.id === albumId);
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
			{playlist && (
				<div className='bounds course--detail'>
					<div className='grid-66'>
						{/* albumList title */}
						<div className='course--header'>
							<h4 className='course--label'>Title</h4>
							<div>
								<input
									id='title'
									name='title'
									type='text'
									className='input-title course--title--input'
									placeholder='AlbumList title...'
									defaultValue={playlist.title}
									ref={titleInput}
								/>
							</div>
							{authUser && <p>By: {authUser.username}</p>}
						</div>

						<AlbumSearch
							addAlbumToStage={addAlbumToStage}
							searchResults={searchResults}
							setSearchResults={setSearchResults}
						/>
						<StagedAlbums
							removeAlbumFromStage={removeAlbumFromStage}
							stagedAlbums={stagedAlbums}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default UpdatePlaylists;
