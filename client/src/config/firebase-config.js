import firebase from 'firebase/app';
import 'firebase/storage';

var config = {
  apiKey: 'AIzaSyC8xEqslyUg5pa_vcs-me35U1Dfb2K7pFc',
  authDomain: 'recipgeek.firebaseapp.com',
  databaseURL: 'https://recipgeek.firebaseio.com',
  projectId: 'recipgeek',
  storageBucket: 'recipgeek.appspot.com',
  messagingSenderId: '784527259867',
  appId: '1:784527259867:web:e07ace4713a292ab5574fe'
};

firebase.initializeApp(config);

var storage = firebase.storage();

export { storage, firebase as default };
