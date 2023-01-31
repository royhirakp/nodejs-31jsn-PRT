const express = require('express')
const{json } = require('express')
const mongoose = require('mongoose')
const app = express()
// express.json();
app.use(json())

const port = 3005
require('dotenv').config()
var path = require('path');
//EJS
app.engine('.ejs', require('ejs').__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// app.use(express.static(path.join(__dirname, 'public')));
// DATABASE 
// console.log(process.env.MongodbUrl)
mongoose.connect('mongodb://127.0.0.1:27017/test')
  .then(() => console.log('Connected!'));

//mODELS
let InventorModel = require('./src/models/inventorModel')
const CoustmerModel = require('./src/models/Coustomer')
const OrderoModel = require('./src/models/OrderTable')


app.get('/', async (req, res) => {
    const inventor = await InventorModel.find()
    const Coustomer = await CoustmerModel.find();
    const Order = await OrderoModel.find()
    console.log(Order)
    res.render('display',{inventor, Coustomer, Order})
  })

//POST ROUTSE
app.post('/createOrders',async (req,res)=>{
    try {
        let ITEM_NAME = req.body.item_name

        let item = await InventorModel.find({item_name:ITEM_NAME})
        console.log(item)
        if(item.available_quantity > req.body.Quantity){
            
            let data = await OrderoModel.create({
                coustomer_Id: req.body.coustomer_Id,
                inventory_id: req.body.inventory_id,
                item_name: req.body.item_name,
                Quantity: req.body.Quantity
            })
            res.json({
                data,
                status:"sucess"
            })
        }else{
            res.json({
                status:'item out of stock'
            })
        }
        
    } catch (error) {
        res.json({
            status:"failed",
            err: error
        })
    }
})
//******************************* */
app.post('/createInventory',async (req,res)=>{
    try {
        // console.log(req.body)
        let data = await InventorModel.create({
            inventory_type: req.body.inventory_type,
       item_name: req.body.item_name,
        available_quantity: req.body.available_quantity
        })
    
        res.json({
            data,
            status:"sucess"
        })
    } catch (error) {
        res.json({
            status:"failed",
            err: error
        })
    }
})
//************************** */
app.post('/createCustomer',async (req,res)=>{
    try {
        console.log(req.body)
        let data = await CoustmerModel.create({
            customer_Name: req.body.customer_Name,
            email: req.body.email,
        })
    
        res.json({
            data,
            status:"sucess"
        })
    } catch (error) {
        res.json({
            status:"failed",
            err: error
        })
    }
})

//getRoute 
app.get('/orders',async (req,res)=>{
    try {
        console.log('/orderrs route ')
        let data = await OrderoModel.find()




    console.log(data)
        res.json({
            data,
            status:"sucess"
        })
    } catch (error) {
        res.json({
            status:"failed",
            err: error
        })
    }
})
//************************************ */
app.get('/inventory',async (req,res)=>{
    try {
        // console.log(req.body)
        let data = await InventorModel.find({})
    
        res.json({
            data,
            status:"sucess"
        })
    } catch (error) {
        res.json({
            status:"failed",
            err: error
        })
    }
})

//****************************************************** */
app.get('/customerDetails',async (req,res)=>{
    try {
        // console.log(req.body)
        let data = await CoustmerModel.find({})    
        res.json({
            data,
            status:"sucess"
        })
    } catch (error) {
        res.status(503).json({
            status:"failed",
            err: error
        })
    }
})
//**************************** */
// app.get('/:s',async (req,res)=>{
//     try {
//         // console.log(req.body)
//         let data = await CoustmerModel.find({})    
//         res.json({
//             data,
//             status:"sucess"
//         })
//     } catch (error) {
//         res.status(503).json({
//             status:"failed",
//             err: error
//         })
//     }
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})