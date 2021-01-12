import React from 'react';
import { Link } from 'react-router-dom';

import styles from './AlbumListGrid.module.css';
import utilStyles from '../utils/utils.module.css';

const AlbumListGrid = ({ playlists }) => {
	return (
		<div className={`${utilStyles.container} ${styles.playlistGridContainer}`}>
			{playlists &&
				playlists.map(playlist => (
					<Link key={playlist.id} to={`/playlists/${playlist.id}`}>
						<div className={styles.playlistGridItem}>
							<h3 className={styles.playlistGridItemTitle}>{playlist.title}</h3>
							<h4 className={styles.playlistGridItemUser}>
								by: {playlist.User && `${playlist.User.username}`}
							</h4>
						</div>
					</Link>
				))}

			<Link className='' to='/playlists/create'>
				<div className={styles.playlistGridItem}>
					<div className={styles.flex} />
					<h3 className={styles.playlistGridItemTitle}>
						<svg
							version='1.1'
							xmlns='http://www.w3.org/2000/svg'
							x='0px'
							y='0px'
							viewBox='0 0 13 13'
							className={styles.addSymbol}
						>
							<polygon points='7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 ' />
						</svg>
						{'  '}
						New AlbumList
					</h3>
				</div>
			</Link>
		</div>
	);
};

export default AlbumListGrid;
