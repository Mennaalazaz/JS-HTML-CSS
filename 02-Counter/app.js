let counter=0; // initial value use let instead of const because the value will change

const value= document.querySelector("#value"); // selecting the value by id
const btns= document.querySelectorAll(".btn"); // selecting all buttons by class

btns.forEach(function(btn){ // loop through each button
    btn.addEventListener("click", function(e){
        const styles= e.currentTarget.classList; // get the class list of the clicked button , currentTarget ensures you’re targeting the actual button, not a child element.
        if(styles.contains("decrease")){
            counter--;
        } else if(styles.contains("increase")){
            counter++;
        } else{
            counter=0;
        }
        // change color based on value
        if(counter>0){
            value.style.color="green";
        }
        if(counter<0){
            value.style.color="red";
        }   
        if(counter===0){
            value.style.color="black";
        }
        // update the value in the DOM
        value.textContent=counter;
    });
});


// NOTE :
// === is used for strict equality comparison, meaning it checks both the value and the type without performing type coercion.
// == is used for loose equality comparison, meaning it checks the value after performing type coercion if necessary.
// In this case, using === is preferred to ensure that counter is exactly equal to 0 and is of the same type (number).

//0 == "0"    // ✅ true (because "0" gets converted to number 0)
// 0 === "0"   // ❌ false (number ≠ string)

// false == 0  // ✅ true
// false === 0 // ❌ false

