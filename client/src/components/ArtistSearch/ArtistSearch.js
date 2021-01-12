import React, { useState, useContext, useEffect } from 'react';
import styles from './ArtistSearch.module.css';
import axios from 'axios';
import ArtistSearchResults from './ArtistSearchResults';
import { AuthContext } from '../../context/auth';
import { Redirect } from 'react-router-dom';
const ArtistSearch = ({ setAlbumSearchResults, location }) => {
	const { spotifyToken } = useContext(AuthContext);

	const [ artistQuery, setArtistQuery ] = useState();
	const [ artistData, setArtistData ] = useState([]);
	const [ redirect, setRedirect ] = useState('');

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
			if (error.response.status === 401) {
				setRedirect('/signin');
			}
			console.log('error searching for artists');
		}
	};

	return (
		<div>
			{redirect === '' ? (
				<div className={styles.artistSearchContainer}>
					<form>
						<input
							type='text'
							placeholder='artist search...'
							className={styles.artistSearchInput}
							value={artistQuery}
							onChange={e => setArtistQuery(e.target.value)}
						/>

						<button
							className={styles.button}
							type='submit'
							onClick={searchArtistHandler}
						>
							<i className='fas fa-search' />
						</button>
					</form>

					<ArtistSearchResults
						artistData={artistData}
						setAlbumSearchResults={setAlbumSearchResults}
					/>
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

export default ArtistSearch;
