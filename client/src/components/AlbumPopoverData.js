import React from 'react';

import PopoverAlbums from './PopoverAlbums';
import styles from './AlbumPopoverData.module.css';

const AlbumPopoverData = ({ playlist }) => {
	return (
		<div className={styles.popoverContainer}>
			{playlist.Albums.length > 0 &&
				playlist.Albums.map(album => <PopoverAlbums album={album} key={album.id} />)}
		</div>
	);
};

export default AlbumPopoverData;
