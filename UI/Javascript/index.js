const hamburger = document.querySelector('.hamburger');
const navlinks = document.querySelector('.navlinks');
const socials = document.querySelector('.socials');

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


// hamburger.addEventListener('click', () => {
//     navlinks.classList.toggle('hide');
//     socials.classList.toggle('hide');
// })