import React, { Fragment, useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/auth';
import axios from 'axios';

const AlbumSearch = ({ addAlbumToStage, searchResults, setSearchResults }) => {
	const { spotifyToken } = useContext(AuthContext);
	const [ query, setQuery ] = useState('');
	const [ artistQuery, setArtistQuery ] = useState('');
	const [ artistData, setArtistData ] = useState([]);
	const [ albumData, setAlbumData ] = useState({});

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
			console.log(query, config);
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

	const searchAlbumHandler = async ({ target }) => {
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
				`https://api.spotify.com/v1/artists/${target.value}/albums?include_groups=album&limit=40`,
				config
			);
			console.log('album search results', data.items);

			//used to handle duplicate albums given from spotify
			function removeDuplicates(myArr, prop) {
				return myArr.filter((obj, pos, arr) => {
					return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
				});
			}

			const unique = removeDuplicates(data.items, 'name');
			console.log('unique', unique);

			setSearchResults([ ...unique ]);
		} catch (error) {
			console.log('error searching for albums');
		}
	};

	const getAlbumDetails = async ({ target }) => {
		// create the config object for authorization
		try {
			const bearerToken = 'Bearer ' + spotifyToken;
			const config = {
				headers: {
					Authorization: bearerToken
				}
			};

			const { data } = await axios.get(
				`https://api.spotify.com/v1/albums/${target.value}`,
				config
			);
			console.log('search results', data);

			setAlbumData(data);
		} catch (error) {
			console.log('error getting album data');
		}
	};

	console.log('artist data', artistData);
	return (
		<Fragment>
			<form>
				<input
					type='text'
					placeholder='search by artist name...'
					value={artistQuery}
					onChange={e => setArtistQuery(e.target.value)}
				/>

				<button className='button button-secondary' onClick={searchArtistHandler}>
					Submit
				</button>
			</form>

			<form>
				<input
					type='text'
					placeholder='search by album name...'
					value={query}
					onChange={e => setQuery(e.target.value)}
				/>

				<button className='button button-secondary' onClick={searchAlbumHandler}>
					Submit
				</button>
			</form>

			{Object.keys(albumData).length > 0 && (
				<Fragment>
					<h2>Album Details</h2>
					<div>
						<img src={albumData.images[2] ? albumData.images[2]['url'] : ''} alt='' />
						<p>Title: {albumData.name}</p>
						<p>Artist: {albumData.artists[0]['name']}</p>
						<p>Year: {albumData.release_date.substring(0, 4)}</p>
						<ul>
							{albumData.tracks.items.map(track => (
								<li key={track.id}>
									{track.trackNumber}. {track.name} -{' '}
									{Math.floor(track.duration_ms / 1000 / 60)}m{' '}
									{Math.floor((track.duration_ms / 1000) % 60)}s
								</li>
							))}
						</ul>
					</div>
				</Fragment>
			)}

			{artistData.length > 0 && (
				<div>
					<h2>Artist Results</h2>
					<div className='grid' style={{ display: 'flex', flexWrap: 'wrap' }}>
						{artistData.map(artist => (
							<div
								className='items'
								key={artist.id}
								style={{ border: 'solid 1px black', padding: '1rem' }}
							>
								<img src={artist.images[2] ? artist.images[2]['url'] : ''} alt='' />

								<p>Artist: {artist.name}</p>
								<button onClick={searchAlbumHandler} value={artist.id}>
									See Albums
								</button>
							</div>
						))}
					</div>
				</div>
			)}

			{searchResults.length > 0 && (
				<div>
					<h2>Search Results</h2>
					<div className='grid' style={{ display: 'flex', flexWrap: 'wrap' }}>
						{searchResults.map(album => (
							<div
								className='items'
								key={album.id}
								style={{ border: 'solid 1px black', padding: '1rem' }}
							>
								<img src={album.images[2] ? album.images[2]['url'] : ''} alt='' />
								<p>Title: {album.name}</p>
								<p>Artist: {album.artists[0]['name']}</p>
								<p>Year: {album.release_date.substring(0, 4)}</p>
								<button onClick={addAlbumToStage} value={album.id}>
									Add To Playlist
								</button>
								<button onClick={getAlbumDetails} value={album.id}>
									Album Details
								</button>
							</div>
						))}
					</div>
				</div>
			)}
		</Fragment>
	);
};

export default AlbumSearch;
