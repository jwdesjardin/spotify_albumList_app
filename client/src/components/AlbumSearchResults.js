import React from 'react';
import AlbumTrackPopover from '../components/AlbumTrackPopover';
import styles from './AlbumSearchResults.module.css';

const AlbumSearchResults = ({ searchResults, addAlbumToStage }) => {
	return (
		<div>
			<h2>Search Results</h2>
			<div className={styles.grid}>
				{searchResults.map(album => (
					<div className={styles.items} key={album.id}>
						<img src={album.images[2] ? album.images[2]['url'] : ''} alt='' />
						<p>Title: {album.name}</p>
						<p>Artist: {album.artists[0]['name']}</p>
						<p>Year: {album.release_date.substring(0, 4)}</p>
						<div>
							<button
								className='btn btn-primary'
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
