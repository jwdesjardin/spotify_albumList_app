import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import UserSignIn from './screens/UserSignIn';
import UserSignUp from './screens/UserSignUp';
import UserSignOut from './screens/UserSignOut';

import Playlists from './screens/Playlists';
import PlaylistDetail from './screens/PlaylistDetail';
import AlbumDetail from './screens/AlbumDetail';
import CreateAlbumList from './screens/CreateAlbumList';

import UpdatePlaylists from './screens/UpdatePlaylists';

import Header from './components/layout/Header';
import NotFound from './screens/NotFound';
import Forbidden from './screens/Forbidden';
import UnhandledError from './screens/UnhandledError';
import PrivateRoute from './utils/PrivateRoute';
import SpotifySearch from './utils/SpotifySearch';

const App = () => {
	return (
		<Router>
			<Header />
			<Switch>
				<Route exact path='/' component={Playlists} />
				<PrivateRoute path='/albumList/create' component={CreateAlbumList} />
				<PrivateRoute path='/playlists/:id/update' component={UpdatePlaylists} />
				<Route path='/playlists/:id' component={PlaylistDetail} />
				<Route path='/album/:id' component={AlbumDetail} />
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
