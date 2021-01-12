import React from 'react';
import styles from './PlaylistHeader.module.css';
import ImageCollage from '../utils/ImageCollage';
import utilStyles from '../utils/utils.module.css';

const PlaylistHeader = ({ playlist }) => {
	console.log(playlist);
	return (
		<div className={`${styles.headerContainer} ${styles.flex}`}>
			<div className={`${utilStyles.container} ${styles.flex}`}>
				<div className={styles.headerTextBox}>
					<h3 className={styles.title}>{playlist.title}</h3>
					{playlist.User && (
						<p className={styles.username}>By: {playlist.User.username}</p>
					)}
				</div>

				<ImageCollage playlist={playlist} />
			</div>
		</div>
	);
};

export default PlaylistHeader;
