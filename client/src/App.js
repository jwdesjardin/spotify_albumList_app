// import {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './global.css';

import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';

import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import CreateAlbumList from './components/CreateAlbumList';
import UpdateCourse from './components/UpdateCourse';

import Header from './components/Header';
import NotFound from './components/NotFound';
import Forbidden from './components/Forbidden';
import UnhandledError from './components/UnhandledError';
import PrivateRoute from './utils/PrivateRoute';
import SpotifySearch from './utils/SpotifySearch';

const App = () => {
	return (
		<Router>
			<Header />
			<Switch>
				<Route exact path='/' component={Courses} />
				<PrivateRoute path='/albumList/create' component={CreateAlbumList} />
				<PrivateRoute path='/courses/:id/update' component={UpdateCourse} />
				<Route path='/playlists/:id' component={CourseDetail} />
				<Route path='/signin' component={UserSignIn} />
				<Route path='/signup' component={UserSignUp} />
				<Route path='/signout' component={UserSignOut} />
				<Route path='/forbidden' component={Forbidden} />
				<Route path='/notfound' component={NotFound} />
				<Route path='/error' component={UnhandledError} />
				<Route render={() => <Redirect to='/notfound' />} />
			</Switch>
		</Router>
	);
};

export default App;
