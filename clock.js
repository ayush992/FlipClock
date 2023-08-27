const time = new Date();
const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

const hr = document.querySelectorAll(".hour");
const min = document.querySelectorAll(".minute");
const secs = document.querySelectorAll(".sec");
const front = document.querySelectorAll(".front");
const back = document.querySelectorAll(".back");
var audio = new Audio('flipsound.mp3');

var hour = time.getHours();
var minute = time.getMinutes();
// var minute = 59;
var sec = time.getSeconds();
// var sec = 57;
let date = time.getDate();
let day = time.getDay().toString();
let year = time.getFullYear();

onload(start());

function start() {
    hr[1].style.order = 4;
    min[1].style.order = 4;
    secs[1].style.order = 4;
    document.getElementById("date").firstElementChild.innerHTML =
        date + " " + weekdays[day] + " " + year;
    hr[0].innerHTML = calZero(hour) + hour;
    hr[1].innerHTML = calZero(hour) + hour;
    min[0].innerHTML = calZero(minute) + minute;
    min[1].innerHTML = calZero(minute) + minute;
}

setInterval(clock, 1000);

function clock() {
    let zero = "0";

    if (sec == 59) {
        sec = 0;
        minute++;
        if (minute == 60) {
            minute = 0;
            hour++;
            if (hour == 24) hour = 0;
            hr[0].innerHTML = calZero(hour) + hour;
            hr[1].innerHTML = calZero(hour) + hour;
        }
        min[0].innerHTML = calZero(minute) + minute;
        min[1].innerHTML = calZero(minute) + minute;
    } else {
        sec += 1;
    }

    secs[0].innerHTML = calZero(sec) + sec;
    secs[1].innerHTML = calZero(sec) + sec;
    setTimeout(flip, 800, sec, 2);
}

function calZero(elem) {
    if (elem < 10) return "0";
    return "";
}

function flip(val, idx) {
    front[idx].innerHTML = calZero(val) + val;
    if (val === 59) {
        val = -1;
    }
    back[idx].innerHTML = calZero(val + 1) + (val + 1);
    if (idx == 0) {
        let cls = hr;
    }else if(idx==1){
        let cls = min;
    }else{
        cls = secs;
    }
    cls[0].innerHTML = calZero(val + 1) + (val + 1);
    document.querySelectorAll(".inner")[idx].classList.toggle("active");
    audio.play();
    setTimeout(() => {
        document.querySelectorAll(".inner")[idx].classList.toggle("active");
        // setTimeout(audio.play(),50);
    }, 400);
    if(val==-1 && idx == 2){
        flip(minute, 1);
    }
    if(idx == 1 && val == -1){
        flip(hour,0);
    }
}