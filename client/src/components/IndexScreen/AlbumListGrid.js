import React from 'react';
import { Link } from 'react-router-dom';

import styles from './AlbumListGrid.module.css';
import utilStyles from '../utils/utils.module.css';
import ImageCollage from '../utils/ImageCollage';

const AlbumListGrid = ({ playlists }) => {
	return (
		<div className={`${utilStyles.container} ${styles.playlistGridContainer}`}>
			{playlists &&
				playlists.map(playlist => (
					<Link key={playlist.id} to={`/playlists/${playlist.id}`}>
						<div className={styles.playlistGridItem}>
							<div>
								<h3 className={styles.playlistGridItemTitle}>{playlist.title}</h3>
								<h4 className={styles.playlistGridItemUser}>
									by: {playlist.User && `${playlist.User.username}`}
								</h4>
							</div>

							<div className={styles.ImageCollage}>
								<ImageCollage playlist={playlist} />
							</div>
						</div>
					</Link>
				))}
		</div>
	);
};

export default AlbumListGrid;
