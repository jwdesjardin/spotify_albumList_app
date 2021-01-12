import React, { Fragment } from 'react';
import Playlist from './Playlist';
import styles from './AlbumPlaylists.module.css';

const AlbumPlaylists = ({ album }) => {
	return (
		<div className={styles.albumPlaylistsContainer}>
			<div className={styles.flex}>
				{album.Playlists &&
					album.Playlists.map((playlist, index) => (
						<Fragment key={index + 1}>
							<Playlist playlist={playlist} index={index} />
						</Fragment>
					))}
			</div>
		</div>
	);
};

export default AlbumPlaylists;
