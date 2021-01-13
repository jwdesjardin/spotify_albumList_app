import React from 'react';
import styles from './PlaylistAlbums.module.css';
import utilStyles from '../utils/utils.module.css';
import Album from '../utils/Album';

const PlaylistAlbums = ({ playlist }) => {
	return (
		<div className={`${utilStyles.container} ${styles.playlistListContainer}`}>
			{playlist.Albums &&
				playlist.Albums.map(album => <Album key={album.id} album={album} />)}
		</div>
	);
};

export default PlaylistAlbums;
