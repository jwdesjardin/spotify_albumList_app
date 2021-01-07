import React, { Fragment, useContext, useState } from 'react';
import { AuthContext } from '../context/auth';
import axios from 'axios';

const SpotifySearch = () => {
	const { authUser, userPassword, spotifyToken } = useContext(AuthContext);

	const [ query, setQuery ] = useState('');

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
			console.log('search results', data);
		} catch (error) {
			console.log('error searching for albums');
		}
	};

	return (
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
	);
};

export default SpotifySearch;
