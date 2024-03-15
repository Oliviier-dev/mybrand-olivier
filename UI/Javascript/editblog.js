let createBlogButton = document.querySelector('.btnpost');
let title = document.getElementById('title');
let snippet = document.getElementById('snippet');
let category = document.getElementById('category');
let image = document.getElementById('img');
let author = document.getElementById('author');
let body = document.getElementById('body');

let notificationsBar = document.getElementById('notis');

document.addEventListener("DOMContentLoaded", function() {

    let createBlog = document.getElementById('blogForm');

     // Parse the query string of the URL
     const queryString = window.location.search;
     const urlParams = new URLSearchParams(queryString);
 
     // Get the value of the 'id' parameter from the URL
     const blogID = urlParams.get('id');
     console.log(blogID);

     if(blogID){

        createBlogButton.textContent = 'Edit'

        fetch(`https://mybrand-olivier-production.up.railway.app/api/blog/blogs/${blogID}`)
        .then(response => response.json())
        .then(blogDetails => {
            // Process the fetched blog details and display them
            console.log(blogDetails);
            let blog = blogDetails;
            // console.log(blog);

            title.value = blog.title;
            snippet.value = blog.snippet;
            category.value = blog.category;
            image.value = blog.imageUrl;
            author.value = blog.author;
            body.value = blog.body;

        })
        .catch(error => console.error('Error fetching blog details:', error));



    }



    createBlog.addEventListener('submit', function(e){
        e.preventDefault();
    
        if(blogID){
            EditBlogData(blogID);
        }
    })



    // Retrieve the JSON string from localStorage
    //let blogJSON = localStorage.getItem('editBlog');
    //let editBlogIndex = localStorage.getItem('editBlogIndex');




    // Parse the JSON string back to an object
    //let blog = JSON.parse(blogJSON);

    /*let title = document.getElementById('title');
    let snippet = document.getElementById('snippet');
    let category = document.getElementById('category');
    let image = document.getElementById('img');
    let author = document.getElementById('author');
    let body = document.getElementById('body');

    title.value = blog.title;
    snippet.value = blog.snippet;
    category.value = blog.category;
    image.value = blog.image;
    author.value = blog.author;
    body.value = blog.body;*/

    // console.log(snippet.value);

    /*localStorage.removeItem('editBlog');
    localStorage.removeItem('editBlogIndex');

    let blogs = JSON.parse(localStorage.getItem('Blogs')) || [];
    blogs.splice(editBlogIndex, 1);
    localStorage.setItem('Blogs', JSON.stringify(blogs));*/
});


function EditBlogData(blogID){
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
        title: title.value, 
        snippet: snippet.value, 
        category: category.value, 
        imageUrl: image.value,
        author: author.value,
        body: body.value,
        //comments: JSON.parse(localStorage.getItem('editBlogComments')) || []
    }

    //existingBlogs.push(newBlog);

    //localStorage.setItem('Blogs', JSON.stringify(existingBlogs));



    fetch(`https://mybrand-olivier-production.up.railway.app/api/blog/blogs/${blogID}`, {
            method: 'PUT',
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
            title.value = '';    
            snippet.value = '';    
            category.value = '';    
            image.value = '';    
            author.value = '';    
            body.value = '';
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