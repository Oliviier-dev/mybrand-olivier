const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');
const logo = document.querySelector('.logo');
var body = document.body;
var html = document.documentElement;


const menubtn = document.querySelector('.hamb');
const closebtn = document.querySelector('.close');


//function to toggle the close and menu icons
function toogleMenu(){
    menubtn.classList.toggle('hidden');
    closebtn.classList.toggle('hidden');
}
//giving the closebutton initial hidden property
closebtn.classList.add('hidden');

//calling the tooglemenu function if clicked
menubtn.addEventListener('click', toogleMenu);
closebtn.addEventListener('click', toogleMenu);

//by default menu will not be displayed
menu.style.display = 'none';


//if menu button is clicked
menubtn.addEventListener('click', () => {
    //display the meny
    menu.style.display = 'flex';

    //position the logo and the menu bar
    hamburger.style.position = 'fixed';
    hamburger.style.left = '80%';
    logo.style.position = 'fixed';

    //disable the scrolling
    body.style.overflowY = 'hidden';
    html.style.overflowY = 'hidden';
})

//if close button is clicked
closebtn.addEventListener('click', () => {
    //set the meny to display none
    menu.style.display = 'none';

    //position the logo and the menu bar as they were
    hamburger.style.position = 'static';
    logo.style.position = 'static';

     //enable scrolling again
    body.style.overflowY = 'scroll';
    html.style.overflowY = 'scroll';
})


//function to track the with of the screen
function mediaQueryTracker(width) {
    if (width.matches) { // If media query matches 675px and above

        //dont display the menu section        
        menu.style.display = 'none';
        closebtn.classList.add('hidden');
        menubtn.classList.remove('hidden');

        //setting the logo and hamburger to normal flow
        hamburger.style.position = 'static';
        logo.style.position = 'static';

        //Making the whole page scrollable
        body.style.overflowY = 'scroll';
        html.style.overflowY = 'scroll';
    }
  }
  
  // width to use with the mediaQueryTracker function
  var width = window.matchMedia("(min-width: 675px)");
  
  // caaling the function
  mediaQueryTracker(width);
  
  // Attaching listener function on state changes
  width.addEventListener("change", function() {
    mediaQueryTracker(width);
  });