import db from "../models/index.js";
import { QueryTypes } from "sequelize";
const Order = db.Order;
import io from "../server.js";
const sequelize = db.sequelize;
const addOrder = async (req, res) => {

    if (req.body == null) {
        res.send('please enter fields')
    }
    const info = {
        fiatPrice: req.body.fiatPrice,
        amount: req.body.amount,
        orderType: req.body.orderType,
        status: req.body.status,
        marketId: req.body.marketId,

    }
    let price = info.fiatPrice
    var price2 = await sequelize.query(`SELECT * FROM "Orders" WHERE "fiatPrice" =${price} `, { type: QueryTypes.SELECT });
    res.send(price2)

    // Order.create(info).then(data=>{
    //     res.status(200).send(data)

    //     Order.findAll().then(data1=>{
    //         io.emit('order2',data1)
    //     })
    // }).catch(err=>{
    //     res.send(err)
    // })

}










export default { addOrder }