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
