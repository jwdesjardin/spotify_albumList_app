var express = require('express');
var router = express.Router();
const User = require('../models').User;
const Album = require('../models').Album;
const Playlist = require('../models').Playlist;
const userValidator = require('./middleware/userValidation');
const courseValidator = require('./middleware/courseValidation');
const authorization = require('./middleware/authorization');
const bcrypt = require('bcryptjs');

/* Handler function to wrap each route. */
function asyncHandler(cb) {
	return async (req, res, next) => {
		try {
			await cb(req, res, next);
		} catch (error) {
			// Forward error to the global error handler
			next(error);
		}
	};
}

router.get('/', (req, res) => {
	res.json({
		message: 'Welcome to the REST API home page'
	});
});

/* GET  */
router.get(
	'/users',
	authorization,
	asyncHandler(async (req, res) => {
		// Returns the currently authenticated user
		const user = await User.findOne({
			attributes: { exclude: [ 'password', 'createdAt', 'updatedAt' ] },
			where: { username: req.currentUser.username }
		});
		res.status(200).json(user);
	})
);

/* POST  */
router.post(
	'/users',
	asyncHandler(async (req, res) => {
		//Creates a user, sets the Location header to "/", and returns no content
		let password = req.body.password;
		req.body.password = bcrypt.hashSync(password, 10);

		// checks if there is already a user with this email
		try {
			await User.create(req.body);
			res.location('/');
			res.status(201).json();
		} catch (error) {
			if (error.name === 'SequelizeUniqueConstraintError') {
				const err = new Error('That Username is already in use');
				err.status = 400;
				throw err;
			}
		}
	})
);

/* get  */
router.get(
	'/albums',
	asyncHandler(async (req, res) => {
		//Returns a list of albums (including the user that owns each course)
		const albums = await Album.findAll({
			attributes: { exclude: [ 'createdAt', 'updatedAt' ] }
		});
		res.status(200).json(albums);
	})
);

/* GET  */
router.get(
	'/albums/:id',
	asyncHandler(async (req, res) => {
		//Returns the album (including the user that owns the album) for the provided album ID
		const album = await Album.findByPk(req.params.id, {
			attributes: {
				exclude: [ 'createdAt', 'updatedAt' ]
			},
			include: [
				{
					model: Playlist,
					include: [
						{
							model: User
						},
						{
							model: Album
						}
					]
				}
			]
		});
		if (album) {
			res.status(200).json(album);
		} else {
			const error = new Error('album could not be found');
			error.status = 404;
			throw error;
		}
	})
);

/* POST  */
router.post(
	'/albums',
	asyncHandler(async (req, res) => {
		//Creates a album, sets the Location header to the URI for the album, and returns no content

		const album = await Album.create(req.body);
		res.status(201).json();
	})
);

// PUT
router.put(
	'/albums/:id',
	asyncHandler(async (req, res) => {
		//Updates a album and returns no content

		let album = await Album.findByPk(req.params.id);
		if (album) {
			await album.update(req.body);
			res.status(204).json();
		} else {
			const error = new Error('Could not find the album to update');
			error.status = 404;
			throw error;
		}
	})
);

/* DELETE  */
router.delete(
	'/albums/:id',
	asyncHandler(async (req, res) => {
		//Deletes a album and returns no content
		const album = await Album.findByPk(req.params.id);
		if (album) {
			await album.destroy();
			res.status(204).json();
		} else {
			const error = new Error('The album could not be located and was not deleted');
			error.status = 404;
			throw error;
		}
	})
);

/* get  */
router.get(
	'/playlists',
	asyncHandler(async (req, res) => {
		//Returns a list of playlists (including the user that owns each playlust)
		const playlists = await Playlist.findAll({
			attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
			include: [
				{
					model: User
				}
			]
		});
		res.status(200).json(playlists);
	})
);

/* GET  */
router.get(
	'/playlists/:id',
	asyncHandler(async (req, res) => {
		//Returns the playlsit (including the user that owns the playlsit) for the provided playlsit ID
		const playlist = await Playlist.findByPk(req.params.id, {
			attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
			include: [
				{
					model: Album,
					attributes: { exclude: [ 'createdAt', 'updatedAt' ] }
				},
				{
					model: User
				}
			]
		});
		if (playlist) {
			res.status(200).json(playlist);
		} else {
			const error = new Error('Playlist could not be found');
			error.status = 404;
			throw error;
		}
	})
);

/* POST  */
router.post(
	'/playlists',
	authorization,
	asyncHandler(async (req, res) => {
		//Creates a playlist, sets the Location header to the URI for the playlist, and returns no content
		req.body.UserId = req.currentUser.id || null;
		const playlist = await Playlist.create(req.body);
		res.status(201).json(playlist);
	})
);

// PUT
router.put(
	'/playlists/:id',
	authorization,
	asyncHandler(async (req, res) => {
		//Updates a playlist and returns no content

		let playlist = await Playlist.findByPk(req.params.id);
		if (playlist) {
			if (req.currentUser.id === playlist.UserId) {
				await playlist.update(req.body);
				res.status(204).json();
			} else {
				const error = new Error('This playlist does not belong to the logged in user');
				error.status = 403;
				throw error;
			}
		} else {
			const error = new Error('Could not find the playlist to update');
			error.status = 404;
			throw error;
		}
	})
);

/* DELETE  */
router.delete(
	'/playlists/:id',
	authorization,
	asyncHandler(async (req, res) => {
		//Deletes a playlist and returns no content
		const playlist = await Playlist.findByPk(req.params.id);
		if (playlist) {
			if (req.currentUser.id === playlist.UserId) {
				await playlist.destroy();
				res.status(204).json();
			} else {
				const error = new Error('This playlist does not belong to the logged in user');
				error.status = 403;
				throw error;
			}
		} else {
			const error = new Error('The playlist could not be located and was not deleted');
			error.status = 404;
			throw error;
		}
	})
);

// add tag to quote
router.post(
	'/playlists/:id/:albumId',
	asyncHandler(async (req, res) => {
		const { id, albumId } = req.params;
		const playlist = await Playlist.findByPk(id);
		const album = await Album.findByPk(albumId);
		console.log('playlist and album', playlist, album);
		playlist.addAlbum(album);
		playlist.save();
		res.status(201).json(playlist);
	})
);

// remove a tag from quote
router.delete(
	'/playlists/:id/:albumId',
	asyncHandler(async (req, res) => {
		const { id, albumId } = req.params;
		const playlist = await Playlist.findByPk(id);
		const album = await Album.findByPk(albumId);
		if (playlist && album) {
			const check = await playlist.hasAlbum(album);
			if (check) {
				await playlist.removeAlbum(album);
			}
		}
		// 202 - accepted
		res.status(202).json();
	})
);

module.exports = router;
