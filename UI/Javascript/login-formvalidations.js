let myForm = document.getElementById('myForm');

let emailValidated = false;

myForm.addEventListener('submit', function(event){
    event.preventDefault();
    console.log('hello')
    let emailValue = document.getElementById('emaillogin').value;
    // let passwordlValue = document.getElementById('password').value;
    
    validateEmail(emailValue);
    // checkFormValidity();
})


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
        checkFormValidity();   
    }

}

function checkFormValidity(){
    if(emailValidated){
        window.location.href = 'adminpage.html';
    }
}