// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import {
  getDatabase,
  ref,
  push,
  set,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
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

var userName = document.getElementById("userName");
var userUrl = document.getElementById("userUrl");
var postUrl = document.getElementById("postUrl");
var description = document.getElementById("description");

window.createPost = function () {
  var obj = {
    userName: userName.value,
    userUrl: userUrl.value,
    postUrl: postUrl.value,
    description: description.value,
  };

  obj.id = push(ref(db, "post")).key;

  var reference = ref(db, `post/${obj.id}`);
  set(reference, obj)
    .then(function () {
      // console.log("Data Send Succefully");
      window.location.href = "./pages/feed.html";
    })
    .catch(function (err) {
      // console.log(err, "Error");
    });
};
