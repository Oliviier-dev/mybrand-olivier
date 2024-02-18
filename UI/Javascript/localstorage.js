let allMessages = document.querySelector('.allmessages');
let pagesMessages = document.querySelector('.pagesmessages');

let messages = JSON.parse(localStorage.getItem('userMessages'));
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