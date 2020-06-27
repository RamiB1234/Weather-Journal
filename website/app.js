/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = 'f9a3936b8f0a2f9f2672175fa16d7d91'; 
const localServerURL = 'http://localhost:3000';

// api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={your api key}

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


// Fetch data from openweathermap API
const getTemp = async (zip)=>{

    const res = await fetch(baseURL+zip+',us&appid='+apiKey)
    try {
  
      const data = await res.json();
      console.log(data)
      return data;
    }  catch(error) {
      console.log("error", error);
    }
  }

  // Send data by a POST request
  const sendUserData= async (url, data={})=>{

    const res = await fetch(url, {
        method : "POST",
        credentials : "same-origin",
        headers : {
          'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
    });
    try {
  
      const data = await res.json();
      console.log(data)
      return data;
    }  catch(error) {
      console.log(res);
      console.log("error", error);
    }
  }

// Get the data by a GET request
const getData = async (url)=>{

  const res = await fetch(url)
  try {

    const data = await res.json();
    console.log(data)
    return data;
  }  catch(error) {
    console.log("error", error);
  }
}

// Add an event listener
const generateBtn = document.getElementById('generate');
generateBtn.addEventListener('click', generate);

// Chaining requests
function generate(){
  const zipCode = document.getElementById('zip').value;
  const content = document.getElementById('feelings').value;

  // Get data from openweathermap API
  getTemp(zipCode)
  .then(function(data){
    const temp= data.main.temp;

    // Send data to local server
    sendUserData(localServerURL+ '/addUserData', {temperature: temp, date: newDate, content: content})
  }).then(function(){

    // Get data from local server
    getData(localServerURL+ '/data')
    .then(function(data){

      // Update UI:
      document.getElementById('date').innerHTML = "Date: "+ data.date;
      document.getElementById('temp').innerHTML = "Temperature: "+ data.temperature;
      document.getElementById('content').innerHTML = "Feelings: "+ data.content;
    });
  })
}
