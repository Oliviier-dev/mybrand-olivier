import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

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
const db = getFirestore(firebaseApp);



let myForm = document.getElementById('myForm');
let notificationsBar = document.getElementById('notis');

let emailValidated = false;
let passwordValidated = false

myForm.addEventListener('submit', async function(event){
    event.preventDefault();
    // console.log('hello')
    let emailValue = document.getElementById('emaillogin').value;
    let passwordValue = document.getElementById('password').value;
    
    // validateEmail(emailValue);
    let valid = validateEmailAndPassword(emailValue, passwordValue);

    const userCredentials = {
        email: emailValue,
        password: passwordValue
    };

    if(emailValidated && passwordValidated){
        fetch('https://mybrand-olivier-production.up.railway.app/api/auth/login', {
            method: 'POST',
            headers: {
                'content-Type' : 'application/json'
            },
            body: JSON.stringify(userCredentials)
        })
        .then(response => {
            if(!response.ok) {

                notificationsBar.innerHTML = `<span class="material-symbols-outlined circle">error</span>An error occured, Try again`;
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

            if(data.error === 'An error occurred while logging in.'){

                notificationsBar.innerHTML = `<span class="material-symbols-outlined circle">error</span>Email not registered`;
                setTimeout(function() {
                    notificationsBar.classList.add('visible');
            
                    setTimeout(function() {
                        notificationsBar.classList.remove('visible');
                    }, 2000);
                }, 1000); 

            } else if(data.status === 'failed'){

                notificationsBar.innerHTML = `<span class="material-symbols-outlined circle">error</span>Enter a valid email`;
                setTimeout(function() {
                    notificationsBar.classList.add('visible');
            
                    setTimeout(function() {
                        notificationsBar.classList.remove('visible');
                    }, 2000);
                }, 1000); 

            } else if(data.error === 'Invalid credentials. Please check your email and password.'){

                notificationsBar.innerHTML = `<span class="material-symbols-outlined circle">error</span>Incorrect password`;
                setTimeout(function() {
                    notificationsBar.classList.add('visible');
            
                    setTimeout(function() {
                        notificationsBar.classList.remove('visible');
                    }, 2000);
                }, 1000); 

            } else{
                var expiresInMilliseconds = 3 * 24 * 60 * 60 * 1000;
                var now = new Date();
                var expires = new Date(now.getTime() + expiresInMilliseconds);
                document.cookie = `jwt=${data.token}; path=/; Max-Age=${expiresInMilliseconds / 1000}; expires=${expires.toUTCString()}`;

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

                // Split the token into its three parts: header, payload, and signature
                var parts = tokenCookie.split('.');
                var header = parts[0];
                var payload = parts[1];
                var signature = parts[2];

                // Decode each part using atob()
                var decodedHeader = JSON.parse(atob(header));
                var decodedPayload = JSON.parse(atob(payload));
                // The signature is not typically decoded as it's used for validation, not for reading

                // Now you have access to the decoded header and payload
                console.log("Decoded Header:", decodedHeader);
                console.log("Decoded Payload:", decodedPayload);

                if(data.user.role == 'admin'){

                    window.location.href = "adminpage.html";

                } else if(data.user.role == 'user'){

                    window.location.href = "blogs.html";

                }

            }
            console.log('Message sent:', data);
        })
        .catch(error => {

            notificationsBar.innerHTML = `<span class="material-symbols-outlined circle">error</span>Error logging in, Try again`;
            setTimeout(function() {
                notificationsBar.classList.add('visible');
        
                setTimeout(function() {
                    notificationsBar.classList.remove('visible');
                }, 2000);
            }, 1000); 

            console.error('There was a problem sending the message:', error);
        });
    }

})


function validateEmailAndPassword(email, password){
    let emailLabel = document.getElementById('emaillabel');
    let emailPlaceholder = document.getElementById('emailplaceholder');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailRegex.test(email)){
        emailLabel.style.borderBottomColor = '#c80202';
        emailPlaceholder.style.color = '#c80202';
        emailPlaceholder.innerText = 'Please enter a valid email';
    } else{
        emailLabel.style.borderBottomColor = '#fff';
        // emailPlaceholder.style.color = '#02c837';
        emailPlaceholder.innerText = 'Email';
        emailValidated = true;
        // checkFormValidity();
    }


    let passwordLabel = document.getElementById('passwordlabel');
    let passwordPlaceholder = document.getElementById('passwordplaceholder');

    if(password.length < 1){
        passwordLabel.style.borderBottomColor = '#c80202';
        passwordPlaceholder.style.color = '#c80202';
        passwordPlaceholder.innerText = 'Password must be provided';
    } else{
        passwordValidated = true;
    }


}

// function checkFormValidity(){
//     if(emailValidated){
//         // window.location.href = 'adminpage.html';
//     }
// }