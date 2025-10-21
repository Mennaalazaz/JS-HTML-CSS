const btns = document.querySelectorAll(".tab-btn");
const articles = document.querySelectorAll(".content");

btns.forEach((btn)=>{
    btn.addEventListener('click',function(e){

    // 1. Remove 'active' from all buttons
    btns.forEach(b=>b.classList.remove('active'));

    // 2.  Add 'active' to the clicked one
    e.currentTarget.classList.add('active');

    // 3. Hide all content
    articles.forEach(a=>a.classList.remove('active'));

    // 4. Show the one that matches the button id
    let id = e.target.dataset.id;
    let element = document.getElementById(id)
    element.classList.add('active')

    });
});
