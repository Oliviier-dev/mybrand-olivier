document.addEventListener("DOMContentLoaded", function() {
    let blogJSON = localStorage.getItem('viewBlog');
    let blog = JSON.parse(blogJSON);
    // console.log(blog);

    let reactions = document.querySelector('.reactions');

    let articleDiv = document.createElement('div');
    articleDiv.classList.add('article');

    let imageDiv = document.createElement('div');
    imageDiv.classList.add('image');
    imageDiv.style.backgroundImage = `url("${blog.image}")`;

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

    let date = document.createElement('span');
    date.classList.add('date');
    date.innerText = blog.createdAT; //fdgh

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

    let allComments = document.querySelector('.items');
    
    for(let i = 0; i < blog.comments.length; i++){
        let commentDiv = document.createElement('div');
        commentDiv.classList.add('item');

        let commenterImageDiv = document.createElement('div');
        commenterImageDiv.classList.add('imagee');

        let comment = document.createElement('div');
        comment.classList.add('content');

        let commenterName = document.createElement('h4');
        let commenterComment = document.createElement('span');

        commenterName.innerText = blog.comments[i].commentorName;
        commenterComment.innerText = blog.comments[i].commentorcomment;

        comment.append(commenterName);
        comment.append(commenterComment);

        commentDiv.append(commenterImageDiv);    
        commentDiv.append(comment);

        allComments.appendChild(commentDiv)
    }


})