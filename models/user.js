'use strict'
export default (sequelize, DataTypes) =>{

  var User = sequelize.define('Users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING,
       
    },
    lastName: {
        type: DataTypes.STRING,          
    },
    email: DataTypes.STRING,
   
})
      return User;
  }