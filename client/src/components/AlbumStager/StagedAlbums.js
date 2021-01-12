import React from 'react';
import styles from './StagedAlbums.module.css';
const StagedAlbums = ({ stagedAlbums, removeAlbumFromStage, notitle }) => {
	return (
		<div className={styles.stagedAlbumsContainer}>
			{!notitle && <h2>Albums in Playlist </h2>}
			{stagedAlbums && (
				<div className={styles.flexScroll}>
					{stagedAlbums.map(album => (
						<div className={styles.items} key={album.id}>
							<div className={styles.flex}>
								<img src={album.images[2] ? album.images[2]['url'] : ''} alt='' />
								<div className={styles.albumDetails}>
									<p>Title: {album.name}</p>
									<p>Artist: {album.artists[0]['name']}</p>
									<p>Year: {album.release_date.substring(0, 4)}</p>
								</div>
							</div>

							<div className={styles.flex}>
								<button
									className={styles.button}
									onClick={removeAlbumFromStage}
									value={album.id}
								>
									{' '}
									Remove{' '}
								</button>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default StagedAlbums;
