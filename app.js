const wrapper = document.querySelector('.wrapper')
const inputPart = document.querySelector('.input-part')
const infoTxt = document.querySelector('.info-txt')
const inputField = document.querySelector('.input-part input')
const locationBtn = document.querySelector('button')
const icon = document.querySelector('.weather-part img')
let api
document.querySelector('header i').addEventListener('click',function () {
    wrapper.classList.remove('active')
})

inputField.addEventListener('keyup', function (e) {
    if (e.key == 'Enter' && this.value.trim() != '') {
        callApi(this.value.trim())
    }
})
locationBtn.addEventListener('click', function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback)
    } else {
        alert('Trình duyệt không hỗ trợ nha !!!');
    }
})
function successCallback(position) {
    const {longitude, latitude} =position.coords
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=415f05899ea93b183acc1ef595e4bd7f`
    fetchData()
}
function errorCallback(err) {
    infoTxt.innerText = err.message
    infoTxt.classList.add('error')
}
function fetchData() {
    infoTxt.innerText = 'Getting weather details...'
    infoTxt.classList.add('pending')
    fetch(api).then(res => res.json()).then(result => weatherDetails(result))
}
function callApi(city) {
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=415f05899ea93b183acc1ef595e4bd7f`
    fetchData()
}
function weatherDetails(info) {
    if (info.cod == '404') {
        infoTxt.classList.replace('pending','error')
        infoTxt.innerText = `${inputField.value} isn't a valid city name`
    }else{
        console.log(info);

        const city = info.name
        const country = info.sys.country
        const {description, id} = info.weather[0]
        const {feels_like, humidity, temp} = info.main

        if (id == 800) {
            icon.src= './Weather Icons/clear.svg'
        }else if(id>= 200 && id<=232 ){
            icon.src= './Weather Icons/strom.svg'
        }else if(id>= 600 && id<=622 ){
            icon.src= './Weather Icons/snow.svg'
        }else if(id>= 701 && id<= 781 ){
            icon.src= './Weather Icons/haze.svg'
        }else if(id>= 801 && id<= 804 ){
            icon.src= './Weather Icons/cloud.svg'
        }else if((id>= 300 && id<= 321) || (id>= 500 && id<= 531) ){
            icon.src= './Weather Icons/cloud.svg'
        }   


        wrapper.querySelector('.temp .number').innerText = Math.floor(temp)
        wrapper.querySelector('.weather').innerText = description
        wrapper.querySelector('.location span').innerText = `${city}, ${country}`
        wrapper.querySelector('.details .number-2').innerText = Math.floor(feels_like)
        wrapper.querySelector('.humidity .number').innerText = humidity + "%"

        infoTxt.classList.remove('pending','error')
        wrapper.classList.add('active')
    }
}