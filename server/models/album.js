const Sequelize = require('sequelize');

module.exports = sequelize => {
	class Album extends Sequelize.Model {}
	Album.init(
		{
			id: {
				type: Sequelize.STRING,
				primaryKey: true
			},
			title: {
				type: Sequelize.STRING,
				allowNull: false
			},
			img_url: {
				type: Sequelize.STRING
			},
			artist: {
				type: Sequelize.STRING
			},
			year: {
				type: Sequelize.STRING
			}
		},
		{ sequelize }
	);

	Album.associate = models => {
		Album.belongsToMany(models.Playlist, {
			through: 'PlaylistAlbums'
		});
	};

	return Album;
};
