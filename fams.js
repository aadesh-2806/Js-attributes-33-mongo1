const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/relationdemo', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("Connection open")
    })
    .catch(err =>{
        console.log('Oh no Err');
    })

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    season:{
        type:String,
        enum: [
            'Spring' , "Summer" , "Fall" , "Winter"
        ]
    }
})

const farmSchema = new mongoose.Schema({
    name: String,
    city: String,
    products: [{type: Schema.Types.ObjectId, ref: 'Product'}]       //helps in collapsing whole class into a objectId
})

const Product = mongoose.model('Product' , productSchema );
const Farm = mongoose.model('Farm' , farmSchema );

// Product.insertMany([
//     {name: 'jxnfjns' , price: 4.99 , season: 'Spring'},
//     {name: 'zxcxzcnfjns' , price: 3.99 , season: 'Summer'},
//     {name: 'wqrerfjns' , price: 2.99 , season: 'Winter'}
// ])
const makeFarm = async () =>{
    const farm = new Farm({name: 'Full Belly' , city: 'Guinda'});
    const melon = new Product.findOne({name: 'dkmdfm'});
    farm.products.push(melon);
    farm.save();
    console.log(farm);
}
makeFarm();

const addProduct = async ()=>{
    const farm = await Farm.findOne({name: 'Full Farm'});
    const watermelon = await Farm.findOne({name: 'Sugar Fsarm'});
    farm.products.push(watermelon);
    farm.save();
    console.log(farm);
}
Farm.findOne({name: 'Full Farm'})
    .populate('products')       //helps in again expanding or populating id into a class
    .then(farm => console.log(farm))