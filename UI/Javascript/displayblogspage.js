document.addEventListener("DOMContentLoaded", (event) => {
    displayOnBlogsPage();
    viewBlog();
    
}); 

function displayOnBlogsPage(){
    let blogs = document.querySelector('.blogs');
    let blogsStored = JSON.parse(localStorage.getItem('Blogs'));

    for(let i = 0; i < blogsStored.length; i++){
        // console.log('hooray');
        let blogDiv = document.createElement('div');
        blogDiv.classList.add('blog', `blog${i+1}`);

        let blogImage = document.createElement('div');
        blogImage.classList.add('blogimage');

        blogImage.style.backgroundImage = `url("${blogsStored[i].image}")`;


        let anchorTag = document.createElement('a');
        anchorTag.href = "singleblogpage.html";
        anchorTag.classList.add('singleblog');

        let blogDesc = document.createElement('div');
        blogDesc.classList.add('desc')
        let blogCat = document.createElement('span');
        blogCat.classList.add('category');
        blogCat.innerText = blogsStored[i].category;
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
        reactinsCount.innerText = '7';

        let reactinsDesc = document.createElement('span');
        reactinsDesc.innerText = 'reactions';

        reactionsDiv.append(reactionImage);
        reactionsDiv.append(reactinsCount);
        reactionsDiv.append(reactinsDesc);

        let commentsSpan = document.createElement('span');
        commentsSpan.innerHTML = `<span class="commentscount">17</span> comments`;

        blogInfo.append(reactionsDiv);
        blogInfo.append(commentsSpan);

        let blogSnippet = document.createElement('div');
        blogSnippet.classList.add('snippet');
        let para = document.createElement('p');

        para.innerText = blogsStored[i].title;

        blogSnippet.append(para);


        let blogAuthor = document.createElement('div');
        blogAuthor.classList.add('author');

        let blogWriter = document.createElement('div');
        blogWriter.classList.add('writer');

        let writerImage = document.createElement('div');
        writerImage.classList.add('image');
        let writerName = document.createElement('span');
        writerName.innerText = blogsStored[i].author;

        blogWriter.append(writerImage);
        blogWriter.append(writerName);
        blogAuthor.append(blogWriter);

        let dateSpan = document.createElement('span');
        dateSpan.classList.add('date');

        dateSpan.innerText = blogsStored[i].createdAT;
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

}

function viewBlog(){
    // console.log('hhe');
    let blogs = JSON.parse(localStorage.getItem('Blogs')) || [];
    let blogLinks = document.querySelectorAll('.singleblog');

    if(blogLinks.length > 0){
        console.log(blogLinks);
        blogLinks.forEach(blog => {
            blog.addEventListener('click', function(){
                let title = blog.querySelector('.snippet p').innerText;
                for (let i = 0; i < blogs.length; i++){
                    if(blogs[i].title == title){
                        console.log('gotta', title);
                        localStorage.setItem('viewBlog', JSON.stringify(blogs[i]));
                        // localStorage.setItem('editBlogIndex', i);
                    }
                }
            })
        });
    }

}
