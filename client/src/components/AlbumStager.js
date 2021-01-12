import React, { Fragment, useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/auth';
import StagedAlbums from './StagedAlbums';
import AlbumSearchResults from './AlbumSearchResults';
import styles from './AlbumStager.module.css';

const AlbumStager = ({
	removeAlbumFromStage,
	stagedAlbums,
	addAlbumToStage,
	albumSearchResults
}) => {
	return (
		<div className={styles.albumStagerContainer}>
			{/* album results */}

			<AlbumSearchResults
				albumSearchResults={albumSearchResults}
				addAlbumToStage={addAlbumToStage}
			/>

			<StagedAlbums removeAlbumFromStage={removeAlbumFromStage} stagedAlbums={stagedAlbums} />
		</div>
	);
};

export default AlbumStager;
