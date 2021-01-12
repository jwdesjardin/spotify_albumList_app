import React, { useState, useContext } from 'react';
import styles from './ArtistSearch.module.css';
import axios from 'axios';
import ArtistSearchResults from './ArtistSearchResults';
import { AuthContext } from '../context/auth';

const ArtistSearch = ({ setAlbumSearchResults }) => {
	const { spotifyToken } = useContext(AuthContext);

	const [ artistQuery, setArtistQuery ] = useState('');
	const [ artistData, setArtistData ] = useState([]);

	const searchArtistHandler = async event => {
		event.preventDefault();

		// create the config object for authorization
		try {
			const bearerToken = 'Bearer ' + spotifyToken;
			const config = {
				headers: {
					Authorization: bearerToken
				}
			};

			const { data } = await axios.get(
				`https://api.spotify.com/v1/search?q=${artistQuery}&type=artist`,
				config
			);
			console.log('artist search results', data.artists.items);

			setArtistData([ ...data.artists.items ]);
		} catch (error) {
			console.log('error searching for artists');
		}
	};

	return (
		<div className={styles.artistSearchContainer}>
			<input
				type='text'
				placeholder='artist search...'
				className={styles.artistSearchInput}
				value={artistQuery}
				onChange={e => setArtistQuery(e.target.value)}
			/>

			<button className={styles.button} onClick={searchArtistHandler}>
				<i className='fas fa-search' />
			</button>

			<ArtistSearchResults
				artistData={artistData}
				setAlbumSearchResults={setAlbumSearchResults}
			/>
		</div>
	);
};

export default ArtistSearch;
