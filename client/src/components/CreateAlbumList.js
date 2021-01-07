import React, { Fragment, useContext, useState } from 'react';
import { AuthContext } from '../context/auth';
import axios from 'axios';
import SpotifySearch from '../utils/SpotifySearch';

const CreateAlbumList = props => {
	const { authUser, userPassword, spotifyToken } = useContext(AuthContext);

	const [ albumTitle, setAlbumTitle ] = useState('');
	const [ query, setQuery ] = useState('');
	const [ searchResults, setSearchResults ] = useState([]);
	const [ stagedAlbums, setStagedAlbums ] = useState([]);
	const [ errors, setErrors ] = useState([]);

	const cancelHandler = event => {
		event.preventDefault();
		props.history.goBack();
	};

	const createCourseHandler = async event => {
		event.preventDefault();
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

	const searchHandler = async event => {
		event.preventDefault();

		console.log(query);

		// create the config object for authorization
		try {
			const bearerToken = 'Bearer ' + spotifyToken;
			const config = {
				headers: {
					Authorization: bearerToken
				}
			};
			console.log(query, config);
			const { data } = await axios.get(
				`https://api.spotify.com/v1/search?q=${query}&type=album`,
				config
			);
			console.log('search results', data.albums.items);

			setSearchResults([ ...data.albums.items ]);
		} catch (error) {
			console.log('error searching for albums');
		}
	};

	const createAlbumListHandler = async e => {
		e.preventDefault();

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

		try {
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
						`http://localhost:5000/api/playlists/${createdPlaylist.data
							.id}/${album.id}`,
						config
					);
				} catch (error) {
					console.log('error adding albums to playlist');
				}
			});
			props.history.push('/');
		} catch (error) {
			// if error is bad request set errors in state; else show server error
			if (error.response.status === 400) {
				const messages =
					error.response && error.response.data.errors
						? error.response.data.errors
						: error.message;
				setErrors([ ...messages ]);
			} else {
				props.history.push('/error');
			}
		}
	};

	return (
		<Fragment>
			<form>
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
								value={albumTitle}
								onChange={e => setAlbumTitle(e.target.value)}
							/>
						</div>
						{authUser && (
							<p>
								By: {authUser.firstName} {authUser.lastName}
							</p>
						)}
					</div>
				</div>

				<div className='grid-100 pad-bottom'>
					<button className='button' onClick={createCourseHandler} type='submit'>
						Create Course
					</button>
					<button className='button button-secondary' onClick={cancelHandler}>
						Cancel
					</button>
				</div>
			</form>

			<form>
				<input
					type='text'
					placeholder='search spotify for albums...'
					value={query}
					onChange={e => setQuery(e.target.value)}
				/>
				<button className='button button-secondary' onClick={searchHandler}>
					Submit
				</button>
			</form>

			{searchResults.length > 0 && (
				<div>
					<h2>Search Results</h2>
					<div className='grid'>
						{searchResults.map(album => (
							<button
								className='items'
								key={album.id}
								value={album.id}
								onClick={addAlbumToStage}
							>
								<img src={album.images[2] ? album.images[2]['url'] : ''} alt='' />
								<p>Title: {album.name}</p>
								<p>Artist: {album.artists[0]['name']}</p>
								<p>Year: {album.release_date.substring(0, 4)}</p>
							</button>
						))}
					</div>
				</div>
			)}

			<div className='staged-albums'>
				<h2>Staged Albums: </h2>
				{stagedAlbums && (
					<div className='grid'>
						{stagedAlbums.map(album => (
							<button
								className='items'
								key={album.id}
								value={album.id}
								onClick={removeAlbumFromStage}
							>
								<img src={album.images[2] ? album.images[2]['url'] : ''} alt='' />
								<p>Title: {album.name}</p>
								<p>Artist: {album.artists[0]['name']}</p>
								<p>Year: {album.release_date.substring(0, 4)}</p>
							</button>
						))}
					</div>
				)}
			</div>

			<button className='button button-primary' onClick={createAlbumListHandler}>
				Create AlbumList
			</button>
		</Fragment>
	);
};

export default CreateAlbumList;
