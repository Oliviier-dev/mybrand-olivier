document.addEventListener("DOMContentLoaded", function() {

    displayComments();

});

let commentsForm = document.getElementById('commentsForm');
let notificationsBar = document.getElementById('notis');
//let commentSent = false;



// Parse the query string of the URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

// Get the value of the 'id' parameter from the URL
const blogID = urlParams.get('id');
console.log(blogID);



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

        notificationsBar.innerHTML = `<span class="material-symbols-outlined circle">error</span>Provide valid details`;
        setTimeout(function() {
            notificationsBar.classList.add('visible');
    
            setTimeout(function() {
                notificationsBar.classList.remove('visible');
            }, 2000);
        }, 1000);
        
    } else if(nameValue.length > 2 && commentValue.length > 3){

        sendComment(nameValue, commentValue);

        /*document.getElementById('username').value = '';
        document.getElementById('comment').value = '';
        commentSent = true;

        notificationsBar.innerHTML = `<span class="material-symbols-outlined cirle" id="checkcircle">check_circle</span>Comment sent`;
        document.getElementById('checkcircle').style.color = 'green';

        setTimeout(function() {
            notificationsBar.classList.add('visible');
        
            setTimeout(function() {
                notificationsBar.classList.remove('visible');
            }, 2000);
        }, 1000); */
        // return commentSent;
    }
    // console.log(commentSent)
    // return commentSent;

}

function sendComment(name, comment){
    console.log(name, comment);

    fetch(`https://mybrand-olivier-production.up.railway.app/api/blogs/${blogID}/comments`, {
    method: 'POST',
    headers: {
        'Content-Type' : 'application/json'
    },
    body: JSON.stringify({ name, comment })
    })
    .then(response => {
        if (!response.ok) {

            notificationsBar.innerHTML = `<span class="material-symbols-outlined circle">error</span>An error occured!!`;
            setTimeout(function() {
                notificationsBar.classList.add('visible');
        
                setTimeout(function() {
                    notificationsBar.classList.remove('visible');
                }, 2000);
            }, 1000); 

            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {


        document.getElementById('username').value = '';
        document.getElementById('comment').value = '';


        displayComments();


        notificationsBar.innerHTML = `<span class="material-symbols-outlined cirle" id="checkcircle">check_circle</span>Comment sent`;
        document.getElementById('checkcircle').style.color = 'green';

        setTimeout(function() {
            notificationsBar.classList.add('visible');
        
            setTimeout(function() {
                notificationsBar.classList.remove('visible');
            }, 2000);
        }, 1000);

        
        console.log('Message sent:', data);
    })
    .catch(error => {
        // Handle any errors that occurred during the request
        console.error('There was a problem sending the message:', error);
    });



   /* // console.log(name, comment);

    let blogJSON = localStorage.getItem('viewBlog');
    let allBlogs = JSON.parse(localStorage.getItem('Blogs')) || [];
    //console.log(allBlogs)
    let blog = JSON.parse(blogJSON);

    let blogTitle = blog.title;
    
    let commentorName = name.value;
    let commentorcomment = comment.value;
    // console.log(allBlogs);

    for(let i = 0; i < allBlogs.length; i++){
        if(allBlogs[i].title == blogTitle){
            allBlogs[i].comments.push({commentorName, commentorcomment});
            localStorage.setItem('Blogs', JSON.stringify(allBlogs));
            localStorage.setItem('viewBlog', JSON.stringify(allBlogs[i]));
            break;
        }
    }

    // console.log(blog);

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
    itemsContainer.appendChild(newItem);*/

}

function displayComments (){


    fetch(`https://mybrand-olivier-production.up.railway.app/api/blog/blogs/${blogID}`)
    .then(response => {
        // Process the fetched blog details and display them
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {

        let blogComments = data.comments;
        console.log(blogComments) 


        let allComments = document.querySelector('.items');
    
        for(let i = 0; i < blogComments.length; i++){
            let commentDiv = document.createElement('div');
            commentDiv.classList.add('item');

            let commenterImageDiv = document.createElement('div');
            commenterImageDiv.classList.add('imagee');

            let comment = document.createElement('div');
            comment.classList.add('content');

            let commenterName = document.createElement('h4');
            let commenterComment = document.createElement('span');

            commenterName.innerText = blogComments[i].name;
            commenterComment.innerText = blogComments[i].comment;

            comment.append(commenterName);
            comment.append(commenterComment);

            commentDiv.append(commenterImageDiv);    
            commentDiv.append(comment);

            allComments.appendChild(commentDiv)
        }


        console.log('Message sent:', data);
    })
    .catch(error => {
        // Handle any errors that occurred during the request
        console.error('There was a problem sending the message:', error);
    });

}