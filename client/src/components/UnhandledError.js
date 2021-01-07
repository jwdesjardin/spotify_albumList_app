import React from 'react';
import { Link } from 'react-router-dom';

const UnhandledError = () => {
	return (
		<div>
			<h1>Unexpected Error</h1>
			<p>
				Server error... Please restart and try again. Or let me know by leaving an issue on
				my{' '}
				<a href='https://github.com/jwdesjardin/fullstack_react_app'>github project page</a>
			</p>
			<Link to='/'>Home</Link>
		</div>
	);
};

export default UnhandledError;
