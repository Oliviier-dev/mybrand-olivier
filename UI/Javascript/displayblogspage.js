document.addEventListener("DOMContentLoaded", (event) => {
    displayOnBlogsPage();
    viewBlog();
    
}); 

function displayOnBlogsPage(){
    let blogs = document.querySelector('.blogs');




    fetch('https://mybrand-olivier-production.up.railway.app/api/blog/blogs')
    .then(data => {
        return data.json();
    })
    .then(data => {
        console.log(data);
        for(let i = 0; i < data.length; i++){
            // console.log('hooray');
            let blogDiv = document.createElement('div');
            blogDiv.classList.add('blog', `blog${i+1}`);

             // Store the blog ID in the dataset attribute
             blogDiv.dataset.blogId = data[i]._id;
    
            let blogImage = document.createElement('div');
            blogImage.classList.add('blogimage');
    
            blogImage.style.backgroundImage = `url("${data[i].imageUrl}")`;
    
    
            let anchorTag = document.createElement('a');
            anchorTag.href = "#";
            anchorTag.classList.add('singleblog');


            anchorTag.addEventListener('click', function() {
                // Retrieve the ID of the clicked blog
                let clickedBlogID = blogDiv.dataset.blogId;
                console.log(clickedBlogID);
                window.location.href = `singleblogpage.html?id=${clickedBlogID}`;
            });

    
            let blogDesc = document.createElement('div');
            blogDesc.classList.add('desc')
            let blogCat = document.createElement('span');
            blogCat.classList.add('category');
            blogCat.innerText = data[i].category;
            let blogMinutes = document.createElement('span');
            blogMinutes.innerText = '5 min read';
    
            blogDesc.append(blogCat);
            blogDesc.append(blogMinutes);
    
    
            let blogInfo = document.createElement('div');
            blogInfo.classList.add('info');
    
    
            let reactionsDiv = document.createElement('div');
            reactionsDiv.classList.add('reactions');
    
            let reactionImage = document.createElement('img');
            reactionImage.src = "../images/Red Heart.svg";
    
            let reactinsCount = document.createElement('span');
            reactinsCount.classList.add('reactionscount');
            reactinsCount.innerText = data[i].likes.length;
    
            let reactinsDesc = document.createElement('span');
            reactinsDesc.innerText = 'reaction';
    
            reactionsDiv.append(reactionImage);
            reactionsDiv.append(reactinsCount);
            reactionsDiv.append(reactinsDesc);
    
            let commentsSpan = document.createElement('span');
            commentsSpan.innerHTML = `<span class="commentscount">${data[i].comments.length}</span> comment`;
    
            blogInfo.append(reactionsDiv);
            blogInfo.append(commentsSpan);
    
            let blogSnippet = document.createElement('div');
            blogSnippet.classList.add('snippet');
            let para = document.createElement('p');
    
            para.innerText = data[i].title;
    
            blogSnippet.append(para);
    
    
            let blogAuthor = document.createElement('div');
            blogAuthor.classList.add('author');
    
            let blogWriter = document.createElement('div');
            blogWriter.classList.add('writer');
    
            let writerImage = document.createElement('div');
            writerImage.classList.add('image');
            let writerName = document.createElement('span');
            writerName.innerText = data[i].author;
    
            blogWriter.append(writerImage);
            blogWriter.append(writerName);
            blogAuthor.append(blogWriter);
    
            let dateSpan = document.createElement('span');
            dateSpan.classList.add('date');
    

            const dateString = data[i].createdAt;
            const dateObject = new Date(dateString);
            const year = dateObject.getFullYear();
            const month = String(dateObject.getMonth() + 1).padStart(2, "0"); // Month is zero-based, so we add 1
            const day = String(dateObject.getDate()).padStart(2, "0");
            const formattedDate = `${year}-${month}-${day}`;
            dateSpan.innerText = formattedDate;
            // console.log(blogsStored[i].createdAT);
    
            blogAuthor.append(dateSpan);
    
    
            anchorTag.append(blogDesc);
            anchorTag.append(blogInfo);
            anchorTag.append(blogSnippet);
            anchorTag.append(blogAuthor);
    
            blogDiv.append(blogImage);
            blogDiv.append(anchorTag);
    
            blogs.append(blogDiv);
    
        } 
    });





    let blogsStored = JSON.parse(localStorage.getItem('Blogs'));

}

function viewBlog(){
    // console.log('hhe');
    let blogs = JSON.parse(localStorage.getItem('Blogs')) || [];
    let blogLinks = document.querySelectorAll('.singleblog');

    if(blogLinks.length > 0){
        // console.log(blogLinks);
        blogLinks.forEach(blog => {
            blog.addEventListener('click', function(){
                let title = blog.querySelector('.snippet p').innerText;
                for (let i = 0; i < blogs.length; i++){
                    if(blogs[i].title == title){
                        // console.log('gotta', title);
                        localStorage.setItem('viewBlog', JSON.stringify(blogs[i]));
                        // localStorage.setItem('editBlogIndex', i);
                    }
                }
            })
        });
    }

}
