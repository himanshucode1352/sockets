'use strict';
 export default (sequelize, DataTypes) => {

  var Order = sequelize.define('Orders', {
    fiatPrice: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    orderType: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    marketId: DataTypes.INTEGER
})
      return Order;
  }












