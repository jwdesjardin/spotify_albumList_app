import { useState, useEffect } from 'react';
import axios from 'axios';
import ActionBar from '../components/layout/ActionBar';

import PlaylistHeader from '../components/PlaylistDetailsScreen/PlaylistHeader';
import utilStyles from '../components/utils/utils.module.css';
import PlaylistAlbums from '../components/PlaylistDetailsScreen/PlaylistAlbums';
const PlaylistDetail = props => {
	const [ playlist, setPlaylist ] = useState({});
	const id = props.match.params.id;

	useEffect(
		() => {
			(async () => {
				console.log('yellow');
				try {
					// get data from api/courses/id; setCourse with data
					const { data } = await axios.get(`http://localhost:5000/api/playlists/${id}`);

					if (data) {
						console.log(data);
						setPlaylist(data);
					}
					//handle 404 error passed back from api
				} catch (error) {
					if (error.response.status === 404) {
						props.history.push('/notfound');
					} else {
						props.history.push('/error');
					}
				}
			})();
		},
		// reapeat if id from props changes
		[ id, props.history ]
	);

	console.log(playlist);

	return (
		<div className='albumListDetail'>
			<ActionBar createPlaylist={true} playlist={playlist} history={props.history} />

			{playlist && (
				<div className={utilStyles.sectionContainer}>
					<PlaylistHeader playlist={playlist} />

					<PlaylistAlbums playlist={playlist} />
				</div>
			)}
		</div>
	);
};

export default PlaylistDetail;
