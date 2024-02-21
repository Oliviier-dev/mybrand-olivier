import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

document.addEventListener('DOMContentLoaded', function() {


// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDkU4etxLr4_YDy1nxsIliilDe6sVxPEaU",
    authDomain: "mybrand-login.firebaseapp.com",
    projectId: "mybrand-login",
    storageBucket: "mybrand-login.appspot.com",
    messagingSenderId: "789592444381",
    appId: "1:789592444381:web:749ddd1b55ebbf24c97a34"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

let loginoutButtons = document.querySelectorAll('.loginout-btn');
// console.log(loginoutButtons);


// Track authentication state changes
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in.
        // console.log("User is signed in:", user);
        // You can access user information like user.uid, user.email, etc.

        for (let i = 0; i < loginoutButtons.length; i++) {
            let anchorTag = loginoutButtons[i].querySelector('a');
            anchorTag.innerHTML = 'Log out';
            anchorTag.style.backgroundColor = '#980C0C';

            loginoutButtons[i].addEventListener('click', function(){
                signOut(auth).then(() => {

                    //Sign-out successful.
                    // console.log("User signed out successfully.");

                    window.location.href = "../../index.html";

                }).catch((error) => {
                    // An error happened.
                    // console.error("Error signing out:", error);
                });
            });

        }

    } else {
        // No user is signed in.
        for (let i = 0; i < loginoutButtons.length; i++) {
            let anchorTag = loginoutButtons[i].querySelector('a');
            anchorTag.innerHTML = 'Log in';
            anchorTag.style.backgroundColor = '#1840CF';
        }
        // console.log("No user is signed in.");
    }
});


});