import React, { Fragment, useContext, useState, useEffect, useRef } from 'react';
import { AuthContext } from '../context/auth';
import axios from 'axios';
import AlbumSearch from '../components/AlbumSearch';
import StagedAlbums from '../components/StagedAlbums';

const UpdatePlaylist = ({ history, match }) => {
	const id = match.params.id;

	const { authUser, userPassword } = useContext(AuthContext);

	const [ playlist, setPlaylist ] = useState({});

	const [ searchResults, setSearchResults ] = useState([]);
	const [ stagedAlbums, setStagedAlbums ] = useState([]);
	const [ errors, setErrors ] = useState([]);

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
							setPlaylist(data);
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

	const titleInput = useRef('');

	const updateHandler = async event => {
		event.preventDefault();

		// shape body object from user input
		const body = {
			id: playlist.id,
			title: titleInput.current.value
		};

		// create the config object for authorization
		const credentials = btoa(authUser.emailAddress + ':' + userPassword);
		const basicAuth = 'Basic ' + credentials;
		const config = {
			headers: {
				Authorization: basicAuth
			}
		};

		try {
			// put body and config to api at the selected course
			const response = await axios.put(`http://localhost:5000/api/courses/`, body, config);
			// if response is successful redirect to courses
			if (response.status === 204) {
				history.push('/');
			}
		} catch (error) {
			// if error is bad request show errors ; else server error
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

	const checkDatabaseForAlbums = albums => {
		albums.forEach(async album => {
			try {
				await axios.get(`http://localhost:5000/api/albums/${album.id}`);
			} catch (error) {
				if (error.response.status === 404) {
					const body = {
						id: album.id,
						img_url: album.images[2] ? album.images[2].url : '',
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
	};

	const createAlbumListHandler = async e => {
		e.preventDefault();

		checkDatabaseForAlbums(stagedAlbums);

		// create the config object for authorization
		const credentials = btoa(authUser.username + ':' + userPassword);
		const basicAuth = 'Basic ' + credentials;
		const config = {
			headers: {
				Authorization: basicAuth
			}
		};

		const body = {
			title: titleInput.current.value
		};

		try {
			// post the body and config to the api; redirect to login on success
			await axios.put('http://localhost:5000/api/playlists', body, config);

			// add albums to play list
			// stagedAlbums.forEach(async album => {
			// 	try {
			// 		await axios.post(
			// 			`http://localhost:5000/api/playlists/${createdPlaylist.data
			// 				.id}/${album.id}`,
			// 			config
			// 		);
			// 	} catch (error) {
			// 		console.log('error adding albums to playlist');
			// 	}
			// });
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

	const cancelHandler = event => {
		event.preventDefault();
		history.goBack();
	};

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
		<Fragment>
			<div className='grid-66'>
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
			</div>

			<AlbumSearch
				addAlbumToStage={addAlbumToStage}
				searchResults={searchResults}
				setSearchResults={setSearchResults}
			/>

			<StagedAlbums removeAlbumFromStage={removeAlbumFromStage} stagedAlbums={stagedAlbums} />

			<div className='grid-100 pad-bottom'>
				<button className='button button-primary' onClick={createAlbumListHandler}>
					Create AlbumList
				</button>
				<button className='button button-secondary' onClick={cancelHandler}>
					Cancel
				</button>
			</div>
		</Fragment>
	);
};

export default UpdatePlaylist;
