const request = require('request')
const forecast=(lat,lon,callback)=>{
    const url= 'http://api.weatherstack.com/forecast?access_key=7f83e62c70456fa88716eb023595b3d0&query='+lat+','+lon+''
request({url, json:true},(error,{body}={})=>
{
 
    if(error){
        callback("Unable to connect to weather!",undefined)
    }
    else if(body.error){
         callback("Unable to find a location",undefined)
    }
    else{
    callback(undefined,"it is currently "+ body.current.temperature +"degrees out.It feels like "+ body.current.feelslike+"degrees")
    }
})

}
 
  
  module.exports=forecast