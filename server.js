const express = require('express')
const mongoose = require('mongoose')
//connection with the models
const Product = require('./models/productModel')
const app = express()

//using json as text method in postmand
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//routes
app.get('/', (req, res) =>{
    res.send('Hello NODE API')
})

app.get('/blog', (req, res) =>{
    res.send('Hello Blog, my name is trisna')
})
//GET ALL PRODUCTS
app.get('/products', async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//GET PRODUCT BY ID
app.get('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//POST DATA TO DATABASE

app.post('/products', async(req,res) => {
   try {
        const product = await Product.create(req.body)
        res.status(200).json(product)

   } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
   }
})

//UPDATEA PRODUCT
app.put('/products/:id', async(req,res) => {
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        //we cannot find any product in database
        if(!product){
            return res.status(404),json({message: `cannot find any product with ID ${id}`})
        }
        const updateProduct = await Product.findById(id);
        res.status(200).json(updateProduct);
    }catch (error) {
        res.status(500).json({message: error.message})
    }
})

//DELETE PRODUCT
app.delete('/products/:id', async(req,res) => {
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        //we cannot find any product in database
        if(!product){
            return res.status(404),json({message: `cannot find any product with ID ${id}`})
        }
        res.status(200).json(product);
    }catch (error) {
        res.status(500).json({message: error.message})
    }
})

//CoNNECTION TO MONGODB
mongoose.connect('mongodb+srv://admin:QaZ123WsX@devtaminapi.lgcrekj.mongodb.net/Node-API?retryWrites=true&w=majority')
.then(() => {
    console.log('connected to MongoDB')
    app.listen(3000, ()=> {
        console.log('node API app is runnin on port 3000')
    })
}).catch((error) => {
    console.log(error)
})