let createBlog = document.getElementById('blogForm');
let createBlogButton = document.querySelector('.btnpost');
let actionButtonValue = createBlogButton.textContent;

let notificationsBar = document.getElementById('notis');

let blogTitle = document.getElementById('title');
let blogSnippet = document.getElementById('snippet');
let blogCategory = document.getElementById('category');
let blogImage = document.getElementById('img');
let blogAuthor = document.getElementById('author');
let blogBody = document.getElementById('body');

// Parse the query string of the URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

// Get the value of the 'id' parameter from the URL
const blogID = urlParams.get('id');


createBlog.addEventListener('submit', function(e){
    e.preventDefault();

    if(!blogID){
        storeBlogData();
        console.log(actionButtonValue, 'post');
    }
});

function storeBlogData(){
    //let existingBlogs = JSON.parse(localStorage.getItem('Blogs')) || [];


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

    var tokenCookie = getCookie('jwt');


    //const createdAT = new Date().toLocaleDateString('en-GB');

    let newBlog = {
        title: blogTitle.value, 
        snippet: blogSnippet.value, 
        category: blogCategory.value, 
        imageUrl: blogImage.value,
        author: blogAuthor.value,
        body: blogBody.value ,
        //comments: JSON.parse(localStorage.getItem('editBlogComments')) || []
    }

    //existingBlogs.push(newBlog);

    //localStorage.setItem('Blogs', JSON.stringify(existingBlogs));



    fetch('https://mybrand-olivier-production.up.railway.app/api/blog/createnew', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${tokenCookie}`,
                'content-Type' : 'application/json'
            },
            body: JSON.stringify(newBlog)
    })
    .then(response => {
        if(!response.ok) {

            notificationsBar.innerHTML = `<span class="material-symbols-outlined circle error">error</span>An error Occured`;
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

        if(data.status === 'failed'){

            notificationsBar.innerHTML = `<span class="material-symbols-outlined circle error">error</span>All Fields are required`;
            setTimeout(function() {
                notificationsBar.classList.add('visible');
        
                setTimeout(function() {
                    notificationsBar.classList.remove('visible');
                }, 2000);
            }, 1000); 

        } else {
            blogTitle.value = '';    
            blogSnippet.value = '';    
            blogCategory.value = '';    
            blogImage.value = '';    
            blogAuthor.value = '';    
            blogBody.value = '';
            //localStorage.removeItem('editBlogComments');
            
            window.location.href = "adminpage.html";
        }

        console.log('Message sent:', data);
    })
    .catch(error => {

        notificationsBar.innerHTML = `<span class="material-symbols-outlined circle error">error</span>An error`;
        setTimeout(function() {
            notificationsBar.classList.add('visible');
    
            setTimeout(function() {
                notificationsBar.classList.remove('visible');
            }, 2000);
        }, 1000); 

        console.error('There was a problem sending the message:', error);
    });

}