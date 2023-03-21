const apiKey = 'ad3e9cdad997b9f0292d86dde0464fb6';
const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');

searchBtn.addEventListener('click', () => fetchWeather(searchInput.value));
searchInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    fetchWeather(searchInput.value);
  }
});

async function fetchWeather(cityName) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`);
    const data = await response.json();
    displayWeather(data);
    suggestActivities(data);

    // Hide the welcome div when the user searches for a city
    document.getElementById('welcome').classList.add('hidden');

    // Remove the 'hidden' class to display the activities section
    document.getElementById('activities').classList.remove('hidden');
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

function displayWeather(data) {
  document.getElementById('city-name').innerText = `${data.name}, ${data.sys.country}`;
  document.getElementById('weather-icon').src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
  document.getElementById('temperature').innerText = `${Math.round(data.main.temp)}°C`;
  document.getElementById('description').innerText = data.weather[0].description;
  document.getElementById('humidity').innerText = `Humidity: ${data.main.humidity}%`;
  document.getElementById('wind-speed').innerText = `Wind Speed: ${data.wind.speed} m/s`;
  document.getElementById('activity-suggestions').classList.remove('hidden');

  // Remove the 'hidden' class to display the weather information
  document.getElementById('weather-info').classList.remove('hidden');

  const temperature = Math.round(data.main.temp);
  const bodyElement = document.body;

  // Change background based on temperature
  if (temperature > 30) {
    bodyElement.style.background = 'linear-gradient(to bottom, #e53935, #d32f2f)';
  } else if (temperature > 20) {
    bodyElement.style.background = 'linear-gradient(to bottom, #FFA726, #FF7E41)';
  } else if (temperature > 10) {
    bodyElement.style.background = 'linear-gradient(to bottom, #F0DB4F, #F2CA52)';
  } else if (temperature > 0) {
    bodyElement.style.background = 'linear-gradient(to bottom, #4a90e2, #6AB1F7)';
  } else {
    bodyElement.style.background = 'linear-gradient(to bottom, #00ACC1, #00897B)';
  }
}

function suggestActivities(data) {
  const activitiesList = document.getElementById('activities-list');
  activitiesList.innerHTML = '';

  const temperature = data.main.temp;
  const suggestions = [];


  if (temperature >= 20) {
      suggestions.push('Visit a park', 'Go for a bike ride', 'Have a picnic', 'Visit a local beach', 'Go to a lake',
      'Take a swim at an outdoor pool or water park', 'Go on a boat or kayak ride', 'Play beach volleyball or frisbee',
      'Have a BBQ with family', ' Have an outdoor picnic with friends',
      'Go on a hiking or camping trip', "Take a day trip to a nearby town or city",
      "Go on a hot air balloon ride", "Rent a scooter or bicycle", "Explore a new city",
      "Go to an outdoor music or cultural festival", "Try outdoor yoga or other fitness classes",
      "Take a sightseeing tour on a bus or boat");
  } else if (temperature >= 10) {
      suggestions.push('Visit a museum', 'Go for a walk', 'Watch a movie', "Visit a local zoo or aquarium", "Go on a guided tour of a historical or cultural site", "Take a cooking class or learn a new recipe", "Go to a wine tasting or brewery tour", "Visit a farmer's market or local food festival", "Take a painting or pottery class", "Go on a shopping trip to a nearby town or city", "Visit an art exhibit or gallery", "Take a dance or fitness class indoors", "Attend a concert or theater performance");
  } else {
      suggestions.push('Stay indoors', 'Bake cookies', 'Play board games', "Take a spa day or relaxation class", "Try a new indoor sport like rock climbing or ice skating", "Go to a local museum or art exhibit", "Take a day trip to a nearby indoor water park or amusement park", "Watch a movie at the cinema or at home", "Have a board game or game night with friends and family", "Take a virtual cooking or cocktail making class", "Visit a local library or book club", "Do a DIY project or home renovation task", "Take a language class or learn a new skill online");
  }

  // Shuffle the suggestions array using the Fisher-Yates algorithm
  for (let i = suggestions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [suggestions[i], suggestions[j]] = [suggestions[j], suggestions[i]];
  }

  // Display 3 random suggestions
  for (let i = 0; i < 3; i++) {
    const suggestion = suggestions[i];
    const listItem = document.createElement('li');
    listItem.innerText = suggestion;
    activitiesList.appendChild(listItem);
  }
}








/*
const apiKey = 'ad3e9cdad997b9f0292d86dde0464fb6';
const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');

searchBtn.addEventListener('click', () => fetchWeather(searchInput.value));
searchInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    fetchWeather(searchInput.value);
  }
});

async function fetchWeather(cityName) {
  if (!cityName) return; // Prevent empty queries

  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`);
    if (!response.ok) throw new Error('Error fetching weather data');

    const data = await response.json();
    displayWeather(data);
    suggestActivities(data);
  } catch (error) {
    console.error(error.message);
  }
}

