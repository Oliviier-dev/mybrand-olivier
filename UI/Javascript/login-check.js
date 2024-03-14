import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', function() {

/*
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
const db = getFirestore(firebaseApp);*/

let loginoutButtons = document.querySelectorAll('.loginout-btn');
let homeorAdminLink = document.querySelectorAll('.homeOrAdmin');
// console.log(homeorAdminLink);
// console.log(loginoutButtons);


// Track authentication state changes
/*onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in.
        // console.log("User is signed in:", user);
        // You can access user information like user.uid, user.email, etc.
        const userRef = doc(db, 'users', user.uid);
        getDoc(userRef).then((docSnapshot) => {
            if (docSnapshot.exists()) {
                const userData = docSnapshot.data();
                const userRole = userData.role;
                
                // changing the home button to the admin dashboard page
                if(userData.role == 'admin'){
                    for (let i = 0; i < homeorAdminLink.length; i++) {
                        let anchorTag = homeorAdminLink[i].querySelector('a');
                        anchorTag.innerHTML = 'Admin';
                        // anchor.setAttribute('href', 'UI/pages/adminpage.html');
                        if (window.location.href.includes("index.html")) {
                            anchorTag.href = "UI/pages/adminpage.html";
                        } else {
                            anchorTag.href = "adminpage.html";
                        }
                    }
                }
               
            } else {
                console.error("User data not found");
            }
        }).catch((error) => {
            console.error("Error fetching user data:", error);
        });

        for (let i = 0; i < loginoutButtons.length; i++) {
            let anchorTag = loginoutButtons[i].querySelector('a');
            anchorTag.innerHTML = 'Log out';
            anchorTag.style.backgroundColor = '#980C0C';

            loginoutButtons[i].addEventListener('click', function(){
                signOut(auth).then(() => {

                    //Sign-out successful.
                    // console.log("User signed out successfully.");
                    if (window.location.href.includes("index.html")) {
                        window.location.href = "index.html";
                    } else{
                        window.location.href = "../../index.html";
                    }

                    

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
            if (window.location.href.includes("index.html")) {
                anchorTag.href = "UI/pages/login.html";
            } else {
                anchorTag.href = "login.html";
            }
        }
        // console.log("No user is signed in.");
    }
});*/



(function loginCheck() {
    function getCookie(name) {
        const cookieString = document.cookie;
        const cookies = cookieString.split('; ');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i];
            const [cookieName, cookieValue] = cookie.split('=');
            if (cookieName === name) {
                return decodeURIComponent(cookieValue);
            }
        }
        return null;
    }

    var tokenCookie = getCookie('jwt');

    if (tokenCookie) {
        // Decode the JWT token payload
        var parts = tokenCookie.split('.');
        var payload = parts[1];
        var decodedPayload = JSON.parse(atob(payload));
        console.log("Decoded Payload:", decodedPayload.role);

        if (decodedPayload.role === 'admin') {
            // Change home button to admin dashboard link
            for (let i = 0; i < homeorAdminLink.length; i++) {
                let anchorTag = homeorAdminLink[i].querySelector('a');
                anchorTag.innerHTML = 'Admin';
                if (window.location.href.includes("index.html")) {
                    anchorTag.href = "UI/pages/adminpage.html";
                } else {
                    anchorTag.href = "adminpage.html";
                }
            }
        }

        // Set logout functionality
        for (let i = 0; i < loginoutButtons.length; i++) {
            let anchorTag = loginoutButtons[i].querySelector('a');
            anchorTag.innerHTML = 'Log out';
            anchorTag.style.backgroundColor = '#980C0C';

            loginoutButtons[i].addEventListener('click', function () {
                // Clear the token cookie
                document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                // Redirect to appropriate page after logout
                if (window.location.href.includes("index.html")) {
                    window.location.href = "index.html";
                } else {
                    window.location.href = "../../index.html";
                }
            });
        }
    } else {
        // No user is signed in
        for (let i = 0; i < loginoutButtons.length; i++) {
            let anchorTag = loginoutButtons[i].querySelector('a');
            anchorTag.innerHTML = 'Log in';
            anchorTag.style.backgroundColor = '#1840CF';
            if (window.location.href.includes("index.html")) {
                anchorTag.href = "UI/pages/login.html";
            } else {
                anchorTag.href = "login.html";
            }
        }
    }
})();


});