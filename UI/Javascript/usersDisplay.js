import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, getDocs, doc, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

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
const db = getFirestore(firebaseApp); // Initialize Firestore

// Function to display user accounts
function displayUserAccounts(users) {
    const userListDiv = document.getElementById('userList');
    userListDiv.innerHTML = ''; // Clear previous content

    users.forEach(user => {
        const userDiv = document.createElement('div');
        userDiv.innerHTML = `
            <p>Email: ${user.email}</p>
            <p>Role: ${user.role}</p>
            <div><button class="deleteUserBtn">Delete</button>
            <button class="changeUserRoleBtn">Change Role</button>
            </div>
        `;
        userListDiv.appendChild(userDiv);
    });
}

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
}

// Function to delete a user
async function deleteUser(userId) {
    try {
        await deleteDoc(doc(db, 'users', userId));
        console.log('User successfully deleted');
        getUserAccounts(); // Refresh user list
    } catch (error) {
        console.error('Error deleting user: ', error);
    }
}

// Function to change user role
async function changeUserRole(userId, newRole) {
    try {
        await updateDoc(doc(db, 'users', userId), { role: newRole });
        console.log('User role successfully updated');
        getUserAccounts(); // Refresh user list
    } catch (error) {
        console.error('Error updating user role: ', error);
    }
}

// Call the function to get user accounts when the page loads
getUserAccounts();