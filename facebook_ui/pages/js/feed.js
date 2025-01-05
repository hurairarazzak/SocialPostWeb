// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import {
  getDatabase,
  ref,
  onValue,
  remove,
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

var feedParent = document.getElementById("feedParent");

var feedData = [];

window.DeletePost = function (id) {
  var reference = ref(db, `post/${id}`);
  
  // Remove the post from Firebase
  remove(reference)
    .then(() => {
      var postElement = document.getElementById(`post-${id}`);
      if (postElement) {
        postElement.remove();
      }
      console.log("Post deleted successfully!");
    })
    .catch((error) => {
      console.error("Error deleting post:", error);
    });
};

function renderPost() {
  feedParent.innerHTML = "";
  for (var i = 0; i < feedData.length; i++) {
    var obj = feedData[i];

    feedParent.innerHTML += `
      <div id="post-${obj.id}" class="mb-3 bg-white rounded shadow">
        <div class="p-3 d-flex align-items-center">
          <img width="50px" class="rounded-pill" src="${obj.userUrl}" alt="">
          <div class="p-2">
            <h5 class="mb-0">${obj.userName}</h5>
            <p class="mb-0">just now</p>
          </div>
        </div>
        <div class='p-3'>
          <p>${obj.description}</p>
        </div>
        <img src="${obj.postUrl}" width="100%" alt="">            
        <div class="p-3 d-flex">
          <button class='w-50 btn btn-light'>Like</button>
          <button class='w-50 btn btn-light'>Comment</button>
        </div>
        <div class="p-3 d-flex">
          <button onclick="DeletePost('${obj.id}')" class='w-50 btn btn-danger'>Delete</button>
        </div>
      </div>`;
  }
}

function getFeeds() {
  var reference = ref(db, "post");
  onValue(reference, function (apnaData) {
    // console.log(apnaData.val());
    if (apnaData.val()) {
      feedData = Object.values(apnaData.val());
      renderPost();
    }
  });
}
getFeeds();
