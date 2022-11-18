// Glitch settings

let bg = document.getElementById('image-container');
let mask = document.querySelector('.glitch-image');
let count = 18;

for (let i = 0; i < count; i++) {
    let glitchbox = document.createElement("div");
    glitchbox.classList.add("box");
    bg.appendChild(glitchbox);
}

//glitch setting 1

setInterval(() => {
    mask.classList.add('transparent');
    mask.style.left = '45%';
    setTimeout(() => {
        mask.classList.remove('transparent')
        setTimeout(() => {
            mask.style.left = "60%";
            setTimeout(() => {
                mask.style.left = "50%";
            }, 50);
        }, 50);
    }, 60);
}, 3000);

//glitch setting 2

setInterval(() => {
    mask.classList.add("transparent");
    mask.style.left = "49%"
    mask.style.top = "-4%";
    setTimeout(() => {
        mask.classList.remove('transparent')
        setTimeout(() => {
            mask.style.left = "40%";
            setTimeout(() => {
                mask.style.top = "0%"
                mask.style.left = "50%"
            }, 50);
        }, 50);
    }, 60);
}, 4000);

let glitch = document.querySelectorAll(".box");

setInterval(() => {
    for (let i = 0; i < glitch.length; i++) {
        glitch[i].style.left = Math.floor(Math.random() * 900) + "px";
        glitch[i].style.top = Math.floor(Math.random() * 1000) + "px";
        glitch[i].style.width = Math.floor(Math.random() * 200) + "px";
        glitch[i].style.height = Math.floor(Math.random() * 5) + "px";
    }
}, 100)

//time section

const currentTime = document.querySelector('.time');

function addZero(n) {
    return n < 10 ? `0${n}` : n;
}

function getTime() {
    let cTime = new Date();
    let timeString = `${addZero(cTime.getHours())}:${addZero(cTime.getMinutes())}:${addZero(cTime.getSeconds())}`

    currentTime.innerHTML = timeString;
    setTimeout(getTime, 1000);
}

getTime();

//glitch sound

const gunShot = document.querySelector('.glitch-sound');
const soundBar = document.querySelector('.sound-bar');

const ball = document.querySelector(".ball")

soundBar.addEventListener('click', () => {
    ball.classList.toggle("off");
});

document.addEventListener('click', () => {
    if (ball.classList.contains('off')) {
        return;
    }


    gunShot.classList.add("active");
    new Audio("sounds/glitch-sound-effect-12796.mp3").play();

    for (let i = 0; i < glitch.length; i++) {
        glitch[i].style.width = Math.floor(Math.random() * 1900) + "px";
        glitch[i].style.height = Math.floor(Math.random() * 15) + "px";
        glitch[i].style.backgroundImage = "url('imgs/glitch.png')"
    }


    setTimeout(() => {
        gunShot.classList.remove("active");
        for (let i = 0; i < glitch.length; i++) {
            glitch[i].style.width = Math.floor(Math.random() * 200) + "px";
            glitch[i].style.height = Math.floor(Math.random() * 5) + "px";
            glitch[i].style.backgroundImage = "url('imgs/glitch2.png')"
        }
    }, 1000);
});

// Weather

const weatherLocation = document.querySelector(".location");
const temperature = document.querySelector('.temperature');
const status = document.querySelector(".status");
const weatherSearch = document.querySelector(".weather-search");
const search = document.querySelector(".search");

search.addEventListener('click', getWeather)
weatherSearch.addEventListener('change', getWeather)



let city = "Toronto";

//sha256 - crypt 
//get API key from file

function readStringFromFileAtPath (path){
        var request = new XMLHttpRequest();
        request.open("GET", path, false);
        request.send(null);
        var returnValue = request.responseText;
        return returnValue;
    }


var apiKey = readStringFromFileAtPath ("src/weather_k.txt");
console.log(apiKey);
function getWeather() {
    weatherSearch.value != ''
        ? (city = weatherSearch.value)
        : (city = 'Toronto');


    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${atob(apiKey)}`;

    fetch(url).then(res => {
        return res.json();
    }).then(data => {
        console.log(data);
        weatherLocation.innerText = data.name;
        temperature.innerText = `${Math.floor(data.main.temp - 273.15)}°C`;
        status.innerText = data.weather[0].description;
    });
}

getWeather();
