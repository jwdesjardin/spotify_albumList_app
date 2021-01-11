import React, { Fragment } from 'react';

import { Link } from 'react-router-dom';

const AlbumListGrid = ({ playlists }) => {
	return (
		<div className='albumListGrid'>
			{playlists &&
				playlists.map(playlist => (
					<Link key={playlist.id} to={`/playlists/${playlist.id}`}>
						<div className='grid-item card'>
							<h3 className='card-title'>{playlist.title}</h3>
							<h4 className='card-desc'>
								by: {playlist.User && `${playlist.User.username}`}
							</h4>
						</div>
					</Link>
				))}

			<Link className='' to='/albumList/create'>
				<div className='grid-item card'>
					<h3 className='card-title'>
						<svg
							version='1.1'
							xmlns='http://www.w3.org/2000/svg'
							x='0px'
							y='0px'
							viewBox='0 0 13 13'
							className='add'
						>
							<polygon points='7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 ' />
						</svg>New AlbumList
					</h3>
				</div>
			</Link>
		</div>
	);
};

export default AlbumListGrid;
