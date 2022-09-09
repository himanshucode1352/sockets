'use strict';
export default(sequelize, DataTypes) => {
  const Markets = sequelize.define('m_orders', {
    marketId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    orderType: DataTypes.INTEGER,
    fiatFee: DataTypes.DECIMAL(40,10),
    fiatPrice: DataTypes.DECIMAL(40,10),
    fiatExePrice: DataTypes.DECIMAL(40,10),
    fiatSpend: DataTypes.DECIMAL(40,10),
    fiatAmount: DataTypes.DECIMAL(40,10),
    fiatSpread: DataTypes.DECIMAL(40,10),
    cryptoSpread: DataTypes.DECIMAL(40,10),
    appCryptoTotal: DataTypes.DECIMAL(40,10),
    customerCryptoTotal: DataTypes.DECIMAL(40,10),
    appCryptoPayout: DataTypes.DECIMAL(40,10),
    cryptoFee: DataTypes.DECIMAL(40,10),
    cryptoSpend: DataTypes.DECIMAL(40,10),
    cryptoAmount: DataTypes.DECIMAL(40,10),
    appFiatTotal: DataTypes.DECIMAL(40,10),
    customerFiatTotal: DataTypes.DECIMAL(40,10),
    appFiatPayout: DataTypes.DECIMAL(40,10),
    orgCrypto: DataTypes.DECIMAL(40,10),
    orgFiat: DataTypes.DECIMAL(40,10),
    exeCrypto: DataTypes.DECIMAL(40,10),
    exeFiat: DataTypes.DECIMAL(40,10),
    remCrypto: DataTypes.DECIMAL(40,10),
    remFiat: DataTypes.DECIMAL(40,10),
    status: DataTypes.INTEGER
  }, {});  return Markets;
};