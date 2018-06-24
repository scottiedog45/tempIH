//This is the main jQuery doc for fetching data from the v1 API. 

//Basically, jQuery event handlers are being added to buttons and pages to initiate fetch requests,
//and the callbacks deal with the response from the API. 

//After the initial function declaration, the file mostly follows these 2 steps:

    // 1. Define any callbacks for the fetched data
    // callbackFunction(fetchedData){
    //   dostuff and update DOM/db
    // }

    // 2. Call the wrapper function to do the fetching with parameters, and call the callback
    // addEventHandlerTo(
    //   a. fetch the data
    //   b. callbackFunctionForFetch
    // )

    // This format avoids excessive code repitition, and easily exposes the parts of the code that 
    // may require updating. I'm happy to change it if something else would be easier! 😎

    //TODO something to check to see if a user has gone over their limit, otherwise it will let them save/edit invoice.
    //Is this an endpoint? 
    //need api permission on server side (for localhost?) to prevent cors errors
    //Restore and set as paid have the same endpoint?


$(document).ready(function() {



  //base API link for v1 of JSON API
  const apiBaseUrl = 'https://api.invoicehome.com/api/v1/'

  //lil helper function to get the session token
  const token = () => {
    return sessionStorage.getItem('token')}
    ;

  //sets the token in local storage
  const setTokenCallback = res => {
    sessionStorage.setItem('token', res.token)
  } 

  //declaring the wrapper function
  const addEventHandlerTo = (child, endpoint, headers, method, cb,data) => {
    $('#app').on('click', child, () => {
      fetch(apiBaseUrl + endpoint, {
        method: method,
        headers: headers, 
        body: JSON.stringify(data)
      })
      .then(response => {
        if (!response.ok) {
          Promise.reject(response.statusText);
        } return response.json();
      })
      .then(res => res.json())
      .then(data => cb(data))
    })
  }

  //ENDPOINTS START HERE

  //UPGRADE PAGE
  const upgradeCb = res => {
    alert('upgrade handled here');
  }

  //this will upgrade stuff here - dummy URL for now
  addEventHandlerTo(
    '#upgrade-button', 
    null,
    {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    null,
    upgradeCb,
    null)

  //get initial guest token, duplicate of below code, just need attach to other button
  addEventHandlerTo(
    '.landing-page-create-button',
    'guest/',
    {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    'POST',
    setTokenCallback,
    null
  )

  const setTokenAndRedirect = res => {
    setTokenCallback(res);
    //code to eredirect windw
  }
  //same as above, just different element
  addEventHandlerTo(
    '.signup-page-signup-button',
    'guest/',
    {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    'POST',
    setTokenAndRedirect,
    {'user': {
      'email': $('#sign-up-email').val()
    }}
  )

  //login logic
  addEventHandlerTo(
    '#login-button',
    'signin',
    {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    'POST',
    someRedirectHere, //TODO redirect
    {'user': {
      'email': $('#login-email').val(),
      'password': $('login-password').val()
    }}
  )
 
  //get templates list, obviously replace url with call for array of invoices
  addEventHandlerTo(
    '#menu-templates-choice',
    URL, //TODO get correct endpoint for array of pdfs
    {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    'GET',
    null, //TODO cb to display templates
    null
  )

  //USER ENDPOINTS
  //Show user, 
  addEventHandlerTo(
    null, //TODO add element to show user data
    'user/',
    {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    'POST',
    null, //TODO add callback if necessary.
    null
  )

  //update user
  addEventHandlerTo(
    null, //TODO get correct child element
    'user/',
    {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    'PATCH',
    null, //TODO ADD CALLBACK
    {"user":{
      //their user dataaaa
    }}
  )

   //Delete user
  addEventHandlerTo(
    null, //TODO get correct child element
    'user/',
    {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    'DELETE',
    null, //TODO add callback
    null
  )

  //authorize.net endpoints
  //create endpoint
  addEventHandlerTo(
    null, //TODO
    'authorize_dot_net/',
    {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    'POST', 
    null,
    {'authorize_dot_net': {
      'api_login_id': something, //TODO this
      'transaction_key': AAAA //TODO this
    }},
  )

  addEventHandlerTo(
    null,
    'authorize_dot_net/',
    {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    'DELETE',
    null,
    null
  )

  //PAYPAL endpoints
  //create endpoint
  addEventHandlerTo(
    null,
    'paypal/\\',
    {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    'POST', 
    null,
    null
  )

  //delete endpoint
  addEventHandlerTo(
    null,
    'paypal/\\',
    {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    'DELETE',
    null,
    null
  )

  //INVOICE endpoints
  //All Invoices
  addEventHandlerTo(
    null,
    'invoices/?q=searchterm',
    {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
      'X-Locale': 'en',
      'X-Time-Zone': 'Europe/Prague'
    },
    'GET',
    null,
    null
  )

  //Paid Invoices
  addEventHandlerTo(
    null,
    'invoices/paid',
    {
      'Authorization': 'Bearer ' + token,
    },
    'GET',
    null,
    null
  )

  //Unpaid invoices
  addEventHandlerTo(
    null,
    'invoices/unpaid',
    {
      'Authorization': 'Bearer ' + token,
    },
    'GET', 
    null,
    null
  )

  //Create invoice
  addEventHandlerTo(
    null,
    'invoices/',
    {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
      'X-Locale': 'en',
      'X-Time-Zone': 'Europe/Prague'
    },
    'POST',
    null,
      {
      "invoice": { //ALL VALUES ARE JUST PLACEHOLDERS UNTIL INPUTS ARE CREATED
        "number": "INV-1",
        "from": "Jiri",
        "billing": "3651 Lindell Rd. Suite D1024",
        "shipping": "3651 Lindell Rd. Suite D1024",
        "po_number": "po1",
        "date_issued": "3/14/2018",
        "due_date": "3/21/2018",
        "footer_1": "Payment is due within 7 days",
        "currency": "USD",
        "logo_id": null,
        "currency_format": "%s%n",
        "invoice_type": "BASIC",
        "paid_date": null,
        "paid_amount": 0,
        "invoice_template_id": 165,
        "doc_type": "INVOICE"
      }
    }
  )

  //show invoice
  addEventHandlerTo(
    null,
    'invoices/' + //some number here, is it the invoice number?
    {
      'Authorization': 'Bearer ' + token,
    }, 
    'GET',
    null,
    null
  )

  //update invoice
  addEventHandlerTo(
    null,
    'invoices/' + //some number here....
    {
      'Authorization': 'Bearer ' + token,
    },
    'PATCH',
    null,
    {
      "invoice": {//all of these value are placeholders for value grabbing functions
        "number": "INV-1",
        "from": "Jiri",
        "billing": "3651 Lindell Rd. Suite D1024",
        "shipping": "3651 Lindell Rd. Suite D1024",
        "po_number": "po1",
        "date_issued": "3/14/2018",
        "due_date": "3/21/2018",
        "footer_1": "Payment is due within 7 days",
        "currency": "USD",
        "logo_id": null,
        "currency_format": "%s%n",
        "invoice_type": "BASIC",
        "paid_date": null,
        "paid_amount": null,
        "invoice_template_id": 165,
        "doc_type": "INVOICE"
      }
    }
  )

  //delete invoice
  addEventHandlerTo(
    null,
    'invoices/' + //put id here,
    {
      'Authorization': 'Bearer ' + token,
    },
    'DELETE',
    null,
    null
  )

  //Restore invoice
  addEventHandlerTo(
    null,
    'invoices/' + //put id here
    {
      'Authorization': 'Bearer ' + token,
    },
    'PATCH',
    null,
    null
  )

  //set as Paid
  addEventHandlerTo(
    null,
    'invoices/' + //put id here
    {
      'Authorization': 'Bearer ' + token,
    },
    'PATCH',
    null,
    null
  )

  //set as unpaid 
  addEventHandlerTo(
    null,
    'invoices/' + id + '/set_as_unpaid', //SET ID HERE
    {
      'Authorization': 'Bearer ' + token,
    },
    'PATCH',
    null,
    null
  )

  addEventHandlerTo(

  )
  

});
