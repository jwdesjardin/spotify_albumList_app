import React from 'react';
import styles from './PopoverAlbums.module.css';
import { Link } from 'react-router-dom';

const PopoverAlbums = ({ album }) => {
	return (
		<div className={styles.albumContainer}>
			<div>
				<Link to={`/album/${album.id}`}>
					<img src={album.img_url_3} alt='' />
				</Link>
			</div>

			<div className={styles.albumText}>
				<p className={styles.title}>{album.title}</p>
				<p>Artist: {album.artist}</p>
			</div>
		</div>
	);
};

export default PopoverAlbums;
