class Weather{
    constructor(city,country){
        this.city = city;
        this.country = country;
        this.appId = '68eacf436cb469ac9d94c08ba3165c9e'

    }

    async getWeather(){
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.city},${this.country}&appid=${this.appId}&units=metric`)
                          .then(data => data.json());
        
       return {
        main_data : response.main,
        other_data : response.weather[0],
        cityName : response.name
     }                
    
   }

   setLocation(city,country){
       this.city = city;
       this.country = this.country;
   }
    


}


class Store{
    constructor(){
        this.city;
        this.country;
        this.defaultCity = "Gazipur";
        this.defaultCountry = "BD";
    }

    gtLocation(){
        if(localStorage.getItem('city') === null ){
            this.city = this.defaultCity;
        }else{
            this.city = localStorage.getItem('city')
        }

        if(localStorage.getItem('country') === null ){
            this.country = this.defaultCountry;
        }else{
            this.country = localStorage.getItem('country')
        }

        return{
            city : this.city,
            country : this.country
        }
    }

    setLocation(city,country){
        this.city = localStorage.setItem('city',city);
        this.country = localStorage.setItem('country',country);

    }
}

const store = new Store();
const {city,country} = store.gtLocation();
const weather = new Weather(city,country);
document.addEventListener('DOMContentLoaded',weatherData);

class Ui{
   constructor(){
       this.cityName = document.getElementById('w-city');
       this.icon = document.getElementById('w-icon');
       this.feels = document.getElementById('w-feels');
       this.temperature = document.getElementById('w-tempareture');
       this.pressure = document.getElementById('w-pressure');
       this.humidity = document.getElementById('w-humidity');
   }

   paint({main_data:{temp,pressure,humidity},
          other_data:{main,icon},cityName}){
         const iconUrl = Ui.generateIcon(icon);
         this.icon.setAttribute('src',iconUrl);  
         this.cityName.textContent = cityName;   
        this.feels.textContent = `${main}`;
         this.temperature.textContent =`Temperature(Cel): ${temp}`;
        this.pressure.textContent = `Pressure(hpa): ${pressure}`;
        this.humidity.textContent = `Humidity(%): ${humidity}`;
   }
   static generateIcon(icon){
       return "https://api.openweathermap.org/img/w/" +icon+ ".png"
   }

   clearField(){
    document.getElementById('city').value = '';
    document.getElementById('country').value = '';
   }

   setMsg(msg){
        const para = document.getElementById('para');
        const div = document.createElement('div');
         div.className = 'alert alert-danger';
         div.id = 'message'
         div.textContent = msg;
        Ui.hideMessage();
        para.insertAdjacentElement('afterend',div)

   }
   static hideMessage(){
       setTimeout(() =>{
          document.getElementById('message').remove();
       },2000)
   }
}

let form = document.querySelector('form');
form.addEventListener('submit', e => {
    e.preventDefault();
    
    const city = document.getElementById('city').value;
    const country = document.getElementById('country').value; 
    
    if(city == '' || country == ''){
        ui.setMsg('Please provide necessary information')
        
        
    }else{
        weather.setLocation(city,country);
        store.setLocation(city,country)
        ui.clearField();
        weatherData()
    }
})

const ui = new Ui()
function weatherData(){
    weather.getWeather()
    .then(data => ui.paint(data))
    .catch(e => {
        console.log('')
    });

}


    