import axios from 'axios';
import React, { useState, useEffect, Fragment } from 'react';
import ActionBar from '../components/layout/ActionBar';
import AlbumPlaylists from '../components/AlbumPlaylists';
import AlbumHeader from '../components/AlbumHeader';

const AlbumDetail = ({ match, history }) => {
	const { id } = match.params;

	const [ album, setAlbum ] = useState({});
	const [ playlistDetailsList, setPlaylistDetailsList ] = useState([]);

	useEffect(
		() => {
			const asyncFunc = async () => {
				try {
					const { data } = await axios.get(`http://localhost:5000/api/albums/${id}`);
					setAlbum(data);
				} catch (error) {
					console.log('error getting album');
				}
			};
			asyncFunc();
		},
		[ id ]
	);

	const goBack = () => {
		history.goBack();
	};

	const togglePlaylistDetails = ({ target }) => {
		setPlaylistDetailsList(prevList => {
			if (prevList.includes(target.value)) {
				return prevList.filter(tag => target.value !== tag);
			} else {
				return [ ...prevList, target.value ];
			}
		});
	};
	console.log(album);
	return (
		<div>
			{album &&
			album.Playlists && (
				<Fragment>
					{/* album details header */}
					<AlbumHeader album={album} />

					{/* other albums with hidden details */}
					<AlbumPlaylists
						togglePlaylistDetails={togglePlaylistDetails}
						playlistDetailsList={playlistDetailsList}
						album={album}
					/>

					<ActionBar playlist={{ UserId: null }} history={history} />

					{/* go back button */}
					<div>
						<button onClick={goBack}>go back</button>
					</div>
				</Fragment>
			)}
		</div>
	);
};

export default AlbumDetail;
