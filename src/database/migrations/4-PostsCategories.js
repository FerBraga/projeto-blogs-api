'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PostCategories', {
      postId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
            // Informa a tabela da referência da associação
            model: 'BlogPosts',
            key: 'id',
      },
    },
      categoryId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
            // Informa a tabela da referência da associação
            model: 'Categories',
            // Informa a coluna da referência que é a chave correspondente
            key: 'id',
      },
    }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('PostCategories');
  }
};