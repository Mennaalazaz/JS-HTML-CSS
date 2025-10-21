// .getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
// .pageYOffset tells you how far (in pixels) the page has been scrolled from the very top.
// .offsetTop  tells you how far an element is from the top of the page

// ********** set date ************
// set date of the footer dynamically
const date = document.getElementById("date");
date.innerHTML = new Date().getFullYear();


// ********** close links ************
// Adjust clicking on the nav-toggle to open the links-container 
// (by changing the height of the link-container based on the number of elements inside the link class)
const toggle = document.querySelector('.nav-toggle')
const linksContainer = document.querySelector('.links-container')
const links = document.querySelector('.links')

toggle.addEventListener('click',function(){
    // linksContainer.classList.toggle('show-links');
    const linksHeight = links.getBoundingClientRect().height;
    const containerHeight = linksContainer.getBoundingClientRect().height;

    if(containerHeight===0){ // If the container is currently closed (height = 0) → open it
        linksContainer.style.height = `${linksHeight}px`;
    }
    else{ // Otherwise, if it’s already open → close it
        linksContainer.style.height = 0;
    }
});

// ********** fixed navbar ************
const nav = document.getElementById('nav');
const topLink = document.querySelector('.top-link');

window.addEventListener("scroll", function () {
    const scrollHeight =  window.pageYOffset; // Get how far the user has scrolled vertically (in pixels)
    const navHeight = nav.getBoundingClientRect().height; // Get the height of the nav element

    // If user has scrolled more than the height of navbar → make it fixed
    if (scrollHeight>navHeight){
        nav.classList.add('fixed-nav'); // adds a CSS class that fixes navbar at top
    }
    else{
        nav.classList.remove('fixed-nav');
    }

    // If user has scrolled more than 500px → show “back to top” button
    if(scrollHeight>500){
        topLink.classList.add('show-link');
    }
    else{
        topLink.classList.remove('show-link');
    }
});

// ********** smooth scroll by javaScript without default href  ************
const scrollLinks = document.querySelectorAll('.scroll-link')

// Loop through each link and attach a click event listener
scrollLinks.forEach((link)=>{
    link.addEventListener('click',function(e){
            // prevent default href 
            e.preventDefault();

            // navigate to specific spot
                // Get the 'href' attribute of the clicked link (e.g., '#about')
                // and remove the '#' using slice(1) to get only the id name (e.g., 'about')
            const id = e.currentTarget.getAttribute('href').slice(1);
            const element = document.getElementById(id);
            let position = element.offsetTop; // Get the distance of that element from the top of the page

            const nav = document.getElementById('nav');
            let isFixedNav = nav.classList.contains('fixed-nav');
            // If the navbar is fixed, subtract its height from the scroll position
            // so the section isn’t hidden behind the navbar
            if(isFixedNav){
                const navHeight = nav.getBoundingClientRect().height;
                position -= navHeight;
            }
            // Smoothly scroll the window to the calculated position
            window.scroll({
                left:0,
                top : position
            });

            // close navbar
            const linksContainer = document.querySelector('.links-container');
            linksContainer.style.height=0;
    });

});

