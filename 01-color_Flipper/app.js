// Define an array of colors (simple values)
const colors = ["green", "blue", "rgba(133,122,200)", "#f15025"];

// Select the button and color display elements from the DOM (Document Object Model)
// DOM lets to tap into and manipulate HTML elements using JavaScript.
const btn= document.getElementById("btn");
const color= document.querySelector(".color");

btn.addEventListener('click',function(){ // when button is clicked, run the code inside this function

    const randomNumber= getRandomNumber() // this is a function call to get a random number, It will return a random index (like 0, 1, 2, or 3).

    // Change the background color of the webpage to a random color from the colors array
    document.body.style.backgroundColor=colors[randomNumber];

    // Update the text content of the color display element to show the current color
    color.textContent=colors[randomNumber];
})

// Create the helper function
function getRandomNumber(){
    return Math.floor(Math.random()*colors.length)
}
// Math.random() → gives a random number between 0 and 1, like 0.57
// Math.random() * colors.length → gives a random number between 0 and 4 (like 2.37)
// Math.floor(...) → rounds down to the nearest whole number, so 2.37 becomes 2