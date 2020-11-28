import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const defaulftLoggingFramework = () => {
    if(firebase.apps.length === 0)
        firebase.initializeApp(firebaseConfig);
}

export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
    .then( res => {
      const {email, photoURL, displayName} = res.user;
      const signedInUser = {
        isSignedIn : true,
        name : displayName,
        email: email,
        photo : photoURL
      }
      storeUserToken();
      return signedInUser;
    })
    .catch(err => {
      console.log(err);
      console.log(err.message);
    });
}


const storeUserToken = () => {
  firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
    sessionStorage.setItem('token', idToken);
  }).catch(function(error) {
    // Handle error
  });
} 


export const handleFbSignIn = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(fbProvider)
    .then(res => {
        return console.log(res);
    })
    .catch(err => {
      console.log(err.message);
    })
}

export const handleSignOut = () => {
    return firebase.auth().signOut()
    .then(res => {
      const signedOutUser = {
        isSignedIn : false,
        name: '',
        email: '',
        photo: ''
      }
      return signedOutUser;
    })
    .catch(err => {
      prompt(err.message);
    })
  }

export const createUserWithEmailAndPassword = (name, email, pass) => {
    return firebase.auth().createUserWithEmailAndPassword(email, pass)
      .then(res => {
        const newUserInfo = res.user;
        newUserInfo.error = '';
        newUserInfo.success = true;
        updateUserInfo(name);
        return newUserInfo;
      })
      .catch(err => {
        const newUserInfo = {};
        newUserInfo.error = err.message;
        newUserInfo.success = false;
        return newUserInfo;
      })
}

export const signInWithEmailAndPassword = (email, pass) => {
    return firebase.auth().signInWithEmailAndPassword(email, pass)
      .then(res => {
        const newUserInfo = res.user;
        newUserInfo.error = '';
        newUserInfo.success = true;
        return newUserInfo
      }).catch(err => {
        const newUserInfo = {};
        newUserInfo.error = err.message;
        newUserInfo.success = false;
        return newUserInfo;
      })
}

const updateUserInfo = name => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name,
    }).then(
      console.log('user updated successfully!!!')
    ).catch(err => {
      console.log('not updated');
    });
}
    
