import db from "../models/index.js";
import * as dotenv from 'dotenv'
dotenv.config()
import io from "../server.js";
import { QueryTypes } from "sequelize";
const sequelize = db.sequelize;
const m_order = db.m_orders;


const abc = (req, res) => {
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


const addOrder = (req, res) => {
    console.log(req.param.type)


    if (!req.body) {
        res.send('please provide data')
    }

    if (req.body.orderType == 4) {
        let info = {
            fiatPrice: req.body.fiatPrice,
            cryptoSpend: req.body.cryptoSpend,
            orderType: req.body.orderType
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
            cryptoSpend: info.cryptoSpend,
            orderType: info.orderType
        }

        m_order.create(sellData).then(data => {
            res.status(200).send(data)
        }).catch(err => {
            res.send(err)
        })

    }

    if (req.body.orderType == 3) {
        let info = {
            fiatPrice: req.body.fiatPrice,
            fiatSpend: req.body.fiatSpend,
            orderType: req.body.orderType
        }

        var fiatAmount = 1 - process.env.fee / 100 * info.fiatSpend;
        var fiatExePrice = 1 - process.env.spread / 100 * info.fiatPrice;
        var fiatFee = info.fiatSpend - fiatAmount;
        var fiatSpread = info.fiatPrice - fiatExePrice;
        var customerCryptoTotal = fiatAmount / info.fiatPrice;
        var appCryptoTotal = fiatAmount / fiatExePrice;
        var appCryptoPayout = appCryptoTotal - customerCryptoTotal;

        let buyData = {
            fiatAmount: fiatAmount,
            fiatExePrice: fiatExePrice,
            fiatFee: fiatFee,
            fiatSpread: fiatSpread,
            customerCryptoTotal: customerCryptoTotal,
            appCryptoTotal: appCryptoTotal,
            appCryptoPayout: appCryptoPayout,
            fiatPrice: info.fiatPrice,
            fiatSpend: info.fiatSpend,
            orderType: info.orderType
        }
        m_order.create(buyData).then(data => {
            res.status(200).send(data)
        }).catch(err => {
            res.send(err)
        })



    }
    m_order.findAll().then(data => {
        io.emit('data3', data)
    }).catch(err => {
        io.emit('err', err)
    })

}



const getOrder = async (req, res) => {


    // var price2 = await sequelize.query(`SELECT * FROM "m_orders" WHERE "status" =${process.env.completeOrderStatus} `, { type: QueryTypes.SELECT });
    // var date =  sequelize.query(`SELECT "updatedAt" FROM "m_orders" WHERE "status" =${process.env.completeOrderStatus} `, { type: QueryTypes.SELECT }).then(data=>{
    //     res.send(data);

    var date = sequelize.query(`SELECT  MAX("fiatPrice")as max_fiat,MIN("fiatPrice")as min_fiat,(ARRAY(select ROW(max("fiatPrice") ,min("fiatPrice")) from m_orders WHERE "status" = 5 and "updatedAt" between  (now() - '1 weeks'::interval) and now() GROUP BY "updatedAt" order by "updatedAt" desc LIMIT 1)) as open_close_order FROM "m_orders" WHERE "status" = 5 and "updatedAt" between  (now() - '1 weeks'::interval) and now() `, { type: QueryTypes.SELECT }).then(data => {
        res.send(data);
    }).catch(err => {
        res.send(err)
    })




    //select count(1)
    // from events
    // where time between (now() - '1 week'::interval) and (now() - '2 weeks'::interval);







    // console.log(date)
    // res.send(date);



}



const getChartData = (req, res) => {
 console.log(req.body);

    let x = req.body.type;
    switch (x) {


        case '1':

     
            sequelize.query(`SELECT  MAX("fiatPrice")as max_fiat,MIN("fiatPrice")as min_fiat,(select max("fiatPrice")  from m_orders WHERE "status" = ${process.env.completeOrderStatus}  and "updatedAt" between  (now() - '1 weeks'::interval) and now() GROUP BY "updatedAt" order by "updatedAt" desc LIMIT 1) as open_order,(select min("fiatPrice")  from m_orders WHERE "status" = ${process.env.completeOrderStatus} and "updatedAt" between  (now() - '1 weeks'::interval) and now() GROUP BY "updatedAt" order by "updatedAt" desc LIMIT 1) as close_order FROM "m_orders" WHERE "status" = ${process.env.completeOrderStatus}  and "updatedAt" between  (now() - '1 weeks'::interval) and now() `, { type: QueryTypes.SELECT }).then(data => {
                res.send(data);
            }).catch(err => {
                res.send(err)
            })



            break;
        case '2':
           
            sequelize.query(`SELECT  MAX("fiatPrice")as max_fiat,MIN("fiatPrice")as min_fiat,(select max("fiatPrice")  from m_orders WHERE "status" = ${process.env.completeOrderStatus}  and "updatedAt" between  (now() - '1 months'::interval) and now() GROUP BY "updatedAt" order by "updatedAt" desc LIMIT 1) as open_order,(select min("fiatPrice")  from m_orders WHERE "status" = ${process.env.completeOrderStatus} and "updatedAt" between  (now() - '1 months'::interval) and now() GROUP BY "updatedAt" order by "updatedAt" desc LIMIT 1) as close_order FROM "m_orders" WHERE "status" = ${process.env.completeOrderStatus}  and "updatedAt" between  (now() - '1 months'::interval) and now() `, { type: QueryTypes.SELECT }).then(data => {
                res.send(data);
            }).catch(err => {
                res.send(err)
            })
            break;


            case '3':
           
                sequelize.query(`SELECT  MAX("fiatPrice")as max_fiat,MIN("fiatPrice")as min_fiat,
                (select MAX("fiatPrice")as open_order from "m_orders" WHERE "status" = 5 and (extract(epoch from (now() -"updatedAt")) / 60)<=15  GROUP BY "updatedAt" order by "updatedAt" desc LIMIT 1 )
                ,(select MIN("fiatPrice")as close_order from "m_orders" WHERE "status" = 5 and (extract(epoch from (now() -"updatedAt")) / 60)<=15  GROUP BY "updatedAt" order by "updatedAt" desc LIMIT 1 )
                FROM "m_orders" WHERE "status" = 5 and (extract(epoch from (now() -"updatedAt")) / 60)<=15 `, { type: QueryTypes.SELECT }).then(data => {
                    res.send(data);
                }).catch(err => {
                    res.send(err)
                })
                break;


        default:
            sequelize.query(`SELECT  MAX("fiatPrice")as max_fiat,MIN("fiatPrice")as min_fiat,(select max("fiatPrice")  from m_orders WHERE "status" = ${process.env.completeOrderStatus}  and "updatedAt" between  (now() - '1 months'::interval) and now() GROUP BY "updatedAt" order by "updatedAt" desc LIMIT 1) as open_order,(select min("fiatPrice")  from m_orders WHERE "status" = ${process.env.completeOrderStatus} and "updatedAt" between  (now() - '1 months'::interval) and now() GROUP BY "updatedAt" order by "updatedAt" desc LIMIT 1) as close_order FROM "m_orders" WHERE "status" = ${process.env.completeOrderStatus}  and "updatedAt" between  (now() - '1 months'::interval) and now() `, { type: QueryTypes.SELECT }).then(data => {
                res.send(data);
            }).catch(err => {
                res.send(err)
            })
            
    }




}















export default { addOrder, getOrder ,getChartData}