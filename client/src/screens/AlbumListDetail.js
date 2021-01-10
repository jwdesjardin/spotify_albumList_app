import { useState, useEffect } from 'react';
import axios from 'axios';
import ActionBar from '../utils/ActionBar';
import { Link } from 'react-router-dom';

const AlbumListDetail = props => {
	const [ playlist, setPlaylist ] = useState({});
	const id = props.match.params.id;

	useEffect(
		() => {
			(async () => {
				try {
					// get data from api/courses/id; setCourse with data
					const { data } = await axios.get(`http://localhost:5000/api/playlists/${id}`);

					if (data) {
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
		<div>
			<ActionBar playlist={playlist} history={props.history} />
			{/* only display the details if we have a course and user in state */}
			{playlist && (
				<div className='bounds course--detail'>
					<div className='grid-66'>
						<div className='course--header'>
							<h4 className='course--label'>Playlist</h4>
							<h3 className='course--title'>{playlist.title}</h3>
							{/* <p>By {course.UserId.firstName + ' ' + course.user.lastName}</p> */}
						</div>
						<div className='course--description'>
							{playlist.Albums &&
								playlist.Albums.map(album => (
									<Link key={album.id} to={`/album/${album.id}`}>
										<div
											style={{
												border: '2px solid black',
												padding: '1rem',
												margin: '.2rem'
											}}
										>
											<img src={album.img_url} alt='' />
											<p>Title: {album.title}</p>
											<p>Artist: {album.artist}</p>
											<p>Year: {album.year}</p>
										</div>
									</Link>
								))}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default AlbumListDetail;
