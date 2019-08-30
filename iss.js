const request = require("request");

const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json',(error,response,body)=>{
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const ip = JSON.parse(body).ip;
    callback(null,ip);
  });
};

const fetchCoordsByIP=function(ip,callback){
  request(`http://ip-api.com/json/${ip}`,(error,response,body)=>{
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const coo={
      latitude: JSON.parse(body).lat,
      longitude:JSON.parse(body).lon
    }
    callback(null,coo)
  })

}

const fetchISSFlyOverTimes = function(coords, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`,(error,response,body)=>{
    if(error){
      callback(error,null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const passes = JSON.parse(body).response;
    callback(null, passes);
  })
};


// fetchMyIP(function(error, ip) {
  
//   if (error) {
//     return;
//   }

//   fetchCoordsByIP(ip, function(error, coods) {

//   });

// });
const nextISSTimesForMyLocation=function(callback){
  fetchMyIP((error,ip) => {
    if (error) {
      return callback(error, null);
    }
    fetchCoordsByIP(ip, (error, coo) => {
      if (error) {
        return callback(error, null);
      }
      fetchISSFlyOverTimes(coo,(error,passes) => {
        if (error) {
          return callback(error, null);
        }
        callback(error, passes)
      })
    })
  })
}








module.exports = { nextISSTimesForMyLocation};


