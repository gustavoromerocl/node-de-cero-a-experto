const myForm = document.querySelector('form')

console.log(window.location.hostname.includes('localhost'))

var url = (window.location.hostname.includes('localhost'))
  ? 'http://localhost:8080/api/auth/'
  : 'https://restserver-curso-fher.herokuapp.com/api/auth/';

myForm.addEventListener('submit', ev => {
  ev.preventDefault()
  const formData = {}

  for (let el of myForm.elements) {
    console.log(myForm.elements)
    if (el.name.length > 0)
      console.log(el.name, el.value)
      formData[el.name] = el.value
  }
  console.log(formData)
  fetch(url + 'login', {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: { 'Content-Type': 'application/json' }
  })
    .then(res => res.json())
    .then(({token}) => {
      localStorage.setItem('token', token)
      window.location = 'chat.html'
    })
    .catch(err => {
      console.log(err)
    })
})


function onSignIn(googleUser) {

  // var profile = googleUser.getBasicProfile();
  // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  // console.log('Name: ' + profile.getName());
  // console.log('Image URL: ' + profile.getImageUrl());
  // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

  var id_token = googleUser.getAuthResponse().id_token;
  const data = { id_token };

  fetch(url + 'google', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
    .then(resp => resp.json())
    .then(({ token }) => {
      localStorage.setItem('token', token)
    })
    .catch(console.log);

}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}