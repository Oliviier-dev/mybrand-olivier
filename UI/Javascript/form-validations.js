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



function validateName(name){
    let nameLabel = document.getElementById('namelabel');
    let namePlaceholder = document.getElementById('nameplaceholder');

    if(name.length < 1){
        nameLabel.style.borderBottomColor = '#c80202';
        namePlaceholder.style.color = '#c80202';
        namePlaceholder.innerText = 'Please enter your name';

    } else{
        nameLabel.style.borderBottomColor = '#02c837';
        namePlaceholder.style.color = '#02c837';
        namePlaceholder.innerText = 'Name';
        return true;
    }

}



function validateMessage(message){
    let messageLabel = document.getElementById('messagelabel');

    if(message.length < 1){
        messageLabel.style.borderBottomColor = '#c80202';
    } else{
        messageLabel.style.borderBottomColor = '#02c837';
        return true;
    }

}