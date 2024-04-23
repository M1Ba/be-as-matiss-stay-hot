// var TrandingSlider = new Swiper('.tranding-slider', {
//   effect: 'coverflow',
//   grabCursor: true,
//   centeredSlides: true,
//   loop: true,
//   slidesPerView: 'auto',
//   coverflowEffect: {
//     rotate: 0,
//     stretch: 0,
//     depth: 100,
//     modifier: 2.5,
//   },
//   // pagination: {
//   //   el: '.swiper-pagination',
//   //   clickable: true,
//   // },
//   navigation: {
//     nextEl: '.swiper-button-next',
//     prevEl: '.swiper-button-prev',
//   }
// });

// Function to convert temperature from Kelvin to Celsius
function kelvinToCelsius(kelvin) {
  return (kelvin - 273.15).toFixed(1);
}

// Function to update the slider content based on API data
function updateSliderContent(sliderIndex, apiData) {
  var slide = document.querySelector(`.swiper-slide[aria-label="${sliderIndex} / 40"]`);

  //alert(slide)
  // Update weather icon based on "main" value from API
  const weatherIcon = apiData.weather[0].main.toLowerCase();
  slide.children[0].children[0].src = `images/${apiData.weather[0].main.toLowerCase()}.png`;

  // Update date
  const date = new Date(apiData.dt_txt);
  const formattedDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
  slide.children[1].children[0].textContent = formattedDate;

  // Update time
  const time = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  slide.children[1].children[1].children[0].textContent = time;
  //slide.getElementById(`t`).textContent = time;

  // Update temperature
  const temperature = kelvinToCelsius(apiData.main.temp);
  //slide.getElementById(`temp`).textContent = `${temperature}°C`;
  slide.children[1].children[1].children[1].textContent = `${temperature} °C`;

  // Update feels like temperature
  const feelsLike = kelvinToCelsius(apiData.main.feels_like);
  //slide.getElementById(`f`).textContent = `Feels like: ${feelsLike}°C`;
  slide.children[1].children[1].children[2].textContent = `Feels like: ${feelsLike} °C`;

  // Update weather conditions
  //slide.getElementById(`c`).textContent = apiData.weather[0].main;
  slide.children[1].children[1].children[3].textContent = apiData.weather[0].main;
}

document.getElementById('search-button').addEventListener('click', function () {
  const cityName = document.getElementById('search-city').value;
  const apiKey = 'b65516f4c82f41144f4766948e5a80a8'; // Replace with your OpenWeatherMap API key
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (data.cod === "200") {
        // Loop through the list of forecasts (assuming there are 40 forecasts in the response)
        for (let i = 0; i < 40; i++) {
          updateSliderContent(i + 1, data.list[i]);
        }
        TrandingSlider.update(); // Update the Swiper instance
      } else {
        alert(`Error: ${data.message}`);
      }
    })
    .catch(error => console.error('Error:', error));
});

var TrandingSlider = new Swiper('.tranding-slider', {
  effect: 'coverflow',
  grabCursor: true,
  centeredSlides: true,
  loop: false,
  slidesPerView: 'auto',
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 100,
    modifier: 2.5,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  }
});







  

// var TrandingSlider = new Swiper('.trending-slide', {
//   effect: 'coverflow',
//   grabCursor: true,
//   centeredSlides: true,
//   loop: true,
//   slidesPerView: 'auto',
//   coverflowEffect: {
//     rotate: 0,
//     stretch: 0,
//     depth: 100,
//     modifier: 2.5,
//   },
//   pagination: {
//     el: '.swiper-pagination',
//     clickable: true,
//   },
//   navigation: {
//     nextEl: '.swiper-button-next',
//     prevEl: '.swiper-button-prev',
//   }
// });
