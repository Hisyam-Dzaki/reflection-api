'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reflections', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      success: {
        type: Sequelize.STRING
      },
      low_point: {
        type: Sequelize.STRING
      },
      take_away: {
        type: Sequelize.STRING
      },
      owner_id: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then(() => {
      queryInterface.addConstraint("Reflections", {
        fields: ["owner_id"],
        type: "foreign key",
        name: "user_fk",
        references: {
          table: "Users",
          field: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      })
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Reflections');
  }
};