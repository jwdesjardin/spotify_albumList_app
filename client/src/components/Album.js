import React, { useState, useContext } from 'react';
import styles from './Album.module.css';
import AlbumTrackPopover from '../components/AlbumTrackPopover';
import { Link } from 'react-router-dom';

const Album = ({ album, imgSize }) => {
	return (
		<div className={styles.albumContainer}>
			<div>
				<Link to={`/album/${album.id}`}>
					<img src={imgSize === 3 ? album.img_url_3 : album.img_url_2} alt='' />
				</Link>
			</div>

			<div className={styles.gridSplit}>
				<div className={styles.albumText}>
					<p className={styles.title}>{album.title}</p>
					<p>Artist: {album.artist}</p>
					<p>Released: {album.year}</p>
				</div>

				<AlbumTrackPopover value={album.id} />
			</div>
		</div>
	);
};

export default Album;
