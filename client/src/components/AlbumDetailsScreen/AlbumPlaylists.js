import React, { Fragment } from 'react';
import Playlist from '../utils/Playlist';
import styles from './AlbumPlaylists.module.css';
import utilStyles from '../utils/utils.module.css';

const AlbumPlaylists = ({ album }) => {
	return (
		<div className={styles.albumPlaylistsContainer}>
			<div className={`${utilStyles.container} ${styles.flex}`}>
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
