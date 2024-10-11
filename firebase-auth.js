import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    sendPasswordResetEmail,
    sendEmailVerification,
    signOut
            } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCv0LdbXHcY0UvxGsr4COdinigGa2m95J4",
    authDomain: "fourteen-general-login-page.firebaseapp.com",
    projectId: "fourteen-general-login-page",
    storageBucket: "fourteen-general-login-page.appspot.com",
    messagingSenderId: "489754227982",
    appId: "1:489754227982:web:127e088b8b00525b73d35f"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  
const submitSignUp = document.querySelector('#submitSignUp');
const submitSignIn = document.querySelector('#submitSignIn');
const loginForm = document.getElementById('login-form');
const signForm = document.getElementById('sign-form');
// const subscribeBtn = document.getElementById('subscribeBtn');
let message = "";

onAuthStateChanged(auth, (user) => {
    if (user) {
        // window.location.assign('index.html');
        document.getElementById('login-btn').textContent = 'Sign Out';
    } else {
      // User is signed out
      // ...
      document.getElementById('login-btn').textContent = 'Sign In';
    }
  });

// create thr signIn functio for the user Authentication with email and password
const signUPWithEmailAndPassword = () =>{
    const emailSignUp = document.getElementById('email-sign-up').value;
    const passwordSignUp = document.getElementById('password-sign-up').value;

    // firebase built-in function for authentication
    createUserWithEmailAndPassword(auth,emailSignUp,passwordSignUp)
    .then((userCredentials) => {
      message = "Account created successfully! You can now login."
      userNotification(message);
      EmailVerification();
    })
    .catch((error) => {
        const errorMessage = error.code;
        userNotificationError(errorMessage);
    });
}


// create thr signIn functio for the user Authentication with email and password
const accountSignInWithEmailAndPassword = () =>{
    const emailSignIn = document.getElementById('email-sign-in').value;
    const passwordignIn = document.getElementById('password-sign-in').value;

    // firebase built-in function for authentication
    signInWithEmailAndPassword(auth,emailSignIn,passwordignIn)
    .then((userCredentials) => {
      message = `Account ${userCredentials.user.email} successfully! You can now go to home page.`
      logNotification(message);
    })
    .catch((error) => {
        const errorMessage = error.code;
        LogNotificationError(errorMessage);
    });
}

const passwordChangeFunction = () => {
    const email = document.getElementById('email-sign-in').value;
    const password = document.getElementById('password-sign-in').value;
    // firebase built-in function for password change
    sendPasswordResetEmail(auth, email)
            .then(() => {
                // Password reset email sent!
                logNotification("Password reset email sent");
            })
            .catch((error) => {
                const errorMessage = error.code;
                LogNotificationError(errorMessage)
            });
}
 // sign out function
const signOutFunction = () => {
    signOut(auth)
        .then(() => {
        // Sign-out successful.
        alert('Sign-out successful');
        })
      .catch((error) => {
        // An error happened.
        alert('Error signing out:', error);
      });
};

//  messages to user
const userNotification = (message) => {
    const signUpMessage = document.getElementById('signUpMessage') 
    signUpMessage.style.display = 'block'; 
    signUpMessage.style.color ='green';
    signUpMessage.textContent = `${message}`;
    setTimeout(() => {
        signUpMessage.textContent = '';
        signUpMessage.style.display = 'none';
    }, 3000);
 
}
const logNotification = (message) => {
    const signInMessage = document.getElementById('signInMessage') 
    signInMessage.style.display = 'block'; 
    signInMessage.style.color ='green';
    signInMessage.textContent = `${message}`;
    setTimeout(() => {
        signInMessage.textContent = '';
        signInMessage.style.display = 'none';
    }, 3000);
 
}
const userNotificationError = (message) => {
    const signUpMessage = document.getElementById('signUpMessage') 
    signUpMessage.style.display = 'block'; 
    signUpMessage.style.color ='Red';
    signUpMessage.textContent = `${message}`;
    setTimeout(() => {
        signUpMessage.textContent = '';
        signUpMessage.style.display = 'none';
    }, 3000);
 
}
const LogNotificationError = (message) => {
    const signInMessage = document.getElementById('signInMessage') 
    signInMessage.style.display = 'block'; 
    signInMessage.style.color ='Red';
    signInMessage.textContent = `${message}`;
    setTimeout(() => {
        signInMessage.textContent = '';
        signInMessage.style.display = 'none';
    }, 3000);
 
}

const EmailVerification = () => {
    // Send email verification to the user
    sendEmailVerification(auth.currentUser)
       .then(() => {
            // Email verification sent!
            alert("Email verification sent");
        })
       .catch((error) => {
            // An error happened.
            const errorMessage = error.code;
            alert(errorMessage)
        });
 
}





document.getElementById('recover-password').addEventListener('click', (event) => {
    event.preventDefault();
    passwordChangeFunction();
 });

 document.addEventListener('click', (event) => {
    console.log(event.target.id.textContent)
    if(event.target.id.textContent === 'Sign Out'){
        signOutFunction();
    }
 })
 submitSignUp.addEventListener('click', (event) => {
    event.preventDefault();
     signUPWithEmailAndPassword();
     
     loginForm.reset();
 });
 submitSignIn.addEventListener('click', (event) => {
    event.preventDefault();
    accountSignInWithEmailAndPassword();
    signForm.reset();
 });