const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];

const btn= document.getElementById("btn");
const color= document.querySelector(".color");

// hexcolor looks like #f15025
btn.addEventListener('click',function(){ 

    let hexColor= "#";  // start with a # for hex color code

    // loop 6 times to get 6 characters for the hex color randomly from the hex array
    for(let i=0; i<6; i++){ 
        hexColor += hex[getRandomNumber()];
    }

    // Update the text content and background color to show the current color
    color.textContent= hexColor; 
    document.body.style.backgroundColor= hexColor; 
})

function getRandomNumber(){
    return Math.floor(Math.random()*hex.length)
}

