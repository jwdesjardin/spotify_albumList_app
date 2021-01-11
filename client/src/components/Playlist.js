import React from 'react';
import styles from './Playlist.module.css';


const Playlist = ({ playlist, index, togglePlaylistDetails, playlistDetailsList }) => {
	return (
		<div className={styles.playlist}>
		
			<h2 className={styles.title}>
			{index + 1}. {playlist.title}
		</h2>
		<p className={styles.username}>created by: {playlist.User.username}</p>
		<p className={styles.lastChanged}>last changed: {playlist.updatedAt.substring(0, 10)}</p>
		{}
		<button className={styles.button}  onClick={togglePlaylistDetails} value={playlist.id} >Show albums</button>
		
	
		</div>
	);
};

export default Playlist;
