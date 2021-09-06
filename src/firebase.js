import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCeAX8sSKDsC29pjJ38kIyi66aRaRfXfkA",
    authDomain: "photogram-7f69e.firebaseapp.com",
    projectId: "photogram-7f69e",
    storageBucket: "photogram-7f69e.appspot.com",
    messagingSenderId: "772710832936",
    appId: "1:772710832936:web:ecf1335d207bb75c67ce1d"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();
  
  const provider = new firebase.auth.GoogleAuthProvider()
  
  export { auth, provider}
