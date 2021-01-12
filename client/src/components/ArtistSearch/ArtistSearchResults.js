import React, { useContext } from 'react';
import { AuthContext } from '../../context/auth';
import axios from 'axios';
import styles from './ArtistSearchResults.module.css';

const ArtistSearchResults = ({ artistData, setAlbumSearchResults }) => {
	const { spotifyToken } = useContext(AuthContext);

	const searchAlbumHandler = async event => {
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
				`https://api.spotify.com/v1/artists/${event.currentTarget
					.value}/albums?include_groups=album&limit=40`,
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

			setAlbumSearchResults([ ...unique ]);
		} catch (error) {
			console.log('error searching for albums');
		}
	};

	return (
		<div>
			<h2>Artist Results</h2>
			<div className={styles.flexScroll}>
				{artistData.length > 0 &&
					artistData.map(artist => (
						<button
							onClick={searchAlbumHandler}
							value={artist.id}
							className={styles.gridItems}
							key={artist.id}
						>
							<img src={artist.images[2] ? artist.images[2]['url'] : ''} alt='' />

							<p>Artist: {artist.name}</p>
							{/* <button onClick={searchAlbumHandler} value={artist.id}>
							See Albums
						</button> */}
						</button>
					))}
			</div>
		</div>
	);
};

export default ArtistSearchResults;
