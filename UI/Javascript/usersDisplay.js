let notificationsBar = document.getElementById('notis');

//function to get the cookie
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


//Getting all the users

fetch('https://mybrand-olivier-production.up.railway.app/api/auth/users', {
headers: {
    'Authorization': `Bearer ${tokenCookie}`,
    'Content-Type': 'application/json'
}
})
.then(data => {
    return data.json();
})
.then(users => {
    displayUserAccounts(users);
    console.log(users);
});



//function to display all the users
function displayUserAccounts(users) {
    const userListDiv = document.getElementById('userList');
    userListDiv.innerHTML = ''; // Clear previous content

    users.forEach(user => {
        const userDiv = document.createElement('div');
        userDiv.dataset.userId = user._id;
        userDiv.innerHTML = `
            <p>Email: ${user.email}</p>
            <p>Role: <span class="userRole">${user.role}</span></p>
            <div><button class="deleteUserBtn">Delete</button>
            <button class="changeUserRoleBtn">Change Role</button>
            </div>
        `;
        userListDiv.appendChild(userDiv);

        const deleteUserBtns = userDiv.querySelectorAll('.deleteUserBtn');
        deleteUserBtns.forEach(button => {
            button.addEventListener('click', function() {
                // Retrieve the user ID from the data attribute
                const userId = this.parentElement.parentElement.dataset.userId;
                 // Call delete function and pass the user ID
                deleteUser(userId);
            });
        });

        const editUserBtns = userDiv.querySelectorAll('.changeUserRoleBtn');
        editUserBtns.forEach(button => {
            button.addEventListener('click', function() {
                // Retrieve the user ID from the data attribute
                const userId = this.parentElement.parentElement.dataset.userId;
                 // Call edit function and pass the user ID
                editUserROle(userId);
            });
        });

    });
}


function deleteUser(userId){

        fetch(`https://mybrand-olivier-production.up.railway.app/api/auth/users/${userId}`, {
        method: 'delete',
        headers: {
            'Authorization': `Bearer ${tokenCookie}`,
            'content-Type' : 'application/json'
        }
        })
        .then(response => {
            return response.json();
        })
        .then(data => {

            displayUserAccounts(data.users);
            notificationsBar.innerHTML = `<span class="material-symbols-outlined" id="checkcircle">check_circle</span>User Deleted`;
            setTimeout(function() {
                notificationsBar.classList.add('visible');
        
                setTimeout(function() {
                    notificationsBar.classList.remove('visible');
                }, 2000);
            }, 1000);
            console.log(data);
        })
        .catch(error => {

            notificationsBar.innerHTML = `<span class="material-symbols-outlined circle">error</span>An error occured, Try again`;
            setTimeout(function() {
                notificationsBar.classList.add('visible');
        
                setTimeout(function() {
                    notificationsBar.classList.remove('visible');
                }, 2000);
            }, 1000);

            console.error('There was a problem sending the message:', error);
        });

}



function editUserROle(userId){

        fetch(`https://mybrand-olivier-production.up.railway.app/api/auth/users/${userId}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${tokenCookie}`,
            'content-Type' : 'application/json'
        }
        })
        .then(response => {
            return response.json();
        })
        .then(data => {

            displayUserAccounts(data.users);
            notificationsBar.innerHTML = `<span class="material-symbols-outlined" id="checkcircle">check_circle</span>User Role Updated`;
            setTimeout(function() {
                notificationsBar.classList.add('visible');
        
                setTimeout(function() {
                    notificationsBar.classList.remove('visible');
                }, 2000);
            }, 1000);
            console.log(data);
        })
        .catch(error => {

            notificationsBar.innerHTML = `<span class="material-symbols-outlined circle">error</span>An error occured, Try again`;
            setTimeout(function() {
                notificationsBar.classList.add('visible');
        
                setTimeout(function() {
                    notificationsBar.classList.remove('visible');
                }, 2000);
            }, 1000);

            console.error('There was a problem sending the message:', error);
        });

}



