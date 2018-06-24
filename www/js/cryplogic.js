$(document).ready(function() {

  var token;
  //this will check to see if a user has gone over their limit, otherwise it will let them save/edit invoice
  $(document).on("click", "#new-invoice-submit", function(event){
    
  })

  //this function will hook into the apple pay protocol
  $(document).on('click', '#upgrade-button', function () {
    alert('info for upgrading your plan');
  });

  //this needs to be fine tuned- requests seem to work in postman but not in localhost. Do I need permissions?
  $(document).on('click', '.signup-page-signup-button', function(event) {
    event.preventDefault();
    let email = $('#sign-up-email').val();
    fetch('https://api.invoicehome.com/api/v1/guest/', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '
      },
      method : 'POST',
      body: JSON.stringify({"user": {"email": `${email}`}})
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .then(moreData => {
        sessionStorage.setItem('token', moreData.token);
        console.log(`this is the token: ${moreData.token}`);
        console.log(`this is the sessions storage: ${sessionStorage.getItem('token')}`)
      })
      .catch(err => console.error(err));
  });

  //login logic
  $(document).on('click', '#login-button', function(event){
    event.preventDefault();
    let email = $('#login-email').val();
    let password = $('#login-password').val();
    fetch('https://api.invoicehome.com/api/v1/signin', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer: eyJhbGciOiJIUzI1NiJ9.eyJhbm9ueW1vdXNfaWQiOiI0OGRlY2VlZmY1MWZhMjQwYmRlZDg1Y2Q3ZGRjNzQxNSIsImlhdCI6MTUyOTc3NDc3MCwiZXhwIjoxNTI5Nzc4MzcwLCJpc3MiOiJUaGlzIGlzIGEgV2lraWxhbmUncyBJbnZvaWNlIEhvbWUgbW9iaWxlIGFwcGxpY2F0aW9uIHJ1bm5pbmcgYXQgaHR0cHM6Ly9pbnZvaWNlaG9tZS5jb20vIn0.eIZulU6fYxGmg1iSRMB28FbTv5mAO_7vMSvLSdjJ6dM'
      },
      method: 'POST',
      body: JSON.stringify(
        {'user': {
          'email': email,
          'password': password
      }})
    })
    .then(response => {
      if (!response.ok) {
        return Promise.reject(response.statusText);
      } return response.json();
    })
    .then(someData => someData.json())
    .then(data => console.log(data));
  })
});
