import React from 'react';
import { Popover, OverlayTrigger } from 'react-bootstrap';

import styles from '../utils/Popover.module.css';

import StagedAlbums from '../AlbumStager/StagedAlbums';

const CreatePlaylistAlbumsPopover = ({ stagedAlbums, removeAlbumFromStage }) => {
	const popover = (
		<Popover id='popover-basic'>
			<Popover.Title as='h3'>Albums in Playlist</Popover.Title>
			<Popover.Content>
				<StagedAlbums
					notitle={true}
					stagedAlbums={stagedAlbums}
					removeAlbumFromStage={removeAlbumFromStage}
				/>
			</Popover.Content>
		</Popover>
	);

	return (
		<div className={styles.buttonContainer}>
			<OverlayTrigger trigger='click' placement='top' overlay={popover}>
				{stagedAlbums && (
					<button className='btn btn-info'>Playlist {stagedAlbums.length}</button>
				)}
			</OverlayTrigger>
		</div>
	);
};

export default CreatePlaylistAlbumsPopover;
