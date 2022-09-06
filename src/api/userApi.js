
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import {db, googleAuthProvider, firebase} from '../db/firebase.js'
const collectionUser = 'users'
//const storage = AsyncStorage()


export const getUsersByOneParameter = async (parameter, value) => {
    var users = null;
    await db.collection(collectionUser).where(parameter, "==", value)
    .get()
    .then((querySnapshot) => {
      users = extractUsers(querySnapshot)
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
    return users;
}

function extractUsers(docs) {
    var users = [];
    docs.forEach((doc) => {
      var user = {
        id: doc.id,
        fullName: doc.data().fullName,
        userName: doc.data().userName,
        password: doc.data().password,
        email: doc.data().email,
        photo: doc.data().photo,
        state: doc.data().state,
        userType: doc.data().userType
      }
      users.push(user);
    });
    return users;
}

export const saveUser = async (fullName, userName, password, email, photo, state, userType) => {
    var flag = false;
    await db.collection(collectionUser).add({
      fullName: fullName,
      userName: userName,
      password: password,
      email: email,
      photo: photo,
      state: state,
      userType: userType
    })
    .then((docRef) => {
      AsyncStorage.setItem('id', docRef.id);
      flag = true;
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
    return flag;
  }