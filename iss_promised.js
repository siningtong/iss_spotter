const request = require('request-promise-native');
const fetchMyIP=function(){
  return request('https://api.ipify.org?format=json')
}
const fetchCoordsByIP = function(body) {
const ip = JSON.parse(body).ip;
return request(`http://ip-api.com/json/${ip}`)
};
const fetchISSFlyOverTimes = function(body){
  const coords = {
    latitude : JSON.parse(body).lat,
    longitude:JSON.parse(body).lon
  }
  return request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`)
}

const nextISSTimesForMyLocation=function(){
  return fetchMyIP()
  .then(fetchCoordsByIP)//do something with the result from fetchmyIp
  .then(fetchISSFlyOverTimes)//do something with the result from fetchCoordsByIP
  .then((data)=>{
    const {response}=JSON.parse(data);
    return response
})
}
//.then takes a callback function and trigger the callback itself,so we dont call this callback function
//the  return fetchMyIP()acturally returns the whole promises chain,not just fetchMyIP(). I was confused of this.


module.exports = { nextISSTimesForMyLocation };
