import React, { useState } from 'react';
import axios from 'axios';

export const AuthContext = React.createContext();

export const Provider = props => {
	const [ authUser, setAuthUser ] = useState(
		localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
	);

	const [ userPassword, setUserPassword ] = useState(
		localStorage.getItem('password') ? JSON.parse(localStorage.getItem('password')) : null
	);

	const [ spotifyToken, setSpotifyToken ] = useState(
		localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null
	);

	const signIn = async (username, password) => {
		// create the config object for authorization
		const credentials = btoa(username + ':' + password);
		const basicAuth = 'Basic ' + credentials;
		const config = {
			headers: {
				Authorization: basicAuth
			}
		};

		try {
			// sumbit request with auth and get user data from api
			const response = await axios.get('http://localhost:5000/api/users', config);

			// if we get a user set the user to state and localStorage
			if (response.status === 200) {
				setAuthUser(response.data);
				setUserPassword(password);
				localStorage.setItem('user', JSON.stringify(response.data));
				localStorage.setItem('password', JSON.stringify(password));

				const { data } = await axios.get('http://localhost:5000/api/spotify', config);

				console.log('setting token ', data.access_token);
				const { access_token } = data;
				setSpotifyToken(access_token);

				localStorage.setItem('token', JSON.stringify(access_token));
			}
			// if error is unauthorized respond with error data
		} catch (error) {
			if (error.response.status === 401) {
				return error.response;
			} else {
				throw error;
			}
		}
	};

	const signOut = () => {
		// removes user and password from localstorage and state
		setAuthUser(null);
		setUserPassword('');
		localStorage.removeItem('user');
		localStorage.removeItem('password');
	};

	const createUser = async body => {
		try {
			// post body to api
			await axios.post('http://localhost:5000/api/users', body);
		} catch (error) {
			// if error is bad request send errors; if reused email send message
			if (error.response.status === 400) {
				return (
					error.response.data.errors || [ error.response.data.message ] || [
						error.message
					]
				);
			} else {
				throw error;
			}
		}
	};

	const value = {
		authUser,
		userPassword,
		spotifyToken,

		actions: {
			signIn,
			signOut,
			createUser
		}
	};

	return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>;
};
