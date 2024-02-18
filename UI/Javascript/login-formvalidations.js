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

myForm.addEventListener('submit', async function(event){
    event.preventDefault();
    // console.log('hello')
    let emailValue = document.getElementById('emaillogin').value;
    let passwordValue = document.getElementById('password').value;
    
    // validateEmail(emailValue);
    let valid = validateEmail(emailValue);

    if(valid === 1){
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                emailValue,
                passwordValue
            );
    
            // Get user's role from Firestore
            const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                const userRole = userData.role;
    
                if (userRole === 'admin') {
                    // Redirect admin to admin dashboard
                    window.location.href = "adminpage.html";
                    
                } else {
                    // Redirect regular user to user dashboard
                    window.location.href = "blogs.html";
                }
            } else {
                console.log("User data not found.");
            }
        } catch(error) {
            // Handle login errors

            notificationsBar.innerHTML = `<span class="material-symbols-outlined circle">error</span>Invalid Credentials`;

            setTimeout(function() {
                notificationsBar.classList.add('visible');
        
                setTimeout(function() {
                    notificationsBar.classList.remove('visible');
                }, 2000);
            }, 1000);
        }
    }

})


function validateEmail(email){
    let emailLabel = document.getElementById('emaillabel');
    let emailPlaceholder = document.getElementById('emailplaceholder');

    let atPosition = email.indexOf('@');
    let dotPosition = email.lastIndexOf('.');

    if(atPosition < 1 || dotPosition < atPosition + 2 || dotPosition + 2 >= email.length){
        emailLabel.style.borderBottomColor = '#c80202';
        emailPlaceholder.style.color = '#c80202';
        emailPlaceholder.innerText = 'Please enter a valid email';
    } else{
        emailLabel.style.borderBottomColor = '#fff';
        // emailPlaceholder.style.color = '#02c837';
        emailPlaceholder.innerText = 'Email';
        emailValidated = true;
        // checkFormValidity();   
        return 1;
    }

}

// function checkFormValidity(){
//     if(emailValidated){
//         // window.location.href = 'adminpage.html';
//     }
// }