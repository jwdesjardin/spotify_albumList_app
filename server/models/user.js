const Sequelize = require('sequelize');

module.exports = sequelize => {
	class User extends Sequelize.Model {}
	User.init(
		{
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			username: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true
			},
			password: {
				type: Sequelize.STRING,
				allowNull: false
			}
		},
		{ sequelize }
	);

	User.associate = models => {
		User.hasMany(models.Playlist);
	};

	return User;
};
