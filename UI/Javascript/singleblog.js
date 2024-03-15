let notificationsBar = document.getElementById('notis');
const reactionButton = document.querySelector('.react > div');

// Parse the query string of the URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

// Get the value of the 'id' parameter from the URL
const blogID = urlParams.get('id');
console.log(blogID);



function getCookie(name) {
    const cookieString = document.cookie;
    const cookies = cookieString.split('; ');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName === name) {
            return cookieValue;
        }
    }
    return null;
}


document.addEventListener("DOMContentLoaded", function() {

    fetch(`https://mybrand-olivier-production.up.railway.app/api/blog/blogs/${blogID}`)
    .then(response => response.json())
    .then(blogDetails => {
        // Process the fetched blog details and display them
        console.log(blogDetails);




        //let blogJSON = localStorage.getItem('viewBlog');
    let blog = blogDetails;
    // console.log(blog);

    let reactions = document.querySelector('.reactions');

    let articleDiv = document.createElement('div');
    articleDiv.classList.add('article');

    let imageDiv = document.createElement('div');
    imageDiv.classList.add('image');
    imageDiv.style.backgroundImage = `url("${blog.imageUrl}")`;

    let articleTitle = document.createElement('p');
    articleTitle.classList.add('title');
    articleTitle.innerText = blog.title; //fgh

    let infoDiv = document.createElement('div');
    infoDiv.classList.add('info');

    let writerDiv = document.createElement('div')
    writerDiv.classList.add('writer');

    let writerImage = document.createElement('div');
    writerImage.classList.add('image');

    let writerName = document.createElement('span');
    writerName.innerText = blog.author; //gfhj

    writerDiv.append(writerImage);
    writerDiv.append(writerName);

    let dateDiv = document.createElement('div')
    dateDiv.classList.add('date');

    const dateString = blog.createdAt;
    const dateObject = new Date(dateString);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0"); // Month is zero-based, so we add 1
    const day = String(dateObject.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;


    let date = document.createElement('span');
    date.classList.add('date');
    date.innerText = formattedDate; //fdgh

    let minutesRead = document.createElement('span');
    minutesRead.innerText = "5 min read";

    dateDiv.append(date);
    dateDiv.append(minutesRead);

    infoDiv.append(writerDiv);
    infoDiv.append(dateDiv);

    let bodyDiv = document.createElement('div');
    bodyDiv.classList.add('body');

    let articleContent = document.createElement('p');
    articleContent.innerText = blog.body; //gfh

    bodyDiv.append(articleContent);


    articleDiv.append(imageDiv);
    articleDiv.append(articleTitle);
    articleDiv.append(infoDiv);
    articleDiv.append(bodyDiv);

    reactions.before(articleDiv);



    const countSpan = reactionButton.querySelector('.count');
    if(blogDetails.likes.length >= 1){
        countSpan.textContent = blogDetails.likes.length;
    } else if(blogDetails.likes.length == 0){
        countSpan.textContent = '';
    }


    var tokenCookie = getCookie('jwt');
    if(tokenCookie){

        var parts = tokenCookie.split('.');
        var payload = parts[1];
        var decodedPayload = JSON.parse(atob(payload));
        console.log("Decoded Payload:", decodedPayload.id);

        checkUserLikeStatus(blogDetails.likes, decodedPayload.id);

    }

    })
    .catch(error => console.error('Error fetching blog details:', error));




})


reactionButton.addEventListener('click', function () {

    var tokenCookie = getCookie('jwt');

    if(tokenCookie){

        var parts = tokenCookie.split('.');
        var payload = parts[1];
        var decodedPayload = JSON.parse(atob(payload));
        console.log("Decoded Payload:", decodedPayload.id);


        fetch(`https://mybrand-olivier-production.up.railway.app/api/blogs/${blogID}/like`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${tokenCookie}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if(!response.ok) {

                notificationsBar.innerHTML = `<span class="material-symbols-outlined circle">error</span>An error occured, Try again`;
                setTimeout(function() {
                    notificationsBar.classList.add('visible');
            
                    setTimeout(function() {
                        notificationsBar.classList.remove('visible');
                    }, 2000);
                }, 1000); 

            }
            return response.json();
        })
        .then(data => {

            checkUserLikeStatus(data.blog.likes, decodedPayload.id);



            notificationsBar.innerHTML = `<span class="material-symbols-outlined circle" id="checkcircle">check_circle</span>${data.message}`;
            setTimeout(function() {
                notificationsBar.classList.add('visible');
            
                setTimeout(function() {
                    notificationsBar.classList.remove('visible');
                }, 2000);
            }, 1000); 
        console.log('Message sent:', data.blog.likes);
        })
        .catch(error => {
            console.error('There was a problem sending the message:', error);
        });


    } else{

        notificationsBar.innerHTML = `<span class="material-symbols-outlined circle">error</span>You have to be Logged in`;
            setTimeout(function() {
                notificationsBar.classList.add('visible');
        
                setTimeout(function() {
                    notificationsBar.classList.remove('visible');
                }, 2000);
            }, 1000); 

    }

})


/*const isSelected = reactionButton.classList.contains('selected');
            const countSpan = reactionButton.querySelector('.count');
            let count = countSpan.textContent === '' ? 0 : parseInt(countSpan.textContent);
            // Update the count
            count = isSelected ? count - 1 : count + 1;
            countSpan.textContent = count === 0 ? '' : count;*/



function checkUserLikeStatus(likesarray, userId){

    const countSpan = reactionButton.querySelector('.count');
    if(likesarray.length >= 1){
        countSpan.textContent = likesarray.length;
    } else{
        countSpan.textContent = '';
    }

    if(likesarray.includes(userId)){
        reactionButton.classList.add('selected');
    } else{
        reactionButton.classList.remove('selected');
    }

}
