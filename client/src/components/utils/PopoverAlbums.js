import React from 'react';
import styles from './PopoverAlbums.module.css';
import { Link } from 'react-router-dom';

const PopoverAlbums = ({ album, removeAlbumFromStage }) => {
	console.log(album);
	return (
		<div className={styles.albumContainer}>
			<div>
				<Link to={`/album/${album.id}`}>
					<img src={album.images[2]['url']} alt='' />
				</Link>
			</div>

			<div className={styles.albumText}>
				<p className={styles.title}>{album.name}</p>
				<p>Artist: {album.artists[0].name}</p>
			</div>

			<button className={styles.times} onClick={removeAlbumFromStage} value={album.id}>
				<i class='fas fa-times' />
			</button>
		</div>
	);
};

export default PopoverAlbums;
