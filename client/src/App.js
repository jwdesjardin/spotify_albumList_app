import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import UserSignIn from './screens/UserSignIn';
import UserSignUp from './screens/UserSignUp';
import UserSignOut from './screens/UserSignOut';

import Playlists from './screens/Playlists';
import PlaylistDetail from './screens/PlaylistDetail';
import AlbumDetail from './screens/AlbumDetail';
import CreatePlaylist from './screens/CreatePlaylist';

import UpdatePlaylists from './screens/UpdatePlaylists';

import Header from './components/layout/Header';
import NotFound from './screens/NotFound';
import Forbidden from './screens/Forbidden';
import UnhandledError from './screens/UnhandledError';
import PrivateRoute from './components/utils/PrivateRoute';

const App = () => {
	return (
		<Router>
			<Header />
			<Switch>
				<Route exact path='/' component={Playlists} />
				<Route exact path='/playlists/create' component={CreatePlaylist} />
				<Route path='/playlists/:id' component={PlaylistDetail} />

				<PrivateRoute path='/playlists/:id/update' component={UpdatePlaylists} />

				<PrivateRoute path='/album/:id' component={AlbumDetail} />
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
