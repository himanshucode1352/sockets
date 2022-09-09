import db from "../models/index.js";
 import io from '../server.js'


const User = db.User;

const addUser =  (req, res) => {

    if (!req.body) {
        res.send('plss enter fields')
    }
    //alert('hii')
    //const hash =  bcrypt.hashSync(req.body.password,10)
    const info = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
    };
        User.create(info).then(data => {

        res.status(200).send(data)
        
        var data1=User.findAll().then((data1)=>{
            
            io.emit('order', data1);

        })
   
    }).catch(err => {
        res.send(err)
    })





}


export default { addUser }




