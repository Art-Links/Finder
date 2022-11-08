'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references:{
          model:{
            tableName: "Categories"
          },
          key: "id"
        }
      },
      blurImage: {
        type: Sequelize.STRING
      },
      deleteAt: {
        type: Sequelize.DATE
      },
      latX: {
        type: Sequelize.STRING
      },
      lutY: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      street: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER,
        references:{
          model:{
            tableName: "Users"
          },
          key: "id"
        }
      },
      isReturned: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now")
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now")
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('items');
  }
};