/*
deleteUserBtns.forEach(button => {
    button.addEventListener('click', function(){

        const userId = this.parentNode.previousElementSibling.dataset.blogId;

        fetch(`https://mybrand-olivier-production.up.railway.app/api/auth/users/${userId}`, {
        method: 'delete',
        headers: {
            'Authorization': `Bearer ${tokenCookie}`,
            'content-Type' : 'application/json'
        }
        })
        .then(response => {
            console.log(response);
        })
        .catch(error => {

            notificationsBar.innerHTML = `<span class="material-symbols-outlined circle">error</span>An error occured, Try again`;
            setTimeout(function() {
                notificationsBar.classList.add('visible');
        
                setTimeout(function() {
                    notificationsBar.classList.remove('visible');
                }, 2000);
            }, 1000);

            console.error('There was a problem sending the message:', error);
        });

    })
}) */


















/*import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, getDocs, doc, deleteDoc, updateDoc, query, where } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDkU4etxLr4_YDy1nxsIliilDe6sVxPEaU",
    authDomain: "mybrand-login.firebaseapp.com",
    projectId: "mybrand-login",
    storageBucket: "mybrand-login.appspot.com",
    messagingSenderId: "789592444381",
    appId: "1:789592444381:web:749ddd1b55ebbf24c97a34"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp); // Initialize Firestore*/

// Function to display user accounts
/*function displayUserAccounts(users) {
    const userListDiv = document.getElementById('userList');
    userListDiv.innerHTML = ''; // Clear previous content

    users.forEach(user => {
        const userDiv = document.createElement('div');
        userDiv.innerHTML = `
            <p>Email: ${user.email}</p>
            <p>Role: <span class="userRole">${user.role}</span></p>
            <div><button class="deleteUserBtn">Delete</button>
            <button class="changeUserRoleBtn">Change Role</button>
            </div>
        `;
        userListDiv.appendChild(userDiv);
    });
}*/

/*
// Function to retrieve user accounts from Firestore
async function getUserAccounts() {
    try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const users = [];
        querySnapshot.forEach(doc => {
            users.push({
                id: doc.id,
                ...doc.data()
            });
        });
        displayUserAccounts(users);
    } catch (error) {
        console.error('Error getting user accounts: ', error);
    }
}*/

/*
// Function to delete a user
async function deleteUser(userEmail) {
    try {
        // Query Firestore to find the user document based on email
        const querySnapshot = await getDocs(query(collection(db, 'users'), where('email', '==', userEmail)));

        // Iterate over the query snapshot and delete each document found
        querySnapshot.forEach(async doc => {
            await deleteDoc(doc.ref);
            // console.log(`User with email ${userEmail} successfully deleted`);
        });

        // Refresh user list after deletion
        getUserAccounts();
    } catch (error) {
        // console.error('Error deleting user: ', error);
    }
}*/

/*
// Function to change user role
async function changeUserRole(userEmail, newRole) {
    try {
        // Query Firestore to find the user document based on email
        const querySnapshot = await getDocs(query(collection(db, 'users'), where('email', '==', userEmail)));

        // Iterate over the query snapshot and update each document found
        querySnapshot.forEach(async doc => {
            await updateDoc(doc.ref, { role: newRole });
            console.log(`Role of user with email ${userEmail} successfully updated to ${newRole}`);
        });

        // Refresh user list after role change
        getUserAccounts();
    } catch (error) {
        console.error('Error updating user role: ', error);
    }
}
*/

/*
// Call the function to get user accounts when the page loads
getUserAccounts();


document.addEventListener('click', async function(event) {
    const target = event.target;

    // If the clicked element is a delete button
    if (target.classList.contains('deleteUserBtn')) {
        const userEmail = target.closest('div').previousElementSibling.previousElementSibling.textContent.split('Email: ')[1].trim();
        console.log(userEmail);
        await deleteUser(userEmail);
    }

    // If the clicked element is a change role button
    if (target.classList.contains('changeUserRoleBtn')) {
        // Find the closest container div
    const containerDiv = target.closest('div').parentElement;
    
    // Find the userRole element within the container div
    const userRoleElement = containerDiv.querySelector('.userRole');
    
    // Get the text content of the userRole element
    const userRoleContent = userRoleElement.textContent;
    
    // Determine the new role
    const newRole = userRoleContent === 'admin' ? 'user' : 'admin';
    
    // Extract the userEmail from the previous <p> element
    const userEmail = containerDiv.querySelector('p').textContent.split('Email: ')[1].trim();
    console.log(userEmail);
    
    // Call the changeUserRole function
    await changeUserRole(userEmail, newRole);
    
    // Update the user role displayed in the DOM
    userRoleElement.textContent = newRole;
    }
});*/