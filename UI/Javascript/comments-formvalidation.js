let commentsForm = document.getElementById('commentsForm');
let notificationsBar = document.getElementById('notis');

commentsForm.addEventListener('submit', function(event){
    event.preventDefault();
    let name = document.getElementById('username');
    let comment = document.getElementById('comment');

    validateInput(name, comment);
})


function validateInput(name, comment){
    let nameValue = name.value;
    let commentValue = comment.value;
    
    if(nameValue.length < 2 || commentValue.length < 3){
        setTimeout(function() {
            notificationsBar.classList.add('visible');
    
            setTimeout(function() {
                notificationsBar.classList.remove('visible');
            }, 2000);
        }, 1000);   
    } else{
        document.getElementById('username').value = '';
        document.getElementById('comment').value = '';

        notificationsBar.innerHTML = `<span class="material-symbols-outlined cirle" id="checkcircle">check_circle</span>Comment sent`;
        document.getElementById('checkcircle').style.color = 'green';

        setTimeout(function() {
            notificationsBar.classList.add('visible');
    
            setTimeout(function() {
                notificationsBar.classList.remove('visible');
            }, 2000);
        }, 1000); 
    }
}