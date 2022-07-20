const Category = (sequelize, DataTypes) => {
    const Category = sequelize.define("Category", {
      id: {
            type: DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
            field: 'categoryId'
        },
        name: DataTypes.STRING,
    },
    {
        timestamps: false
    });

    return Category;
  };
  
  module.exports = Category;