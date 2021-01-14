import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/auth';

import AlbumStager from '../components/AlbumStager/AlbumStager';
import { Tabs, Tab } from 'react-bootstrap';
import ActionBar from '../components/layout/ActionBar';
import ArtistSearch from '../components/ArtistSearch/ArtistSearch';
import styles from './CreatePlaylist.module.css';
import AlbumSearch from '../components/AlbumSearch/AlbumSearch';

const CreatePlaylist = props => {
	const { authUser, userPassword } = useContext(AuthContext);
	const [ albumTitle, setAlbumTitle ] = useState('');
	const [ trimmedTitle, setTrimmedTitle ] = useState('');
	const [ albumSearchResults, setAlbumSearchResults ] = useState([]);
	const [ stagedAlbums, setStagedAlbums ] = useState([]);
	const [ errors, setErrors ] = useState([]);

	useEffect(
		() => {
			setTrimmedTitle(trimTitle(albumTitle));
		},
		[ albumTitle ]
	);

	const addAlbumToStage = e => {
		e.preventDefault();
		const albumId = e.currentTarget.value;
		const album = albumSearchResults.filter(album => album.id === albumId);
		setStagedAlbums(prevState => setStagedAlbums([ ...prevState, ...album ]));

		const duplicate = stagedAlbums.filter(album => album.id === albumId);
		if (duplicate.length < 0) {
		}
	};

	const removeAlbumFromStage = e => {
		e.preventDefault();
		const albumId = e.currentTarget.value;
		const filteredAlbums = stagedAlbums.filter(album => album.id !== albumId);
		setStagedAlbums([ ...filteredAlbums ]);
	};

	const trimTitle = albumTitle => {
		let trimmed;

		if (albumTitle.length > 0) {
			trimmed = albumTitle
				.trim()
				.split(' ')
				.map(word => word[0].toUpperCase() + word.slice(1, word.length))
				.join(' ');
		} else {
			trimmed = '';
		}
		return trimmed;
	};

	return (
		<div>
			<div className={styles.pageContainer}>
				<div className={styles.formContainer}>
					<h4 className={styles.formLabel}>1. Add Title</h4>
					<div className={styles.headerGrid}>
						<div className={styles.searchInputContainer}>
							<div className='flexRow flexAlign'>
								<div>
									<h2 className={styles.title}>AlbumList Title</h2>
									{authUser && (
										<p className={styles.secondaryText}>
											By: {authUser.username}
										</p>
									)}
								</div>
								<div>
									<input
										id='title'
										name='title'
										type='text'
										placeholder='AlbumList title...'
										value={albumTitle}
										onChange={e => setAlbumTitle(e.target.value)}
									/>
								</div>
							</div>
						</div>
					</div>

					<h4 className={styles.formLabel}>2. Create a playlist</h4>

					<Tabs defaultActiveKey='albumSearch' id='albumSeachTabs' variant='pills'>
						<Tab eventKey='albumSearch' title='Album Search'>
							<AlbumSearch setAlbumSearchResults={setAlbumSearchResults} />
						</Tab>
						<Tab eventKey='artistSearch' title='Artist Search'>
							<ArtistSearch setAlbumSearchResults={setAlbumSearchResults} />
						</Tab>
					</Tabs>

					<AlbumStager
						albumSearchResults={albumSearchResults}
						setAlbumSearchResults={setAlbumSearchResults}
						addAlbumToStage={addAlbumToStage}
						removeAlbumFromStage={removeAlbumFromStage}
						stagedAlbums={stagedAlbums}
					/>

					<div style={{ marginBottom: '7rem' }} />
				</div>
			</div>

			{stagedAlbums && (
				<ActionBar
					stagedAlbums={stagedAlbums}
					removeAlbumFromStage={removeAlbumFromStage}
					createPlaylistAlbums={stagedAlbums.length > 0 ? true : false}
					playlist={{ UserId: null }}
					history={props.history}
					setErrors={setErrors}
					albumTitle={trimmedTitle}
				/>
			)}
		</div>
	);
};

export default CreatePlaylist;
