import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"

const config = {
  apiKey: "AIzaSyBoA0tq_1qp0X73QMtR3cWJrHOygAWVJr8",
  authDomain: "lights-on-leyden.firebaseapp.com",
  databaseURL: "https://lights-on-leyden.firebaseio.com",
  projectId: "lights-on-leyden",
  storageBucket: "lights-on-leyden.appspot.com",
  messagingSenderId: "361792879145",
  appId: "1:361792879145:web:19e42f2a4550424c493a38"
};

firebase.initializeApp(config)

export const db = firebase.firestore()

export const auth = () => firebase.auth()

export const mode = "real"
