document.addEventListener("DOMContentLoaded", (event) => {

    if (window.location.pathname.includes('/adminpage')) {
        displayBlogsAdmin();
        displayUserMessages();
    }

    let editButtons = document.querySelectorAll('.editBlogbtn');
    let deleteButtons = document.querySelectorAll('.editBlogbtn');

    if (editButtons.length > 0 && deleteButtons.length > 0) {
        
        editButtons.forEach(button => {
            button.addEventListener('click', editBlog);
        });

        deleteButtons.forEach(button => {
            button.addEventListener('click', deleteBlog);
        });
    }

}); 


function displayUserMessages(){
    // let allMessages = document.querySelector('.allmessages');
    let pagesMessages = document.querySelector('.pagesmessages');

    let messages = JSON.parse(localStorage.getItem('userMessages')) || [];
    // console.log(messages);

    for(let i = 0; i < messages.length; i++){
        // console.log(messages[i]);
        let messageDiv = document.createElement('div');
        messageDiv.classList.add('message');

        let messageDesc = document.createElement('div');
        messageDesc.classList.add('messagedesc');

        let messageImage = document.createElement('div');
        messageImage.classList.add('image');

        let contentDiv = document.createElement('div');

        let headingThree = document.createElement('h3');
        let headingFour = document.createElement('h4');
        let para = document.createElement('p');

        headingThree.innerText = messages[i][0];
        headingFour.innerText = messages[i][1];
        para.innerText = messages[i][2];


        contentDiv.append(headingThree);
        contentDiv.append(headingFour);
        contentDiv.append(para);

        messageDesc.append(messageImage);
        messageDesc.append(contentDiv);   
        
        messageDiv.append(messageDesc);

        pagesMessages.before(messageDiv);
    }
}



function displayBlogsAdmin(){
    let pagesBlogs = document.querySelector('.pagesBlogs');
    let blogs = JSON.parse(localStorage.getItem('Blogs')) || [];

    for(let i = 0; i < blogs.length; i++){

        let blogDiv = document.createElement('div');
        blogDiv.classList.add('blog');
        
        let blogDesc = document.createElement('div');
        blogDesc.classList.add('desc');

        let headingThree = document.createElement('h3');
        let para = document.createElement('p');

        blogDesc.append(headingThree);
        blogDesc.append(para);

        headingThree.innerText = blogs[i].title;
        para.innerText = blogs[i].snippet;

        let buttonsDiv = document.createElement('div');
        buttonsDiv.classList.add('buttons');

        let editbutton = document.createElement('button');
        editbutton.innerText = 'Edit';
        editbutton.classList.add('editBlogbtn');

        let deletebutton = document.createElement('button');
        deletebutton.innerText = 'Delete';
        deletebutton.classList.add('deleteBlogbtn');

        buttonsDiv.append(editbutton);
        buttonsDiv.append(deletebutton);

        blogDiv.append(blogDesc);   
        blogDiv.append(buttonsDiv);  
        
        pagesBlogs.before(blogDiv);

    }

}


function editBlog(e){

    let blogs = JSON.parse(localStorage.getItem('Blogs')) || [];

    let blog = e.target.parentNode.parentNode;
    let blogHeading = blog.querySelector('.desc h3');

    let headingText = blogHeading.innerText;

    console.log(headingText);

    for (let i = 0; i < blogs.length; i++){
        if(blogs[i].title == headingText){
            localStorage.setItem('editBlog', JSON.stringify(blogs[i]));
            localStorage.setItem('editBlogIndex', i);
            window.location.href = "../pages/createnewblog.html";
            localStorage.removeItem(blogs[i]);
        }
    }

}