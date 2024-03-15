document.addEventListener("DOMContentLoaded", function() {


    // Parse the query string of the URL
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    // Get the value of the 'id' parameter from the URL
    const blogID = urlParams.get('id');
    console.log(blogID);

    fetch(`https://mybrand-olivier-production.up.railway.app/api/blog/blogs/${blogID}`)
    .then(response => response.json())
    .then(blogDetails => {
        // Process the fetched blog details and display them
        console.log(blogDetails);




        //let blogJSON = localStorage.getItem('viewBlog');
    let blog = blogDetails;
    // console.log(blog);

    let reactions = document.querySelector('.reactions');

    let articleDiv = document.createElement('div');
    articleDiv.classList.add('article');

    let imageDiv = document.createElement('div');
    imageDiv.classList.add('image');
    imageDiv.style.backgroundImage = `url("${blog.imageUrl}")`;

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

    const dateString = blog.createdAt;
    const dateObject = new Date(dateString);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0"); // Month is zero-based, so we add 1
    const day = String(dateObject.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;


    let date = document.createElement('span');
    date.classList.add('date');
    date.innerText = formattedDate; //fdgh

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
    })
    .catch(error => console.error('Error fetching blog details:', error));




})


document.addEventListener('DOMContentLoaded', function () {
    const reactionButtons = document.querySelectorAll('.react > div');

    reactionButtons.forEach(button => {
        button.addEventListener('click', function () {
            const isSelected = button.classList.contains('selected');
            const countSpan = button.querySelector('.count');
            let count = countSpan.textContent === '' ? 0 : parseInt(countSpan.textContent);
            
            // Deselect all reaction buttons except the clicked one
            reactionButtons.forEach(btn => {
                if (btn !== button && btn.classList.contains('selected')) {
                    btn.classList.remove('selected');
                    const otherCountSpan = btn.querySelector('.count');
                    const otherCount = otherCountSpan.textContent === '' ? 0 : parseInt(otherCountSpan.textContent);
                    if (otherCount > 0) {
                        otherCountSpan.textContent = otherCount - 1;
                    }
                }
            });
            
            // Toggle selection of the clicked button
            button.classList.toggle('selected');
            
            // Update the count
            count = isSelected ? count - 1 : count + 1;
            countSpan.textContent = count === 0 ? '' : count;
        });
    });
});