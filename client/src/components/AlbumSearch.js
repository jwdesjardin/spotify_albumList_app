import React, { Fragment, useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/auth';
import axios from 'axios';
import AlbumTrackPopover from './AlbumTrackPopover';
import ArtistSearchResults from './ArtistSearchResults';
import AlbumSearchResults from './AlbumSearchResults';

const AlbumSearch = ({ addAlbumToStage, searchResults, setSearchResults }) => {
	const { spotifyToken } = useContext(AuthContext);
	console.log(spotifyToken);
	// artists search
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

	console.log('artist data', artistData);
	return (
		<Fragment>
			<form>
				<input
					type='text'
					placeholder='artist search...'
					value={artistQuery}
					onChange={e => setArtistQuery(e.target.value)}
				/>

				<button className='button button-secondary' onClick={searchArtistHandler}>
					Submit
				</button>
			</form>

			{/* artist results */}
			{artistData.length > 0 && (
				<ArtistSearchResults artistData={artistData} setSearchResults={setSearchResults} />
			)}

			{/* album results */}
			{searchResults.length > 0 && (
				<AlbumSearchResults
					searchResults={searchResults}
					addAlbumToStage={addAlbumToStage}
				/>
			)}
		</Fragment>
	);
};

export default AlbumSearch;
