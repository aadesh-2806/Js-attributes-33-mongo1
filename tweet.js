const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/relationdemo', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("Connection open")
    })
    .catch(err =>{
        console.log('Oh no Err');
    })

const userSchema = new mongoose.Schema({
    username: String,
    age: Number
})

const tweetSchema = new mongoose.Schema({
    text: String,
    likes: Number,
    user: {type: Schema.Types.ObjectId, ref: 'User'}
})

const User = mongoose.model('User' , userSchema);
const Tweet = mongoose.model('Tweet' , tweetSchema);

// const makeTweets = async () =>{
//     const u= new User({username: 'sajdb', age: 23})
//     const tweet1= new Tweet({text: 'sdsfbhbfdhbaaajdb', likes: 0})
//     tweet1.user = user;     //gives object id to it
//     user.save();
//     tweet1.save()
// }
// makeTweets();

const findTweet = async () =>{
    const t = await Tweet.findOne({}).populate('user' , 'username');//populate with id and username
    console.log(t);
}
findTweet();