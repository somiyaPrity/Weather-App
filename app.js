const apiKey = '68eacf436cb469ac9d94c08ba3165c9e';

function searchWeather() {
  const city = document.getElementById('city').value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayWeather(data));
  document.getElementById('city').value = '';
}
const setInnerText = (id, tempItem) => {
  if (id == 'temp') {
    document.getElementById(id).innerHTML = `${tempItem} &deg;C`;
  } else {
    document.getElementById(id).innerText = tempItem;
  }
};
const displayWeather = (temp) => {
  setInnerText('city-name', temp.name);
  setInnerText('temp', temp.main.temp);
  setInnerText('weather-condition', temp.weather[0].main);
  const imgUrl = ` http://openweathermap.org/img/wn/${temp.weather[0].icon}@2x.png`;
  const weatherImg = document.getElementById('weather-img');
  weatherImg.setAttribute('src', imgUrl);
};
