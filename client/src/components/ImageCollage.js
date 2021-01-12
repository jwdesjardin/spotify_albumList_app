import React, { Fragment } from 'react';
import styles from './ImageCollage.module.css';

const ImageCollage = ({ playlist }) => {
	return (
		<div className={styles.collageContainer}>
			{playlist &&
			playlist.Albums && (
				<Fragment>
					<div className={styles.imgDiv}>
						<img src={playlist.Albums[0] ? playlist.Albums[0].img_url_3 : ``} alt='' />
					</div>
					<div className={styles.imgDiv}>
						<img src={playlist.Albums[1] ? playlist.Albums[1].img_url_3 : ``} alt='' />
					</div>
					<div className={styles.imgDiv}>
						<img src={playlist.Albums[2] ? playlist.Albums[2].img_url_3 : ``} alt='' />
					</div>
					<div className={styles.imgDiv}>
						<img src={playlist.Albums[3] ? playlist.Albums[3].img_url_3 : ``} alt='' />
					</div>
				</Fragment>
			)}
		</div>
	);
};

export default ImageCollage;
