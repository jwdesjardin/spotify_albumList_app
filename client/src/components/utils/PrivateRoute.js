import React, { useContext } from 'react';
import { AuthContext } from '../../context/auth';
import { Route, Redirect } from 'react-router-dom';

// private route takes a component and other props as ...rest
const PrivateRoute = ({ component: Component, ...rest }) => {
	const { authUser, spotifyToken } = useContext(AuthContext);

	// return a route with the props from rest spread in
	return (
		<Route
			{...rest}
			render={props =>
				// if there is  a logged in user
				authUser !== null ? (
					// display the component
					<Component {...props} {...rest} />
				) : (
					// no logged in user; redirect to sign in with from saved
					<Redirect
						to={{
							pathname: '/signin',
							state: { from: props.location }
						}}
					/>
				)}
		/>
	);
};

export default PrivateRoute;
