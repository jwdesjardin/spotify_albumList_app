import React, { Fragment, useState, useContext, useEffect } from 'react';
import { Popover, OverlayTrigger, Button } from 'react-bootstrap';
import axios from 'axios';
import { AuthContext } from '../../context/auth';
import styles from './AlbumHeader.module.css';
import utilStyles from '../utils/utils.module.css';

const AlbumHeader = ({ album }) => {
	const { spotifyToken, spotifyHeader } = useContext(AuthContext);
	const [ albumData, setAlbumData ] = useState({});

	useEffect(
		() => {
			const getAlbumData = async () => {
				try {
					const bearerToken = 'Bearer ' + spotifyToken;
					const config = {
						headers: {
							Authorization: bearerToken
						}
					};

					const { data } = await axios.get(
						`https://api.spotify.com/v1/albums/${album.id}`,
						config
					);

					setAlbumData(data);
				} catch (error) {
					console.log('error getting album data');
				}
			};
			getAlbumData();
		},
		[ album, spotifyToken ]
	);

	console.log(albumData);
	return (
		<div className={`${styles.albumHeaderContainer}`}>
			{albumData && (
				<div className={`${utilStyles.container} ${styles.flex}`}>
					<div className={styles.albumInfo}>
						<h1>{albumData.name}</h1>
						<img src={albumData.images && albumData.images[1]['url']} alt='' />

						<p>Artist: {albumData.artists && albumData.artists[0].name} </p>
						<p>
							<em>released date: {albumData.release_date}</em>
						</p>
						<p>label: {albumData.label && albumData.label}</p>
					</div>
					<div>
						<h4>Tracklist</h4>
						<ul className={styles.tracklist}>
							{albumData.tracks &&
								albumData.tracks.items.map(track => (
									<li key={track.id}>
										{track.track_number}
										{'. '}
										<a href={track.external_urls['spotify']} target='blank'>
											{track.name} -{' '}
											{Math.floor(track.duration_ms / 1000 / 60)}m{' '}
											{Math.floor((track.duration_ms / 1000) % 60)}s
										</a>
									</li>
								))}
						</ul>
					</div>
				</div>
			)}
		</div>
	);
};

export default AlbumHeader;
