const express=require('express');
const {Server}=require('socket.io');
const ProductContainer=require('./container/productContainer.js');



const app= express();

const PORT=8080;
const server = app.listen(PORT,()=>console.log(`Listening on ${PORT}`))
const io= new Server(server);

app.use(express.static(__dirname+'/public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json());



//services
const productService = new ProductContainer();
io.on('connection',async socket=>{
    console.log("Cliente conectado");

     let products = await productService.get();
     io.emit('productLog',products)

    socket.on('sendProduct',async data=>{
        await productService.add(data);
        let products = await productService.get();
        io.emit('productLog',products)
    })
})