// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyD396svETS-vPYdPkPQp6EsNljVp2Zosp4",
    authDomain: "tutorial-vuejs-881fa.firebaseapp.com",
    projectId: "tutorial-vuejs-881fa",
    storageBucket: "tutorial-vuejs-881fa.appspot.com",
    messagingSenderId: "1068445539894",
    appId: "1:1068445539894:web:157d278cdb7aa2f54ec297"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const kelasRef = database.ref('kelas')