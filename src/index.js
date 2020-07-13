let express = require('express');
let cors = require('cors');
let app = express();

app.use(cors());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());




// ************************MONGO DB CONNECTION *********************************
const connectDB = require('./DB/Conncection');

connectDB();
app.use(express.json({ extended: false }));
app.use('/api/userModel', require('./Api/User'));
// const Port = process.env.Port || 3000;

// app.listen(Port, () => console.log('Server started'));
// *************************************************************************








// ********************MIDDLEWARE EXAMPLE 1 : Just a console.log
//This catches out all the requests and adds a middleware
//Middleware could be any thing
//Here middleware is just a console.log
app.use((req, res, next) => {
    console.log(`${new Date().toString()} => ${req.originalUrl}}`)
    //This will enable us to inject function that do things to any routes in the system,
    next();  //This is to not break the request-response cycle // Or else it would end at console.log only !!
})
// **************************************







// ***************************  MIDDLEWARE EXAMPLE 2 : This is to hanlde 404/500 errors
// Handler for 404 - Resource Not Found
app.use((req, res, next) => {
    res.status(404).send('We think you are lost!')
})

// Handler for Error 500
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.sendFile(path.join(__dirname, '../public/500.html'))
})

//   ***********************************************************





//*************************************ENDPOINT EXAMPLE 1 */
let personRoute = require('./routes/person');
app.use(personRoute);
// ************************************************************************














// *******************   TWITTER API ****************************
const T = {
    consumer_key: 'HlEmMglQgaUlXdsi0f3n7Bmsy',
    consumer_secret: 'QfNbOMIkraaS700ogUbjqrPYbLQ2PcHntAB4KwlhD4p4JXkUXN',
    access_token: '1239493661286531072-Ya7jfJMeRqsQwzbNeg3AXt9FGoUuV6',
    access_token_secret: '1aFNEnSba7sdxrT5b6D3uQ6K7R6IsCNu4MQC9F9c5SdU8 ',
};



const searchUrl = "https://api.twitter.com/1.1/search/tweets.json";



app.get("/tweets", async (req, res) => {
    await axios({
        method: "get",
        url: searchUrl,
        params: { q: "narendramodi" },
        headers: {
            accept: "application/json",
            Authorization:
                'OAuth oauth_consumer_key="' +
                T.consumer_key +
                '",oauth_token="' +
                T.access_token +
                '",oauth_consumer_secret="' +
                T.consumer_secret +
                '",oauth_token_secret="' +
                T.access_token_secret +
                '"'
        }
    })
        .then(response => {
            console.log(headerString);
            console.log(response);
            res.status(200).send(response);
        })
        .catch(err => {
            console.log(`failed`);
            console.log(headerString);
            res.status(404).send(err);
        });
});
// *******************   $$$$$$$$$$$$$$$$$$$$$$$$$$$$$   ****************************







// *****************************************************************************
// static file handler
// also pass in the folder name
//This helps to show whats there in /public/index.html on web-browser : localhost:3000
app.use(express.static('public'))
// *****************************************************************************






const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.info(`Server has started on ${PORT}`));


























// require('dotenv').load();

// var Twitter = require('twitter');

// var client = new Twitter({
//   consumer_key: process.env.TWITTER_CONSUMER_KEY,
//   consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
//   bearer_token: process.env.TWITTER_BEARER_TOKEN
// });

// client.get('search/tweets', {q: '#ios #swift'}, function(error, tweets, response) {
//    tweets.forEach(function(tweet) {
//    	console.log("tweet: " + tweet.text)
//    });
// });
