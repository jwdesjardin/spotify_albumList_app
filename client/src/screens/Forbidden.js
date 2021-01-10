import React from 'react';
import { Link } from 'react-router-dom';

const Forbidden = () => {
	return (
		<div>
			<h1>Forbidden</h1>
			<p>You do not have access to the page requested</p>
			<Link to='/'>Home</Link>
		</div>
	);
};

export default Forbidden;
