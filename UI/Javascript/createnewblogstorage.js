let createBlog = document.getElementById('blogForm');

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
        body: blogBody.value 
    }

    existingBlogs.push(newBlog);

    localStorage.setItem('Blogs', JSON.stringify(existingBlogs));

}