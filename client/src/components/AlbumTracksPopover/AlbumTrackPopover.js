import React, { useState, useContext } from 'react';
import { Popover, OverlayTrigger } from 'react-bootstrap';
import axios from 'axios';
import { AuthContext } from '../../context/auth';
import styles from '../utils/Popover.module.css';
import PopoverData from './PopoverData';

const AlbumTrackPopover = ({ value }) => {
	const { spotifyToken } = useContext(AuthContext);
	const [ albumPopupData, setAlbumPopupData ] = useState({});

	const getAlbumDetails = async ({ target }) => {
		// create the config object for authorization
		try {
			const bearerToken = 'Bearer ' + spotifyToken;
			const config = {
				headers: {
					Authorization: bearerToken
				}
			};

			const { data } = await axios.get(
				`https://api.spotify.com/v1/albums/${target.value}`,
				config
			);

			setAlbumPopupData(data);
		} catch (error) {
			console.log('error getting album data');
		}
	};

	const popover = (
		<Popover id='popover-basic'>
			<Popover.Title as='h3'>Tracklist</Popover.Title>
			<Popover.Content>
				{Object.keys(albumPopupData).length > 0 && (
					<PopoverData albumPopupData={albumPopupData} />
				)}
			</Popover.Content>
		</Popover>
	);

	return (
		<div className={styles.buttonContainer}>
			<OverlayTrigger trigger='click' placement='top' overlay={popover}>
				<button onClick={getAlbumDetails} value={value} className={styles.button}>
					Tracks
				</button>
			</OverlayTrigger>
		</div>
	);
};

export default AlbumTrackPopover;
