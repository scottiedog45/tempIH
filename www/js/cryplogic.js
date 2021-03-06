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
    //change event to submit instead of on click for forms!!!
    //And page=: page=<number> in request, probably not doing this for phones


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
  //Why are some of these "GUEST"? in the api? 
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
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
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

  //copy invoice
  addEventHandlerTo(
    null,
    'invoices/' + id + '/copy', //put id here
    {
      'Authorization': 'Bearer ' + token,
    },
    'POST',
    null,
    null
  )
  
  //CUSTOMER endpoints
  //get all customers
  addEventHandlerTo(
    null,
    'customers/',
    {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    },
    'GET', //TODO is this right? Not referenced in API
    null,
    null
  )

  //paid customers
  addEventHandlerTo(
    null,
    'customers/paid',
    {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    },
    'GET',
    null,
    null
  )

  //unpaid customers (contains overdue invoices too)
  addEventHandlerTo(
    null,
    'customers/unpaid', 
    {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    'GET',
    null,
    null
  )

  //overdue customers
  addEventHandlerTo(
    null,
    'customers/overdue',
    {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    'GET',
    null,
    null
  )

  //show customer
  addEventHandlerTo(
    null,
    'customers/' + id + '/',
    {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    'GET',
    null,
    null
  )

  //ITEMS endpoints
  //index items
  //page - optional for pagination
  addEventHandlerTo(
    null,
    'invoices/' + id + '/items',
    {
      'Authorization': 'Bearer ' + token //Does this need the applicatoin/json header?
    }, 
    'GET', 
    null,
    null
  )

  addEventHandlerTo(
    null,
    'invoices/' + id + '/items',
    {
      'Content-Type': 'application / json',
      'Authorization': 'Bearer ' + token
    }, 
    'POST',
    null,
    {
      "item": { //these items are just place holders
        "quantity": 1,
        "description": "ford mustang",
        "price": 30000,
        "amount": 30000
      }
    }
  )

  //show item
  addEventHandlerTo(
    null,
    'items/' + id,
    {
      'Authorization': 'Bearer ' + token
    }, 
    'GET', 
    null,
    null
  )

  //update item
  addEventHandlerTo(
    null,
    'invoices/' + invoiceId + '/items' + itemid,
    {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }, 
    'PATCH', 
    null,
    null
  )

  //DELETE item 
  addEventHandlerTo(
    null,
    'items/' + id,
    {
      'Authorization': 'Bearer ' + token
    },
    'DELETE', 
    null,
    null
  )

  //add tax rate
  //what body data is needed for this tax? 
  addEventHandlerTo(
    null,
    'items/' + itemid + '/tax_rates/1',
    {
      'Authorization': 'Bearer ' + token
    }, 
    'PATCH', 
    null,
    null
  )

  //tax 2
  //doe sthis need to have body content as well? 
  addEventHandlerTo(
    null,
    'items/' + itemid + '/tax_rates/2',
    {
      'Authorization': 'Bearer ' + token
    },
    'PATCH',
    null,
    null
  )

  //clear tax rates
  addEventHandlerTo(
    null,
    'items/' + itemid + '/tax_rates/',
    {
      'Authorization': 'Bearer ' + token
    },
    'DELETE', 
    null,
    null
  )

  //CURRENCY ENDPOINTS
  //get all currencies, returns all 
  addEventHandlerTo(
    null,
    'currencies', 
    {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    'GET', 
    null,
    null
  )

  //currencey formats
  addEventHandlerTo(
    null,
    'currencies/format?currency=' + currencyString + '&amount=' + amount + '&region=' + country,
    {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    'GET', 
    null,
    null
  )

  //COUNTRIES endpoints
  //get country list
  //OPTIONAL LOCAL PARAM locale, used for human format translations
  addEventHandlerTo(
    null,
    'countries', 
    {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    'GET',
    null,
    null
  )

  //LOGO endpoints- figure out how to upload images from native ios library

  //clipart endpoint
  addEventHandlerTo(
    null,
    'logos/cliparts',
    {
      'Authorization': 'Bearer ' + token
    }, 
    'GET', 
    null, 
    null
  )

  //people endpoint
  addEventHandlerTo(
    null,
    'logos/people',
    {
      'Authorization': 'Bearer ' + token
    },
    'GET',
    null,
    null
  )

  //jobs endpoint
  addEventHandlerTo(
    null,
    'logos/jobs',
    {
      'Authorization': 'Bearer ' + token
    },
    'GET',
    null,
    null
  )

  //EMAIL endpoints
  //index emails
  addEventHandlerTo(
    null,
    'invoices/' + invoiceid + 'emails',
    {
      'Authorization': 'Bearer ' + token
    },
    'GET', 
    null,
    null
  )

  //new email
  addEventHandlerTo(
    null,
    'invoices/' + invoiceid + '/emails/new',
    {
      'Authorization': 'Bearer ' + token
    },
    'GET', 
    null,
    null
  )

  //create email
  addEventHandlerTo(
    null,
    'invoices/' + invoiceid + '/emails', 
    {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }, 
    'POST', 
    null,
    {
      "email": {//example data
        "from": "John Doe",
        "to": "jiri.hradil@invoicehome.com",
        "subject": "greetings",
        "body": "Hi to Boston!",
        "has_payment_link": true,
        "send_me_copy": true
      }
    }
  )

  addEventHandlerTo(
    null,
    'emails/' + userid,
    {
      'Authorization': 'Bearer ' + token
    },
    'GET', 
    null,
    null
  )
});
