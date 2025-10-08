/* first method : selecting all buttons and adding event listener to each button
currentTarget refers to the element to which the event handler has been attached to (in this case, the button that was clicked).
parentElement is used twice to navigate up the DOM tree from the button to the question div.
*/
const btns= document.querySelectorAll('.question-btn');

btns.forEach(function(btn){
    btn.addEventListener('click', function(e){
        const question= e.currentTarget.parentElement.parentElement;
        question.classList.toggle('show-text');
    });
});


/*second method : selecting all questions and adding event listener to each button
toggle the class of the parent element of the button which is question div*/
/*

const questions = document.querySelectorAll('.question');

questions.forEach(function(question){
  const btn = question.querySelector('.question-btn');
  btn.addEventListener('click', function(){
    question.classList.toggle('show-text');
  });
});

*/