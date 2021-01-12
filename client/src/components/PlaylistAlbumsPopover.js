import React from 'react';
import { Popover, OverlayTrigger, Button } from 'react-bootstrap';
import styles from './AlbumTrackPopover.module.css';
import Album from './Album';
import AlbumPopoverData from './AlbumPopoverData';

const PlaylistAlbumsPopover = ({ playlist }) => {
	const popover = (
		<Popover id='popover-basic'>
			<Popover.Title as='h3'>Playlist Albums</Popover.Title>
			<Popover.Content>
				<AlbumPopoverData playlist={playlist} />
			</Popover.Content>
		</Popover>
	);

	return (
		<div className={styles.buttonContainer}>
			<OverlayTrigger trigger='click' placement='top' overlay={popover}>
				<button className={styles.button}>Albums</button>
			</OverlayTrigger>
		</div>
	);
};

export default PlaylistAlbumsPopover;
