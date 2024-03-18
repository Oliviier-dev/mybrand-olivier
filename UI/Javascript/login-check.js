document.addEventListener('DOMContentLoaded', function() {

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

    // Check if the user is on an admin-only page
    if (window.location.pathname.includes("adminpage.html") || window.location.pathname.includes("createnewblog.html")) {
        // Check if user has admin JWT
        var tokenCookie = getCookie('jwt');
        if (!tokenCookie) {
            window.location.href = "../../index.html"; // Redirect to home page
        } else {
            // Decode the JWT token payload
            var parts = tokenCookie.split('.');
            var payload = parts[1];
            var decodedPayload = JSON.parse(atob(payload));
            console.log("Decoded Payload:", decodedPayload.role);

            if (decodedPayload.role !== 'admin') {
                window.location.href = "../../index.html"; // Redirect to home page
            }
        }
    }
    
    if(window.location.pathname.includes("login.html") || window.location.pathname.includes("signup.html")) {
        // Check if user has admin JWT
        var tokenCookie = getCookie('jwt');
        if (tokenCookie) {
            window.location.href = "../../index.html"; // Redirect to home page
        }
    }



let loginoutButtons = document.querySelectorAll('.loginout-btn');
let homeorAdminLink = document.querySelectorAll('.homeOrAdmin');

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