
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider} from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBNnY97RSs9dvcd1nCJcXxSLZDNsA8n-PM",
    authDomain: "sec7-d4c87.firebaseapp.com",
    projectId: "sec7-d4c87",
    storageBucket: "sec7-d4c87.appspot.com",
    messagingSenderId: "1055032666879",
    appId: "1:1055032666879:web:5396d67bd3db63d5f47aca"
  };

  const app = initializeApp(firebaseConfig);

  const auth = getAuth(app);

  const provider = new GoogleAuthProvider();

export { auth, provider}; 