const Sequelize = require('sequelize');

module.exports = sequelize => {
	class Playlist extends Sequelize.Model {}
	Playlist.init(
		{
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			title: {
				type: Sequelize.STRING,
				allowNull: false
			}
		},
		{ sequelize }
	);

	Playlist.associate = models => {
		Playlist.belongsToMany(models.Album, {
			through: 'PlaylistAlbums'
		});
		Playlist.belongsTo(models.User);
	};

	return Playlist;
};
