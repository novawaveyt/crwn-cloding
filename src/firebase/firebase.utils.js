import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyD_NFyEl_cyLqPLrpBKRuIzTHe2yvwOXSE",
    authDomain: "train-crwn-db.firebaseapp.com",
    databaseURL: "https://train-crwn-db.firebaseio.com",
    projectId: "train-crwn-db",
    storageBucket: "train-crwn-db.appspot.com",
    messagingSenderId: "243912609322",
    appId: "1:243912609322:web:9bebdfbc98da19f4bb3d53",
    measurementId: "G-JJC5Y3H0SY"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
      if (!userAuth) return;

        const userRef = firestore.doc(`users/${userAuth.id}`);

        const snapShot = await userRef.get();

        if (!snapShot.exists) {
            const { displayName,email } = userAuth;
            const createdAt = new Date();

            try {
                await userRef.set({
                    displayName,
                    email,
                    createdAt,
                    ...additionalData
                })
            } catch(error) {
                console.log('error creating user',error.message);
            }
        }
        return userRef;
  }
  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  export const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;

  
