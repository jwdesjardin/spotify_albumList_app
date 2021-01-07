import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
	return (
		<div>
			<h1>Not Found</h1>
			<p>The page you requested could not be found</p>
			<Link to='/'>Home</Link>
		</div>
	);
};

export default NotFound;
