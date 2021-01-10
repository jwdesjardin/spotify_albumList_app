import React from 'react';

const StagedAlbums = ({ stagedAlbums, removeAlbumFromStage }) => {
	return (
		<div className='staged-albums'>
			<h2>Albums in Playlist: </h2>
			{stagedAlbums && (
				<div className='grid'>
					{stagedAlbums.map(album => (
						<button
							className='items'
							key={album.id}
							value={album.id}
							onClick={removeAlbumFromStage}
						>
							<img src={album.images[2] ? album.images[2]['url'] : ''} alt='' />
							<p>Title: {album.name}</p>
							<p>Artist: {album.artists[0]['name']}</p>
							<p>Year: {album.release_date.substring(0, 4)}</p>
						</button>
					))}
				</div>
			)}
		</div>
	);
};

export default StagedAlbums;
