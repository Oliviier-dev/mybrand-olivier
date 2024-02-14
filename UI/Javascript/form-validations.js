let myForm = document.getElementById('myForm');

myForm.addEventListener('submit', function(event){
    event.preventDefault();
    let nameValue = document.getElementById('name').value;
    let emailValue = document.getElementById('email').value;
    let messageValue = document.getElementById('message').value;
    
    validateName(nameValue);
    validateEmail(emailValue);
    validateMessage(messageValue);
})