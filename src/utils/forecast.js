const request=require("postman-request");

const forecast=(latitude,longitude,callback)=>{
    const url=`http://api.weatherstack.com/current?access_key=4a9e39c047ed19c9ca5681b63777ba76&query=${latitude},${longitude}&units=f`;
    request({url:url,json:true},function(error,response){
        // console.log(response.body.current.temprature);
        if(error){
            callback("Unable to connect to weather services!");
        }
        else if(response.body.error){
            callback("unable to find location");
            // console.log(response.body.error);
        }
        else{
            callback(undefined,`${response.body.current.weather_descriptions[0]}. It is currently ${response.body.current.temperature} degrees out. It feels like ${response.body.current.feelslike} degrees out.`);
        }
    })

}



























// const request = require('request')

// const forecast = (latitude, longitude, callback) => {
//     const url = 'https://api.darksky.net/forecast/9d1465c6f3bb7a6c71944bdd8548d026/' + latitude + ',' + longitude

//     request({ url: url, json: true }, (error, response) => {
//         if (error) {
//             callback('Unable to connect to weather service!', undefined)
//         } else if (response.body.error) {
//             callback('Unable to find location', undefined)
//         } else {
//             callback(undefined, response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + ' degress out. There is a ' + response.body.currently.precipProbability + '% chance of rain.')
//         }
//     })
// }

module.exports = forecast