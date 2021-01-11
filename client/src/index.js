import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from './context/auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/styles.css';

ReactDOM.render(
	<Provider>
		<App />
	</Provider>,
	document.getElementById('root')
);
