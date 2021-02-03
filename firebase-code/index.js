
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyCdnzPqGQr6mCHD5o1ORErgSc3bQYMt_lw",
  authDomain: "chat-app-919e0.firebaseapp.com",
  projectId: "chat-app-919e0",
  storageBucket: "chat-app-919e0.appspot.com",
  messagingSenderId: "390580368567",
  appId: "1:390580368567:web:6c9b61b12e6ab937740932",
  measurementId: "G-J7T70LLHJP"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();


if (!localStorage.getItem('name')) {
  user = prompt('What is your name?')
  localStorage.setItem('name', user)
} else {
  user = localStorage.getItem('name')
}
document.querySelector('#name').innerText = user
document.querySelector('#change-name').addEventListener('click', () => {
  user = prompt('What is your name?')
  localStorage.setItem('name', user)
  document.querySelector('#name').innerText = user
})

document.querySelector('#message-form').addEventListener('submit', e => {
  e.preventDefault();
})
document.querySelector('#message-form').addEventListener('submit', e => {
  e.preventDefault();
  let message = document.querySelector('#message-input').value
})

document.querySelector('#message-form').addEventListener('submit', e => {
  e.preventDefault()

  let message = document.querySelector('#message-input').value
  db.collection('messages')
    .add({
      name: user,
      message: message,
      date: firebase.firestore.Timestamp.fromMillis(Date.now())
    })
    .then(docRef => {
      console.log(`Document written with ID: ${docRef.id}`)
      document.querySelector('#message-form').reset()
    })
    .catch(error => {
      console.log(`Error adding document: ${error}`)
    })
})
db.collection('messages')
  .orderBy('date', 'asc')
  .onSnapshot(snapshot => {
    document.querySelector('#messages').innerHTML = ''
    snapshot.forEach(doc => {
      let message = document.createElement('div')
      message.innerHTML = `
		<p class="name">${doc.data().name}</p>
		<p>${doc.data().message}</p>
		`
      document.querySelector('#messages').prepend(message)
    })
  })
document.querySelector('#clear').addEventListener('click', () => {
  db.collection('messages')
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        db.collection('messages').doc(doc.id).delete()
          .then(() => {
            console.log('Document successfully deleted!')
          })
          .catch(error => {
            console.error(`Error removing document: ${error}`)
          })
      })
    })
    .catch(error => {
      console.log(`Error getting documents: ${error}`)
    })
})
