const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const giveaway = document.querySelector('.giveaway');
const deadline = document.querySelector('.deadline');
const items = document.querySelectorAll('.deadline-format h4');

// ============== Setting Giveaway Date ==============

// Get current date
let tempDate = new Date();
let tempYear = tempDate.getFullYear(); // extract current year
let tempMonth = tempDate.getMonth(); // extract current monthIndex (Zero-based)
let tempDay = tempDate.getDate();   // extract current day

// new Date(year, monthIndex, day, hours, minutes, seconds)
let giveawayDate = new Date(tempYear,tempMonth, tempDay+10, 11,30,0) ; // giveaway ends after 10 days of current date at 11:30 am

let year = giveawayDate.getFullYear(); // extract giveaway year
let hours = giveawayDate.getHours(); // giveaway hour
let minutes = giveawayDate.getMinutes(); // giveaway min
let month = giveawayDate.getMonth(); // giveaway monthIndex
month = months[month]; 
let weekday = weekdays[giveawayDate.getDay()]; // giveaway day name
const date = giveawayDate.getDate(); // giveaway day number

giveaway.innerHTML = `giveaway ends on ${weekday}, ${date} ${month} ${year}, ${hours}:${minutes}am`;

let giveaway_time = giveawayDate.getTime();  // giveaway time in milliseconds

// ============== Setting Countdown Timer ==============

function getRemainingTime() {

    const today = new Date().getTime(); // current time in milliseconds
    const t_diff = giveaway_time-today; // milliseconds are left until the giveaway date

    // 1s = 1000ms
    // 1m = 60s
    // 1hr = 60m
    // 1d = 24hr
    // values in milliseconds
    const oneSec =  1000;
    const oneMin =  oneSec*60;
    const oneHour = oneMin*60;
    const oneDay =  oneHour*24;

    let days = Math.floor(t_diff / oneDay) ;
    let hours = Math.floor( (t_diff%oneDay) / oneHour) ;
    let mins = Math.floor( (t_diff%oneHour) / oneMin) ;
    let seconds = Math.floor( (t_diff%oneMin) / oneSec) ;

    // set values array
    const values = [days, hours, mins, seconds];

    // function to format numbers as 9 to be 09 
    function format(item) {
      if (item < 10) {
        return (item = `0${item}`);
      }
      return item;
    }

    // Updates the corresponding <h4> elements in the HTML
    items.forEach(function (item, index) {
      item.innerHTML = format(values[index]);
    });

    // When the giveaway expires : Stops the timer and Replaces the countdown with a message
    if (t_diff < 0) {
      clearInterval(countdown);
      deadline.innerHTML = `<h4 class="expired">sorry, this giveaway has expired!</h4>`;
    }
}

// runs getRemainingTime() every 1000 ms (1 second).
let countdown = setInterval(getRemainingTime, 1000);
// ensures the values show immediately, not after one second delay.
getRemainingTime();
