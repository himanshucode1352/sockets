import express from 'express';
import { Server } from 'socket.io'
import router from './routes/userRoutes.js';
import orderRouter from './routes/orderRoutes.js'
import marketRouter from './routes/m-orderRoutes.js'
import db from './models/index.js';
const User = db.User;


const app = express();
const server = app.listen(8000, () => {
  console.log(`app is running on port localhost:8000 `)
});

const io = new Server(server);

//middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }))


//routes
app.use('/api/user', router)
app.use('/api/order', orderRouter)
app.use('/api/market', marketRouter)



//socket

io.on('connection', async function (socket) {

  console.log('a client connected');

})





app.get('/', (req, res) => {

  res.sendFile('/home/oem/Documents/socket/index.html')
 
})

export default io