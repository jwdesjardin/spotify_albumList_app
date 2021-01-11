import React from 'react';
import styles from './PlaylistAlbums.module.css';
import utilStyles from '../utils/utils.module.css';
import { Link } from 'react-router-dom';
import Album from '../components/Album';

const PlaylistAlbums = ({ playlist }) => {
	return (
		<div className={styles.playlistListContainer}>
			{playlist.Albums &&
				playlist.Albums.map(album => (
					<div key={album.id} className={styles.playlistCard}>
						<Album album={album} />
					</div>
				))}
		</div>
	);
};

export default PlaylistAlbums;
