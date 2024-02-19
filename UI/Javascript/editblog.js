document.addEventListener("DOMContentLoaded", function() {
    // Retrieve the JSON string from localStorage
    let blogJSON = localStorage.getItem('editBlog');
    let editBlogIndex = localStorage.getItem('editBlogIndex');

    // Parse the JSON string back to an object
    let blog = JSON.parse(blogJSON);

    let title = document.getElementById('title');
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
    body.value = blog.body;

    // console.log(snippet.value);

    localStorage.removeItem('editBlog');
    localStorage.removeItem('editBlogIndex');

    let blogs = JSON.parse(localStorage.getItem('Blogs')) || [];
    blogs.splice(editBlogIndex, 1);
    localStorage.setItem('Blogs', JSON.stringify(blogs));
});