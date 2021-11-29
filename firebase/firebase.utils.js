import * as firebase from "firebase";
import * as Google from "expo-google-app-auth";

const firebaseIosId =
  "461324762076-mgsola0j0tmq3tnu2etpqld371utc2a9.apps.googleusercontent.com";
const firebaseAndroidId =
  "461324762076-7kusf48k42uthi0u942cdknn4kt1ujl6.apps.googleusercontent.com";
const firebaseConfig = {
  apiKey: "AIzaSyBvIZYpb4o9dab14-SXKnvoYuc34IwfkGE",
  authDomain: "safehouse-329900.firebaseapp.com",
  projectId: "safehouse-329900",
  storageBucket: "safehouse-329900.appspot.com",
  messagingSenderId: "461324762076",
  appId: "1:461324762076:web:b445c82af3b3d901692d19",
  measurementId: "G-W9PMCDRTDV",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export default firebase;

export const onSignOut = () => auth.signOut();

// export const onSignOut = () => {
//   auth
//     .signOut()
//     .then(() => {
//       navigation.replace("Login");
//     })
//     .catch((error) => alert(error.message));
// };

export const onSignIn = async ({ googleUser, setUser }) => {
  // We need to register an Observer on Firebase Auth to make sure auth is initialized.
  const isUserEqual = (userLoggingIn, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === userLoggingIn.user.id
        ) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  };

  var unsubscribe = firebase.auth().onAuthStateChanged(function (firebaseUser) {
    unsubscribe();
    // Check if we are already signed-in Firebase with the correct user.
    if (!isUserEqual(googleUser, firebaseUser)) {
      // Build Firebase credential with the Google ID token.
      var credential = firebase.auth.GoogleAuthProvider.credential(
        googleUser.idToken,
        googleUser.accessToken
      );

      // Sign in with credential from the Google user.
      firebase
        .auth()
        .signInWithCredential(credential)
        .then(async function (result) {
          const { uid } = result.user;

          const { isNewUser } = result.additionalUserInfo;

          if (isNewUser) {
            // Create New User in database here
            const userRef = firestore.doc(`users/${uid}`);
            await userRef.set({
              gmail: result.user.email,
              profile_picture: result.additionalUserInfo.profile.picture,
              first_name: result.additionalUserInfo.profile.given_name,
              last_name: result.additionalUserInfo.profile.family_name,
              last_logged_in: Date.now(),
              created_at: Date.now(),
              home_location: {
                latitude: 0,
                longitude: 0,
              },
              task_list: [],
            });
          } else {
            // Receive user info and transactions and update last logged in
            const userRef = firestore.doc(`users/${uid}`);
            await userRef.update({
              last_logged_in: Date.now(),
            });
          }
          setUser(result.user);
        })
        .catch(function (error) {
          // Handle Errors here.
          console.error(error);
        });
    } else {
      onSignOut();
      alert("It seems like you were already logged in... Please try again!");
    }
  });
};

export const signInWithGoogle = async ({ setUser }) => {
  const googleUser = await Google.logInAsync({
    iosClientId: firebaseIosId,
    androidClientId: firebaseAndroidId,
    scopes: ["profile", "email"],
  });
  if (googleUser.type === "success") {
    await onSignIn({ googleUser, setUser });
  } else {
    alert("I am sorry, we couldn't verify your login. Please try again.");
  }
};
