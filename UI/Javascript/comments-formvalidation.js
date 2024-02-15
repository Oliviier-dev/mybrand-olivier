let commentsForm = document.getElementById('commentsForm');
let notificationsBar = document.getElementById('notis');
let commentSent = false;

commentsForm.addEventListener('submit', function(event){
    event.preventDefault();
    let name = document.getElementById('username');
    let comment = document.getElementById('comment');

    commentSent = validateInput(name, comment, commentSent);
})


function validateInput(name, comment, commentSent){
    let nameValue = name.value;
    let commentValue = comment.value;
    

    if(commentSent == true){

        notificationsBar.innerHTML = `<span class="material-symbols-outlined circle">error</span>You have already commented`;
        setTimeout(function() {
            notificationsBar.classList.add('visible');
    
            setTimeout(function() {
                notificationsBar.classList.remove('visible');
            }, 2000);
        }, 1000); 

    } else if(nameValue.length < 2 || commentValue.length < 3){

        notificationsBar.innerHTML = `<span class="material-symbols-outlined circle">error</span>Provide valid details`;
        setTimeout(function() {
            notificationsBar.classList.add('visible');
    
            setTimeout(function() {
                notificationsBar.classList.remove('visible');
            }, 2000);
        }, 1000); 
        
    } else if(nameValue.length > 2 && commentValue.length > 3 && commentSent === false){

        displayComment(name, comment);

        document.getElementById('username').value = '';
        document.getElementById('comment').value = '';
        commentSent = true;

        notificationsBar.innerHTML = `<span class="material-symbols-outlined cirle" id="checkcircle">check_circle</span>Comment sent`;
        document.getElementById('checkcircle').style.color = 'green';

        setTimeout(function() {
            notificationsBar.classList.add('visible');
        
            setTimeout(function() {
                notificationsBar.classList.remove('visible');
            }, 2000);
        }, 1000); 
        return commentSent;
    }
    return commentSent;

}

function displayComment(name, comment){

    // console.log(name, comment);
    var newItem = document.createElement('div');
    newItem.classList.add('item');

    var imageDiv = document.createElement('div');
    imageDiv.classList.add('imagee');
    newItem.appendChild(imageDiv);

    var contentDiv = document.createElement('div');
    contentDiv.classList.add('content');

    var commenterName = document.createElement('h4');
    commenterName.textContent = name.value;
    contentDiv.appendChild(commenterName);

    var commentText = document.createElement('span');
    commentText.textContent = comment.value;
    contentDiv.appendChild(commentText);

    newItem.appendChild(contentDiv);

    var itemsContainer = document.querySelector('.items');
    itemsContainer.appendChild(newItem);

}