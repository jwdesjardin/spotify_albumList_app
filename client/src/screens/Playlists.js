import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AlbumListGrid from '../components/AlbumListGrid';

const Playlists = ({ history }) => {
	const [ playlists, setPlaylists ] = useState([]);

	useEffect(
		() => {
			(async () => {
				try {
					// get all courses data from api/courses; setCourses with data
					const { data } = await axios.get('http://localhost:5000/api/playlists');
					setPlaylists(data);
					// this should always work; any error coming back is handled as a server error
				} catch (error) {
					history.push('/error');
				}
			})();
		},
		// repeat on history change
		[ history ]
	);

	console.log(playlists);

	return (
		<section className='albumList'>
			{/* albumlist grid*/}
			<AlbumListGrid playlists={playlists} />

			{/* new album list button */}
		</section>
	);
};

export default Playlists;
