import React, { Fragment } from 'react';
import Playlist from './Playlist';
import Album from './Album';
import styles from './AlbumPlaylists.module.css';

const AlbumPlaylists = ({ album, togglePlaylistDetails, playlistDetailsList }) => {
	return (
		<div className={styles.albumPlaylistsContainer}>
			<div className={styles.flex}>
				{album.Playlists &&
					playlistDetailsList &&
					album.Playlists.map((playlist, index) => (
						<Fragment>
							<Playlist
								playlist={playlist}
								togglePlaylistDetails={togglePlaylistDetails}
								index={index}
								key={index + 1}
							/>

							<div
								style={
									playlistDetailsList.includes(String(playlist.id)) ? (
										{ display: 'block' }
									) : (
										{ display: 'none' }
									)
								}
							>
								<h3>playlist albums</h3>
								{playlist.Albums.length > 0 &&
									playlist.Albums.map(album => (
										<Album album={album} key={album.id} />
									))}
							</div>
						</Fragment>
					))}
			</div>
		</div>
	);
};

export default AlbumPlaylists;
