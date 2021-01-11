import React from 'react';
import styles from './AlbumSearchResults.module.css';
const StagedAlbums = ({ stagedAlbums, removeAlbumFromStage }) => {
	return (
		<div className='staged-albums'>
			<h2>Albums in Playlist: </h2>
			{stagedAlbums && (
				<div className={styles.grid}>
					{stagedAlbums.map(album => (
						<div className={styles.items} key={album.id}>
							<img src={album.images[2] ? album.images[2]['url'] : ''} alt='' />
							<p>Title: {album.name}</p>
							<p>Artist: {album.artists[0]['name']}</p>
							<p>Year: {album.release_date.substring(0, 4)}</p>
							<button
								className='btn btn-danger'
								onClick={removeAlbumFromStage}
								value={album.id}
							>
								{' '}
								Remove{' '}
							</button>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default StagedAlbums;
