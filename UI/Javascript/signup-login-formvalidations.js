let myForm = document.getElementById('myForm');
let notificationsBar = document.getElementById('notis');

let emailValidated = false;
let passwordValidated = false;
let retypePasswordValidated = false;


myForm.addEventListener('submit', function(event){
    event.preventDefault();
    let emailValue = document.getElementById('email').value;
    let passwordlValue = document.getElementById('password').value;
    let passwordRetypeValue = document.getElementById('retypepassword').value;
    
    validatePassword(passwordlValue, passwordRetypeValue);
    validateEmail(emailValue);
    checkFormValidity();

})


