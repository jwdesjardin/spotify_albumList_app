import React, { useState, useContext, useEffect } from 'react';
import styles from './AlbumSearch.module.css';
import axios from 'axios';

import { AuthContext } from '../../context/auth';
import { Redirect } from 'react-router-dom';

const AlbumSearch = ({ setAlbumSearchResults, location }) => {
	const { spotifyToken } = useContext(AuthContext);

	const [ albumQuery, setAlbumQuery ] = useState('');

	const [ redirect, setRedirect ] = useState('');

	useEffect(() => {
		const getTopAlbums = async () => {
			try {
				const bearerToken = 'Bearer ' + spotifyToken;
				const config = {
					headers: {
						Authorization: bearerToken
					}
				};

				const { data } = await axios.get(
					'https://api.spotify.com/v1/playlists/7qWT4WcLgV6UUIPde0fqf9',
					config
				);

				const mappedAlbums = data.tracks.items.map(track => track.track.album);

				setAlbumSearchResults(mappedAlbums);
			} catch (error) {
				console.log('error getting top albums');
			}
		};
		getTopAlbums();
	}, []);

	const searchAlbumHandler = async event => {
		event.preventDefault();

		setAlbumSearchResults([]);
		// create the config object for authorization
		try {
			const bearerToken = 'Bearer ' + spotifyToken;
			const config = {
				headers: {
					Authorization: bearerToken
				}
			};

			const { data } = await axios.get(
				`https://api.spotify.com/v1/search?q=${albumQuery}&type=album`,
				config
			);
			console.log('album search results', data.albums.items);

			setAlbumSearchResults([ ...data.albums.items ]);
		} catch (error) {
			if (error.response.status === 401) {
				setRedirect('/signin');
			}
			console.log('error searching for albums');
		}
	};

	return (
		<div>
			{redirect === '' ? (
				<div className={styles.artistSearchContainer}>
					<input
						type='text'
						placeholder='album search...'
						className={styles.artistSearchInput}
						value={albumQuery}
						onChange={e => setAlbumQuery(e.target.value)}
					/>

					<button className={styles.button} type='submit' onClick={searchAlbumHandler}>
						<i className='fas fa-search' />
					</button>
				</div>
			) : (
				<Redirect
					to={{
						pathname: `${redirect}`,
						state: { from: location }
					}}
				/>
			)}
		</div>
	);
};

export default AlbumSearch;
