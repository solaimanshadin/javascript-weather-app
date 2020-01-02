const cityForm = document.querySelector('.form-location');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) => {
    // const cityDets = data.cityDets;
    // const weather = data.weather;
    const { cityDets, weather } = data;
    console.log(data);

    //update details Template
    details.innerHTML = `
    <h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    </div>
    `;

    //Update day/night & icon images
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';

    time.setAttribute('src', timeSrc);
    //remove d-none class if present 
    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }

}
const updateCity = async(city) => {
    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    return { cityDets, weather };
}

cityForm.addEventListener('submit', e => {
    //Prevent Default Action
    e.preventDefault();
    const city = cityForm.city.value.trim();
    cityForm.reset();

    //update the UI with new City
    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err))

    //Set Local Storage
    localStorage.setItem('city', city);
})

if (localStorage.getItem('city')) {
    updateCity(localStorage.getItem('city'))
        .then(data => updateUI(data))
        .catch(err => console.log(err))
}
