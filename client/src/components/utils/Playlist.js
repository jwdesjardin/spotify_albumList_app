import React from 'react';
import styles from './Playlist.module.css';
import ImageCollage from '../utils/ImageCollage';
import PlaylistAlbumsPopover from '../PlaylistAlbumsPopover/PlaylistAlbumsPopover';
import { Link } from 'react-router-dom';
const Playlist = ({ playlist, index }) => {
	return (
		<div className={`${styles.playlistContainer} card`}>
			<div className='flexAlign flexSpacing'>
				<div className={`${styles.flexRow}`}>
					<div className={styles.albumDetails}>
						<Link to={`/playlists/${playlist.id}`}>
							<h2 className={styles.title}>{playlist.title}</h2>
						</Link>
						<p>by: {playlist.User.username}</p>
					</div>

					<PlaylistAlbumsPopover playlist={playlist} />
				</div>

				<div className='flexColumn'>
					<Link to={`/playlists/${playlist.id}`}>
						<div className={styles.imgCollage}>
							<ImageCollage playlist={playlist} />
						</div>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Playlist;
