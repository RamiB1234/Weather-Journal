/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = 'f9a3936b8f0a2f9f2672175fa16d7d91';
let zipCode = '94040'; // should be coming from UI

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
      // appropriately handle the error
    }
  }

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
      // appropriately handle the error
    }
  }

  // Get data from local server
const getData = async (url)=>{

  const res = await fetch(url)
  try {

    const data = await res.json();
    console.log(data)
    return data;
  }  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
}

  getTemp(zipCode);
  //getData('http://localhost:3000/data');
  sendUserData('http://localhost:3000/addUserData', {temperature: "26", date: newDate, comment: 'test'})
