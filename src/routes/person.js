const axios = require('axios');
let express = require('express')
let router = express.Router();


const Twit = require('twit')
const notifier = require('node-notifier');
const open = require('open');
const franc = require('franc')

const apikey = 'xxx'
const apiSecretKey = 'xxx'
const accessToken = 'xxx'
const accessTokenSecret = 'xxx'

var T = new Twit({
    consumer_key: 'HlEmMglQgaUlXdsi0f3n7Bmsy',
    consumer_secret: 'QfNbOMIkraaS700ogUbjqrPYbLQ2PcHntAB4KwlhD4p4JXkUXN',
    access_token: '1239493661286531072-Ya7jfJMeRqsQwzbNeg3AXt9FGoUuV6',
    access_token_secret: '1aFNEnSba7sdxrT5b6D3uQ6K7R6IsCNu4MQC9F9c5SdU8 ',
});



// QueryString => query property on the request object
// localhost:3000/person?name=thomas&age=20

router.get('/person', (req, res) => {
    let tweets;
    // (async () => {
    //     T.get('search/tweets', { q: '#tesla since:2020-04-15', count: 100 }, function (err, data, response) {
    //         const tweets = data.statuses
    //             // .map(tweet => `LANG: ${franc(tweet.text)} : ${tweet.text}`) //CHECK LANGUAGE
    //             .map(tweet => tweet.text)
    //             .filter(tweet => tweet.toLowerCase().includes('elon'));
    //         console.log(tweets);
    //         tweets = tweets;
    //     })
    // })
    // const registerCustomer = async (accessToken, customerId, customerData) => {
    //     const url = `${gateway.protocol}://${gateway.host}/v3/customers/${customerId}`;
    //     const data = customerData;
    //     const options = {
    //       method: 'PUT',
    //       headers: {
    //         'content-type': 'application/json',
    //         'authorization': `Bearer ${accessToken}`,
    //       },
    //       timeout: gateway.timeout,
    //       responseType: 'json',
    //       responseEncoding: 'utf8',
    //       url,
    //       data,
    //     };
    //     const result = await axios(options);
    //     return result;
    //   };
    // if (req.query.name) {
    //     res.send(`You have requested a person `)
    // }
    // else {
    //     res.send(`You have requested a person ${tweets}`)
    // }
    let searchUrl = `https://api.twitter.com/1.1/search/tweets.json`;
    const T = {
        consumer_key: 'HlEmMglQgaUlXdsi0f3n7Bmsy',
        consumer_secret: 'QfNbOMIkraaS700ogUbjqrPYbLQ2PcHntAB4KwlhD4p4JXkUXN',
        access_token: '1239493661286531072-Ya7jfJMeRqsQwzbNeg3AXt9FGoUuV6',
        access_token_secret: '1aFNEnSba7sdxrT5b6D3uQ6K7R6IsCNu4MQC9F9c5SdU8 ',
    };
    let options = {
        method: 'GET',
        responseType: 'json',
        responseEncoding: 'utf8',
        url: searchUrl,
        params: { q: "narendramodi" },
        headers: {
            'Access-Control-Allow-Origin': '*',
            'content-type': 'application/json',
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
    };

    (async () => {
        const response = await axios(options);
        console.log('response', response)
        const data = await response.json();
        if (response.status >= 400) {
            throw new Error(data.errors);
        }
        return data;
    })
})

// Params property on the request object
// localhost:3000/person/thomas
router.get('/person/:name', (req, res) => {
    res.send(`You have requested a person ${req.params.name}`)
})

router.get('/error', (req, res) => {
    throw new Error('This is a forced error.')
})




module.exports = router;