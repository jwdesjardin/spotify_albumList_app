import React from 'react';
import styles from './Album.module.css';
import AlbumTrackPopover from '../AlbumTracksPopover/AlbumTrackPopover';
import { Link } from 'react-router-dom';

const Album = ({ album, imgSize }) => {
	return (
		<div className={`${styles.albumContainer} card`}>
			<div>
				<Link to={`/album/${album.id}`}>
					<img
						className={styles.img}
						src={imgSize === 3 ? album.img_url_3 : album.img_url_2}
						alt=''
					/>
				</Link>
			</div>

			<div className={styles.gridSplit}>
				<div className={styles.albumText}>
					<Link to={`/album/${album.id}`}>
						<p className={styles.title}>{album.title}</p>
					</Link>
					<p>Artist: {album.artist}</p>
					<p>Released: {album.year}</p>
				</div>

				<AlbumTrackPopover value={album.id} />
			</div>
		</div>
	);
};

export default Album;
