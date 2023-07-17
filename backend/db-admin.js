
const admin = require('firebase-admin');
const firebaseConfig = require('./serviceAccount');

admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
  databaseURL: 'https://restaurent.firebaseio.com',
  storageBucket: 'gs://restaurant-c72af.appspot.com'
});

const db = admin.firestore();
const User = db.collection('users');
const Category = db.collection('category');
const Menu = db.collection('menu');
const Company = db.collection('company');
const generalCategories = db.collection('General Categories');
const generalProducts = db.collection('General Products');

const storage = admin.storage();
const bucket = storage.bucket();

module.exports = {
  User,
  Category,
  Menu,
  Company,
  storage,
  bucket ,
  generalCategories,
  generalProducts
};
