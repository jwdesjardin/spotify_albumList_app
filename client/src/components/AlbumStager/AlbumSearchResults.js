import React from 'react';
import AlbumTrackPopover from '../AlbumTracksPopover/AlbumTrackPopover';

import styles from './AlbumSearchResults.module.css';

const AlbumSearchResults = ({ albumSearchResults, addAlbumToStage }) => {
	console.log('albums', albumSearchResults);
	return (
		<div className={styles.albumSearchResultsContainer}>
			<h2>Album Results</h2>
			<div className={styles.flexScroll}>
				{albumSearchResults.length > 0 &&
					albumSearchResults.map((album, index) => (
						<div className={styles.items} key={index}>
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
									onClick={addAlbumToStage}
									value={album.id}
								>
									Add To Playlist
								</button>
								<AlbumTrackPopover value={album.id} />
							</div>
						</div>
					))}
			</div>
		</div>
	);
};

export default AlbumSearchResults;