function displayWeather(data) {
    document.getElementById('city-name').innerText = `${data.name}, ${data.sys.country}`;
    document.getElementById('weather-icon').src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    document.getElementById('temperature').innerText = `${Math.round(data.main.temp)}°C`;
    document.getElementById('description').innerText = data.weather[0].description;
    document.getElementById('humidity').innerText = `Humidity: ${data.main.humidity}%`;
    document.getElementById('wind-speed').innerText = `Wind Speed: ${data.wind.speed} m/s`;
  
    // Remove the 'hidden' class to display the weather information
    document.getElementById('weather-info').classList.remove('hidden');

    // Hide the welcome message
  document.getElementById('welcome').classList.add('hidden');
  }
  
function suggestActivities(data) {
  const activitiesList = document.getElementById('activities-list');
  activitiesList.innerHTML = '';

  const temperature = data.main.temp;
  const suggestions = [];

  if (temperature >= 20) {
      suggestions.push('Visit a park', 'Go for a bike ride', 'Have a picnic', 'Visit a local beach', 'Go to a lake',
      'Take a swim at an outdoor pool or water park', 'Go on a boat or kayak ride', 'Play beach volleyball or frisbee',
      'Have a BBQ with family', ' Have an outdoor picnic with friends',
      'Go on a hiking or camping trip', "Take a day trip to a nearby town or city",
      "Go on a hot air balloon ride", "Rent a scooter or bicycle", "Explore a new city",
      "Go to an outdoor music or cultural festival", "Try outdoor yoga or other fitness classes",
      "Take a sightseeing tour on a bus or boat");
  } else if (temperature >= 10) {
      suggestions.push('Visit a museum', 'Go for a walk', 'Watch a movie', "Visit a local zoo or aquarium", "Go on a guided tour of a historical or cultural site", "Take a cooking class or learn a new recipe", "Go to a wine tasting or brewery tour", "Visit a farmer's market or local food festival", "Take a painting or pottery class", "Go on a shopping trip to a nearby town or city", "Visit an art exhibit or gallery", "Take a dance or fitness class indoors", "Attend a concert or theater performance");
  } else {
      suggestions.push('Stay indoors', 'Bake cookies', 'Play board games', "Take a spa day or relaxation class", "Try a new indoor sport like rock climbing or ice skating", "Go to a local museum or art exhibit", "Take a day trip to a nearby indoor water park or amusement park", "Watch a movie at the cinema or at home", "Have a board game or game night with friends and family", "Take a virtual cooking or cocktail making class", "Visit a local library or book club", "Do a DIY project or home renovation task", "Take a language class or learn a new skill online");
  }

  // Shuffle the suggestions array using the Fisher-Yates algorithm
  for (let i = suggestions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [suggestions[i], suggestions[j]] = [suggestions[j], suggestions[i]];
  }

  // Display 3 random suggestions
  for (let i = 0; i < 3; i++) {
    const suggestion = suggestions[i];
    const listItem = document.createElement('li');
    listItem.innerText = suggestion;
    activitiesList.appendChild(listItem);
  }
}

*/