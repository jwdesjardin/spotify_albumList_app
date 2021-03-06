import axios from 'axios';
import React, { useState, useEffect, Fragment } from 'react';
import ActionBar from '../components/layout/ActionBar';
import AlbumPlaylists from '../components/AlbumDetailsScreen/AlbumPlaylists';
import AlbumHeader from '../components/AlbumDetailsScreen/AlbumHeader';

const AlbumDetail = ({ match, history }) => {
	const { id } = match.params;

	const [ album, setAlbum ] = useState({});

	useEffect(
		() => {
			const asyncFunc = async () => {
				try {
					const { data } = await axios.get(`/api/albums/${id}`);
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

	console.log(album);
	return (
		<div>
			{album &&
			album.Playlists && (
				<Fragment>
					{/* album details header */}
					<AlbumHeader album={album} />

					{/* other albums with hidden details */}
					<AlbumPlaylists album={album} />

					<ActionBar
						createPlaylist={true}
						playlist={{ UserId: null }}
						history={history}
					/>

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
