let createBlog = document.getElementById('blogForm');
let notificationsBar = document.getElementById('notis');

let blogTitle = document.getElementById('title');
let blogSnippet = document.getElementById('snippet');
let blogCategory = document.getElementById('category');
let blogImage = document.getElementById('img');
let blogAuthor = document.getElementById('author');
let blogBody = document.getElementById('body');


createBlog.addEventListener('submit', function(e){
    e.preventDefault();
    storeBlogData();
})

function storeBlogData(){
    let existingBlogs = JSON.parse(localStorage.getItem('Blogs')) || [];

    const createdAT = new Date().toLocaleDateString('en-GB');

    let newBlog = {
        title: blogTitle.value, 
        snippet: blogSnippet.value, 
        category: blogCategory.value, 
        image: blogImage.value,
        author: blogAuthor.value,
        createdAT: createdAT,
        body: blogBody.value ,
        comments:[]
    }

    existingBlogs.push(newBlog);

    localStorage.setItem('Blogs', JSON.stringify(existingBlogs));

    blogTitle.value = '';    
    blogSnippet.value = '';    
    blogCategory.value = '';    
    blogImage.value = '';    
    blogAuthor.value = '';    
    blogBody.value = '';
    
    
    setTimeout(function() {
        notificationsBar.classList.add('visible');
    
        setTimeout(function() {
            notificationsBar.classList.remove('visible');
        }, 2000);
    }, 1000); 

}