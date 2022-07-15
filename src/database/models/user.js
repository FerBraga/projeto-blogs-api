const User = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
      id: {
            type: DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
      displayName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
        timestamps: false,
        tableName: 'Users',
        underscored: true,
    });

    User.associate = (models) => {
        User.hasOne(models.BlogPosts,
          { foreignKey: 'userId', as: 'userid' });
      };
  
    return User;
  };
  
  module.exports = User;