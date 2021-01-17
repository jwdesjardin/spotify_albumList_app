'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Albums', {
			id: {
				type: Sequelize.STRING,
				primaryKey: true
			},
			title: {
				type: Sequelize.STRING,
				allowNull: false
			},
			img_url_1: {
				type: Sequelize.STRING
			},
			img_url_2: {
				type: Sequelize.STRING
			},
			img_url_3: {
				type: Sequelize.STRING
			},
			artist: {
				type: Sequelize.STRING
			},
			year: {
				type: Sequelize.STRING
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('Albums');
	}
};
