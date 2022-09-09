import db from "../models/index.js";
import * as dotenv from 'dotenv'
dotenv.config()
import io from "../server.js";

const m_order = db.m_orders;


const addOrder = (req, res) => {
    if (!req.body) {
        res.send('please provide data')
    }
    let info = {
        marketId: req.body.marketId,
        userId: req.body.userId,
        orderType: req.body.orderType,
        fiatFee: req.body.fiatFee,
        fiatPrice: req.body.fiatPrice,
        fiatExePrice: req.body.fiatExePrice,
        fiatSpend: req.body.fiatSpend,
        usfiatAmounterId: req.body.fiatAmount,
        fiatSpread: req.body.fiatSpread,
        cryptoSpread: req.body.cryptoSpread,
        appCryptoTotal: req.body.appCryptoTotal,
        customerCryptoTotal: req.body.customerCryptoTotal,
        appCryptoPayout: req.body.appCryptoPayout,
        cryptoFee: req.body.cryptoFee,
        cryptoSpend: req.body.cryptoSpend,
        cryptoAmount: req.body.cryptoAmount,
        appFiatTotal: req.body.appFiatTotal,
        customerFiatTotal: req.body.customerFiatTotal,
        appFiatPayout: req.body.appFiatPayout,
        orgCrypto: req.body.orgCrypto,
        orgFiat: req.body.orgFiat,
        exeCrypto: req.body.exeCrypto,
        exeFiat: req.body.exeFiat,
        remCrypto: req.body.remCrypto,
        remFiat: req.body.remFiat,
        status: req.body.status,

    }
    m_order.create(info).then(data => {
        res.status(200).send(data)
    }).catch(err => {
        res.send(err)
    })

}


const sellOrder = (req, res) => {

    if (!req.body) {
        res.send('please provide data')
    }
    let info = {
        fiatPrice: req.body.fiatPrice,
        cryptoSpend: req.body.cryptoSpend,

    }

    var cryptoAmount = 1 - process.env.fee / 100 * info.cryptoSpend
    console.log('cryptoAmount', cryptoAmount)

    var fiatExePrice = 1 + process.env.spread / 100 * info.fiatPrice;

    var cryptoFee = info.cryptoSpend - cryptoAmount;

    var fiatSpread = fiatExePrice - info.fiatPrice;

    var customerFiatTotal = cryptoAmount * info.fiatPrice;

    var appFiatTotal = cryptoAmount * info.fiatPrice;

    var appFiatPayout = cryptoAmount * fiatExePrice;

    let sellData = {
        fiatExePrice: fiatExePrice,
        cryptoFee: cryptoFee,
        fiatSpread: fiatSpread,
        customerFiatTotal: customerFiatTotal,
        appFiatTotal: appFiatTotal,
        appFiatPayout: appFiatPayout,
        fiatPrice: info.fiatPrice,
        cryptoSpend: info.cryptoSpend
    }

    m_order.create(sellData).then(data => {
        res.status(200).send(data)
    }).catch(err => {
        res.send(err)
    })
  m_order.findAll().then(data=>{
    io.emit('data3',data)
  }).catch(err=>{
    io.emit('err',err)
  })
    // res.status(200).send(cryptoAmount).then(data => console.log('succes')).catch(err => {
    //     res.send(err)
    // })





}








export default { addOrder, sellOrder }