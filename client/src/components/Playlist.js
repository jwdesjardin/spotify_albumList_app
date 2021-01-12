import React, { useState } from 'react';
import styles from './Playlist.module.css';
import Album from './Album';
import PlaylistAlbumsPopover from './PlaylistAlbumsPopover';

const Playlist = ({ playlist, index }) => {
	const [ showAlbums, setShowAlbums ] = useState(false);

	const toggleShowAlbums = ({ target }) => {
		setShowAlbums(prevList => {
			if (prevList === true) {
				return false;
			} else {
				return true;
			}
		});
	};

	return (
		<div className={styles.playlistContainer}>
			<div className={styles.playlistDetails}>
				<h2 className={styles.title}>{playlist.title}</h2>

				<p>created by: {playlist.User.username}</p>
				<p>last updated: {playlist.updatedAt.substring(0, 10)}</p>
			</div>

			<PlaylistAlbumsPopover playlist={playlist} />
		</div>
	);
};

export default Playlist;
