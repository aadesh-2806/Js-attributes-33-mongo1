const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/relationdemo', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("Connection open")
    })
    .catch(err =>{
        console.log('Oh no Err');
    })

const userSchema = new mongoose.userSchema({
    first: String,
    last: String,
    address: [
        {
            street: String,
            city: String,
            state: String,
            country: {
                type: String,
                required: true
            }
        }
    ]
})
const User = mongoose.model('User' , userSchema);

const makeUser = async() =>{
    const u = new User({
        first: 'alvert',
        last: 'salito'
    })
    u.address.push({
        street: 'sdvub',
        city: 'jaipur',
        state: 'Rajasthan',
        country: 'India'
    })
    const res = await u.save();
    console.log(res);
}
const addAddress = async(id) =>{
    const user = await User.findById(id);
    user.address.push({
        street: 'sanganer',
        city: 'jaipur',
        state: 'Rajasthan',
        country: 'India'
    })
    const res = await u.save();
    console.log(res);
}
makeUser();
addAddress('hbsbd jbd')