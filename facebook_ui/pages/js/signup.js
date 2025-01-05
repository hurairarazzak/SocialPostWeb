// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import {
  getDatabase,
  ref,
  push,
  set,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6_gojKMV6VcPpC7rN56Pnv5tzS_62rXM",
  authDomain: "facebook-ui-task.firebaseapp.com",
  databaseURL: "https://facebook-ui-task-default-rtdb.firebaseio.com",
  projectId: "facebook-ui-task",
  storageBucket: "facebook-ui-task.firebasestorage.app",
  messagingSenderId: "198227687229",
  appId: "1:198227687229:web:8531eac55bc0f6d432b754",
  measurementId: "G-8Q1PV6DCC0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase();
const auth = getAuth();

var userName = document.getElementById("UserName");
var email = document.getElementById("email");
var password = document.getElementById("password");

window.signupUser = function () {
    var obj = {
        userName: userName.value,
        email: email.value,
        password: password.value,
    };

    // console.log(obj);

    createUserWithEmailAndPassword(auth, obj.email, obj.password)
    .then(function (res) {
        // console.log("User signed up:", res);
        obj.id = res.user.uid;

        var reference = ref(db, `users/${obj.id}`);
        set(reference, obj)
        .then(function () {
            // console.log("User data stored in database.");

            userName.value = "";
            email.value = "";
            password.value = "";

            window.location.href = "../../uploadPost.html";
        })
        .catch(function (dbErr) {
            // console.error("Error storing user data in database:", dbErr);
        });
    })
    .catch(function (err) {
        alert("Error creating user: " + err.message);
    });
};
