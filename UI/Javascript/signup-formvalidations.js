import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

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

// onAuthStateChanged(auth, (user) =>{

//     console.log(user);
//     if(user) {
//         console.log("we in");
//         // window.location.href = "../pages/login.html";
//     } else{
//         console.log("we out");
//     }

// });


let myForm = document.getElementById('myForm');
let notificationsBar = document.getElementById('notis');
// let erroricon = document.getElementsByClassName('circle');

let emailValidated = false;
let passwordValidated = false;
let retypePasswordValidated = false;


myForm.addEventListener('submit', async function(event){
    event.preventDefault();
    let emailValue = document.getElementById('email').value;
    let passwordValue = document.getElementById('password').value;
    let passwordRetypeValue = document.getElementById('retypepassword').value;
    
    validatePassword(passwordValue, passwordRetypeValue);
    validateEmail(emailValue);
    let valid = checkFormValidity();
    // console.log(valid);
    // console.log(emailValidated);


    if(valid === 1){

        const userCredentials = {
            email: emailValue,
            password: passwordValue
        };

        fetch('https://mybrand-olivier-production.up.railway.app/api/auth/signup', {
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

            if(data.status === 'failed'){

                notificationsBar.innerHTML = `<span class="material-symbols-outlined circle">error</span>Provide valid email`;
                setTimeout(function() {
                    notificationsBar.classList.add('visible');
            
                    setTimeout(function() {
                        notificationsBar.classList.remove('visible');
                    }, 2000);
                }, 1000); 

            } else if(data.error === 'Email already exists'){

                notificationsBar.innerHTML = `<span class="material-symbols-outlined circle error">error</span>Email already exists`;
                setTimeout(function() {
                    notificationsBar.classList.add('visible');
            
                    setTimeout(function() {
                        notificationsBar.classList.remove('visible');
                    }, 2000);
                }, 1000);

            } else if(data.user.email === emailValue){

                document.getElementById('email').value = '';
                document.getElementById('password').value = '';
                document.getElementById('retypepassword').value = '';


                notificationsBar.innerHTML = `<span class="material-symbols-outlined cirle" id="checkcircle">check_circle</span>Account Created`;
                setTimeout(function() {
                    notificationsBar.classList.add('visible');
            
                    setTimeout(function() {
                        notificationsBar.classList.remove('visible');
                    }, 2000);
                }, 1000);
                }
                window.location.href = "../pages/login.html";
            console.log('Message sent:', data);
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

    
    /*if(valid === 1){
        try{
            const userCredential = await createUserWithEmailAndPassword(
             auth,
             emailValue,
             passwordValue
            );

            // Add user data to Firestore
            await setDoc(doc(db, "users", userCredential.user.uid), {
                email: emailValue,
                role: "user"
                // You can add more user data here if needed
            });
            // console.log(userCredential);
            
            notificationsBar.innerHTML = `<span class="material-symbols-outlined cirle" id="checkcircle">check_circle</span>Account Created`;

    
            setTimeout(function() {
            notificationsBar.classList.add('visible');

                setTimeout(function() {
                    notificationsBar.classList.remove('visible');
                    // Redirect after notification is displayed
                    window.location.href = "../pages/login.html";
                }, 1500);
            }, 500);

     
         } catch(error){
            // console.log(error.code);
             if(error.code == "auth/email-already-in-use"){
                // console.log('got it');
                // notificationsBar.classList.add('error');
                notificationsBar.innerHTML = `<span class="material-symbols-outlined circle">error</span>Email already exists`;

                setTimeout(function() {
                    notificationsBar.classList.add('visible');
            
                    setTimeout(function() {
                        notificationsBar.classList.remove('visible');
                    }, 2000);
                }, 1000);
             } else{
                notificationsBar.innerHTML = `<span class="material-symbols-outlined circle">error</span>Error occured, Try again`;

                setTimeout(function() {
                    notificationsBar.classList.add('visible');
            
                    setTimeout(function() {
                        notificationsBar.classList.remove('visible');
                    }, 2000);
                }, 1000);
             }
         }
    }*/

})


//function to validate the email input
function validateEmail(email){
    let emailLabel = document.getElementById('emaillabel');
    let emailPlaceholder = document.getElementById('emailplaceholder');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailRegex.test(email)){
        emailLabel.style.borderBottomColor = '#c80202';
        emailPlaceholder.style.color = '#c80202';
        emailPlaceholder.innerText = 'Please enter a valid email';
    } else{
        emailLabel.style.borderBottomColor = '#02c837';
        emailPlaceholder.style.color = '#02c837';
        emailPlaceholder.innerText = 'Email';
        emailValidated = true;
    }

}


//function to validate the password input
function validatePassword(password, passwordRetype){
    let passwordLabel = document.getElementById('passwordlabel');
    let passwordPlaceholder = document.getElementById('passwordplaceholder');
    
    let retypepasswordLabel = document.getElementById('retypepasswordlabel');
    let retypepasswordPlaceholder = document.getElementById('retypepasswordplaceholder');

    if(password.length < 6){
        passwordLabel.style.borderBottomColor = '#c80202';
        passwordPlaceholder.style.color = '#c80202';
        passwordPlaceholder.innerText = 'Password must be at least 6 characters';

    } else{
        passwordLabel.style.borderBottomColor = '#02c837';
        passwordPlaceholder.style.color = '#02c837';
        passwordPlaceholder.innerText = 'Password';
        passwordValidated = true;
    }

    if(password !== passwordRetype || passwordRetype == '' || passwordValidated == false) {
        retypepasswordLabel.style.borderBottomColor = '#c80202';
        retypepasswordPlaceholder.style.color = '#c80202';
        retypepasswordPlaceholder.innerText = 'Password does not match';
    } else{
        retypepasswordLabel.style.borderBottomColor = '#02c837';
        retypepasswordPlaceholder.style.color = '#02c837';
        retypepasswordPlaceholder.innerText = 'Confirm Password';
        retypePasswordValidated = true;
    }


}


//function to check whether everything has been validated
function checkFormValidity() {
    if(emailValidated && passwordValidated && retypePasswordValidated){
        document.getElementById('emaillabel').style.borderBottomColor = '#fff';
        document.getElementById('passwordlabel').style.borderBottomColor = '#fff';
        document.getElementById('retypepasswordlabel').style.borderBottomColor = '#fff';
        document.getElementById('emailplaceholder').style.color = '#fff';
        document.getElementById('passwordplaceholder').style.color = '#fff';
        document.getElementById('retypepasswordplaceholder').style.color = '#fff';

        //Set back the validate values to false after a user have sent his message

        emailValidated = false;
        passwordValidated = false;
        retypePasswordValidated = false;

        return 1;

    }  

}