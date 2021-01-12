import React from 'react';
import styles from './PlaylistHeader.module.css';
import ImageCollage from './ImageCollage';

const PlaylistHeader = ({ playlist }) => {
	console.log(playlist);
	return (
		<div className={`${styles.headerContainer} ${styles.flexAlignStart}`}>
			<div className={styles.flexAlignStart}>
				<div class={styles.flexColumn}>
					<h3 className={styles.title}>{playlist.title}</h3>
					{playlist.User && (
						<p className={styles.username}>By: {playlist.User.username}</p>
					)}
				</div>
				<div class={styles.flexColumn}>
					<ImageCollage playlist={playlist} />
				</div>
			</div>
		</div>
	);
};

export default PlaylistHeader;
