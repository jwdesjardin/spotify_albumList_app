import React from 'react';
import styles from './PopoverData.module.css';

const PopoverData = ({ albumPopupData }) => {
	return (
		<div className={styles.tracklistContainer}>
			<ul className={styles.tracklist}>
				{albumPopupData.tracks.items.map(track => (
					<li key={track.id}>
						{track.track_number}
						{'. '}
						<a href={track.href} target='blank'>
							{track.name} - {Math.floor(track.duration_ms / 1000 / 60)}m{' '}
							{Math.floor((track.duration_ms / 1000) % 60)}s
						</a>
					</li>
				))}
			</ul>
		</div>
	);
};

export default PopoverData;
