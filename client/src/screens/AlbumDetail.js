import axios from 'axios';
import React, { useState, useEffect, Fragment } from 'react';
import ActionBar from '../utils/ActionBar';

const AlbumDetail = ({ match, history }) => {
	const { id } = match.params;

	const [ album, setAlbum ] = useState({});
	const [ playlistDetailsList, setPlaylistDetailsList ] = useState([]);

	useEffect(() => {
		const asyncFunc = async () => {
			try {
				const { data } = await axios.get(`http://localhost:5000/api/albums/${id}`);
				setAlbum(data);
			} catch (error) {
				console.log('error getting album');
			}
		};
		asyncFunc();
	}, []);

	const goBack = () => {
		history.goBack();
  };
  
  const togglePlaylistDetails = ({ target }) => {
    setPlaylistDetailsList(prevList => {
			if (prevList.includes(target.value)) {
				return prevList.filter(tag => target.value !== tag);
			} else {
				return [ ...prevList, target.value ];
			}
		})
  }

  


	console.log(album, playlistDetailsList);

	return (
		<div>
			{album &&
			album.Playlists && (
				<Fragment>
					{/* go back button */}
					<div>
						<button onClick={goBack}>go back</button>
					</div>

					{/* album details header */}
					<div>
						<h1>Album Details</h1>
						<div>
							<img src={album.img_url} alt='' />
							<h2>Title: {album.title}</h2>
							<p>
								Artist: {album.artist} <em>- {album.year}</em>
							</p>
						</div>
					</div>

					{/* other albums with hidden details */}
					<div>
						<h2>Other playlists that this shows up in </h2>

						{album.Playlists.map((playlist, index) => (
							<Fragment key={index + 1}>
								{/* main playlist info */}
								<div
									
									style={{ border: '2px solid black', padding: '1rem' }}
								>
									<h2>
										{index + 1}. {playlist.title}
									</h2>
									<p>created by: {playlist.User.username}</p>
									<p>last changed: {playlist.updatedAt.substring(0, 10)}</p>
									{}
                  <button onClick={togglePlaylistDetails} value={playlist.id} >Show albums</button>
								</div>

								{/* details */}
								 
								<div style={playlistDetailsList.includes(String(playlist.id)) ? {display: 'block'} : {display: 'none'}}>
									<h3>playlist albums</h3>
									{playlist.Albums.length > 0 &&
										playlist.Albums.map(album => (
											<div
												style={{
													border: '2px solid black',
													padding: '1rem'
												}}
												key={album.id}
											>
												<img src={album.img_url} alt='' />
												<p>Title: {album.title}</p>
												<p>Artist: {album.artist}</p>
												<p>Year: {album.year}</p>
											</div>
										))}
								</div>
								
							</Fragment>
						))}
					</div>
				</Fragment>
			)}
		</div>
	);
};

export default AlbumDetail;
