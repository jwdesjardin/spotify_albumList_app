import React from 'react';
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
		</div>
	);
};

export default AlbumStager;
