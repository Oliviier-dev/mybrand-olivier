let notificationsBar = document.getElementById('notis');


document.addEventListener("DOMContentLoaded", (event) => {

    if (window.location.pathname.includes('/adminpage')) {
        displayBlogsAdmin();
        displayUserMessages();
    }

    let editButtons = document.querySelectorAll('.editBlogbtn');
    let deleteButtons = document.querySelectorAll('.deleteBlogbtn');

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

    //let messages = JSON.parse(localStorage.getItem('userMessages')) || [];
    // console.log(messages);
    let messages;

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
    //console.log(tokenCookie);


    fetch('https://mybrand-olivier-production.up.railway.app/api/usermessages', {
        headers: {
            'Authorization': `Bearer ${tokenCookie}`,
            'Content-Type': 'application/json'
          }
    })
    .then(data => {
        return data.json();
    })
    .then(data => {
        console.log(data);
        messages = data;

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
    
            headingThree.innerText = messages[i].name;
            headingFour.innerText = messages[i].email;
            para.innerText = messages[i].message;
    
    
            contentDiv.append(headingThree);
            contentDiv.append(headingFour);
            contentDiv.append(para);
    
            messageDesc.append(messageImage);
            messageDesc.append(contentDiv);   
            
            messageDiv.append(messageDesc);
    
            pagesMessages.before(messageDiv);
        }

    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}



function displayBlogsAdmin(){
    let pagesBlogs = document.querySelector('.pagesBlogs');
    //let blogs = JSON.parse(localStorage.getItem('Blogs')) || [];



    let blogs;

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
    //console.log(tokenCookie);


    fetch('https://mybrand-olivier-production.up.railway.app/api/blog/blogs', {
        headers: {
            'Authorization': `Bearer ${tokenCookie}`,
            'Content-Type': 'application/json'
          }
    })
    .then(data => {
        return data.json();
    })
    .then(data => {
        console.log(data);
        blogs = data;

        for(let i = 0; i < blogs.length; i++){

            let blogDiv = document.createElement('div');
            blogDiv.classList.add('blog');

             // Store the blog ID in the dataset attribute
             blogDiv.dataset.blogId = data[i]._id;
            
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


            editbutton.addEventListener('click', function() {
                // Retrieve the ID of the clicked blog
                let clickedBlogID = blogDiv.dataset.blogId;
                console.log(clickedBlogID);
                
                window.location.href = `createnewblog.html?id=${clickedBlogID}`;

            });

    
            let deletebutton = document.createElement('button');
            deletebutton.innerText = 'Delete';
            deletebutton.classList.add('deleteBlogbtn');


            deletebutton.addEventListener('click', function() {
                // Retrieve the ID of the clicked blog
                let clickedBlogID = blogDiv.dataset.blogId;

            fetch(`https://mybrand-olivier-production.up.railway.app/api/blog/blogs/${clickedBlogID}`, {
            method: 'delete',
            headers: {
                'Authorization': `Bearer ${tokenCookie}`,
                'content-Type' : 'application/json'
            }
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

                notificationsBar.innerHTML = `<span class="material-symbols-outlined circle" id= "checkcircle">check_circle</span>Blog deleted successfully`;
                    setTimeout(function() {
                        notificationsBar.classList.add('visible');
                
                        setTimeout(function() {
                            notificationsBar.classList.remove('visible');
                        }, 2000);
                    }, 1000); 

                    location.reload();

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

    });

    
            buttonsDiv.append(editbutton);
            buttonsDiv.append(deletebutton);
    
            blogDiv.append(blogDesc);   
            blogDiv.append(buttonsDiv);  
            
            pagesBlogs.before(blogDiv);
    
        }

    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

}


function editBlog(e){

    let blogs = JSON.parse(localStorage.getItem('Blogs')) || [];

    let blog = e.target.parentNode.parentNode;
    let blogHeading = blog.querySelector('.desc h3');

    let headingText = blogHeading.innerText;

    // console.log(headingText);

    for (let i = 0; i < blogs.length; i++){
        if(blogs[i].title == headingText){
            localStorage.setItem('editBlog', JSON.stringify(blogs[i]));
            localStorage.setItem('editBlogComments', JSON.stringify(blogs[i].comments));
            // console.log(blogs[i].comments);
            localStorage.setItem('editBlogIndex', i);
            window.location.href = "../pages/createnewblog.html";
            // localStorage.removeItem(blogs[i]);
            break;
        }
    }

}


function deleteBlog(e){

    let blogs = JSON.parse(localStorage.getItem('Blogs')) || [];
    let blog = e.target.parentNode.parentNode;
    // console.log(blog);
    let blogHeading = blog.querySelector('.desc h3');

    let headingText = blogHeading.innerText;
    console.log(headingText);
    for (let i = 0; i < blogs.length; i++){
        if(blogs[i].title == headingText){

            blogs.splice(i, 1);
            localStorage.setItem('Blogs', JSON.stringify(blogs));
            blog.style.display = 'none';
            break;

        }
    }

}