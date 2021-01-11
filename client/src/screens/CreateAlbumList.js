import React, { Fragment, useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/auth';
import axios from 'axios';
import AlbumSearch from '../components/AlbumSearch';
import StagedAlbums from '../components/StagedAlbums';
import ActionBar from '../components/layout/ActionBar';
const CreateAlbumList = props => {
	const { authUser, userPassword } = useContext(AuthContext);

	const [ albumTitle, setAlbumTitle ] = useState('');
	const [ searchResults, setSearchResults ] = useState([]);
	const [ stagedAlbums, setStagedAlbums ] = useState([]);
	const [ errors, setErrors ] = useState([]);

	const cancelHandler = event => {
		event.preventDefault();
		props.history.goBack();
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
			<ActionBar playlist={{ UserId: null }} history={props.history} />
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
					{authUser && <p>By: {authUser.username}</p>}
				</div>
			</div>

			<AlbumSearch
				addAlbumToStage={addAlbumToStage}
				searchResults={searchResults}
				setSearchResults={setSearchResults}
			/>

			<StagedAlbums removeAlbumFromStage={removeAlbumFromStage} stagedAlbums={stagedAlbums} />

			<div className='flex'>
				<button className='button button-primary' onClick={createAlbumListHandler}>
					Create AlbumList
				</button>

				<p>
					<em>Title - "{albumTitle}"</em>
				</p>
			</div>
		</Fragment>
	);
};

export default CreateAlbumList;
