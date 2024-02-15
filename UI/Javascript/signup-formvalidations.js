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


//function to validate the email input
function validateEmail(email){
    let emailLabel = document.getElementById('emaillabel');
    let emailPlaceholder = document.getElementById('emailplaceholder');

    let atPosition = email.indexOf('@');
    let dotPosition = email.lastIndexOf('.');

    if(atPosition < 1 || dotPosition < atPosition + 2 || dotPosition + 2 >= email.length){
        emailLabel.style.borderBottomColor = '#c80202';
        emailPlaceholder.style.color = '#c80202';
        emailPlaceholder.innerText = 'Please enter a valid email';
    } else{
        emailLabel.style.borderBottomColor = '#02c837';
        emailPlaceholder.style.color = '#02c837';
        emailPlaceholder.innerText = 'Email';
        emailValidated = true;
    }

}


//function to validate the password input
function validatePassword(password, passwordRetype){
    let passwordLabel = document.getElementById('passwordlabel');
    let passwordPlaceholder = document.getElementById('passwordplaceholder');
    
    let retypepasswordLabel = document.getElementById('retypepasswordlabel');
    let retypepasswordPlaceholder = document.getElementById('retypepasswordplaceholder');

    if(password.length < 6){
        passwordLabel.style.borderBottomColor = '#c80202';
        passwordPlaceholder.style.color = '#c80202';
        passwordPlaceholder.innerText = 'Password must be at least 6 characters long';

    } else{
        passwordLabel.style.borderBottomColor = '#02c837';
        passwordPlaceholder.style.color = '#02c837';
        passwordPlaceholder.innerText = 'Password';
        passwordValidated = true;
    }

    if(password !== passwordRetype || passwordRetype == '' || passwordValidated == false) {
        retypepasswordLabel.style.borderBottomColor = '#c80202';
        retypepasswordPlaceholder.style.color = '#c80202';
        retypepasswordPlaceholder.innerText = 'Password does not match';
    } else{
        retypepasswordLabel.style.borderBottomColor = '#02c837';
        retypepasswordPlaceholder.style.color = '#02c837';
        retypepasswordPlaceholder.innerText = 'Confirm Password';
        retypePasswordValidated = true;
    }


}


//function to check whether everything has been validated
function checkFormValidity() {
    if(emailValidated && passwordValidated && retypePasswordValidated){
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
        document.getElementById('retypepassword').value = '';
        document.getElementById('emaillabel').style.borderBottomColor = '#fff';
        document.getElementById('passwordlabel').style.borderBottomColor = '#fff';
        document.getElementById('retypepasswordlabel').style.borderBottomColor = '#fff';
        document.getElementById('emailplaceholder').style.color = '#fff';
        document.getElementById('passwordplaceholder').style.color = '#fff';
        document.getElementById('retypepasswordplaceholder').style.color = '#fff';

        setTimeout(function() {
            notificationsBar.classList.add('visible');
    
            setTimeout(function() {
                notificationsBar.classList.remove('visible');
            }, 2000);
        }, 1000);

    }   

    //Set back the validate values to false after a user have sent his message
    nameValidated = false;
    emailValidated = false;
    messageValidated = false;

}
