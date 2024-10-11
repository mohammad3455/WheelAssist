// Import Firebase from CDN
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js';
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDaae_2_TPbv4qXuGbsEJqn9rwgv-i2Xvc",
    authDomain: "wheelassist-544f0.firebaseapp.com",
    projectId: "wheelassist-544f0",
    storageBucket: "wheelassist-544f0.appspot.com",
    messagingSenderId: "955396208188",
    appId: "1:955396208188:web:9c386cfdfc0cfda5f93539",
    measurementId: "G-YELRC07LWV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Handle form submission for login
const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default form submission

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        // Sign in with Firebase Authentication
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Get the ID token for the authenticated user immediately after login
        const idToken = await user.getIdToken();

        // Send the ID token to the backend for verification
        const response = await fetch('http://127.0.0.1:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ idToken }) // Send ID token
        });

        const data = await response.json();

        if (data.success) {
            // Login successful, redirect or show success message
            alert(data.message); // Show success message
            // window.location.href = '/dashboard'; // Uncomment to redirect to dashboard
        } else {
            alert(data.message); // Show error message
        }

    } catch (error) {
        console.error('Login error:', error);
        alert('Login error, please try again.');
    }
});
