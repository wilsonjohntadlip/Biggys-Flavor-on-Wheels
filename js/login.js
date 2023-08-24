$("#login-form").on("submit", function (e) {

  e.preventDefault();

  let loginRequest = {
    email: $("#email").val(),
    password: $("#password").val(),
  };

  $.ajax({
    url: LOGIN_API, //URL of the API
    type: "POST", //GET and POST
    data: "auth=" + JSON.stringify(loginRequest), //auth will be our php variable $_POST['auth']
    //JS JSON.stringify -> PHP json_decode
    //PHP json_encode -> JSON.parse
    //5. Check your API and do the process
    success: function (response) {
      //success yung response
      console.log(response);
      /**
       * 6. Check the response and parse it thru JSON.parse
       */
      let parseResponse = JSON.parse(response);
      $("#container").html(
        "<h1>" +
          parseResponse.title +
          "</h1>" +
          "<h2>" +
          parseResponse.description +
          "</h2>"
      );
      
      /**
       * If successful yung login
       */
      if (parseResponse.status == 200) {
        $("#loginbutton").hide();
        $("#loginbutton2").hide();
        $("#logoutBtn2").show();
        location.reload();
      }
    },
    error: function (xhr, status, error) {
      //error yung response
      alert("Error");
    },
  });
});

$("#reg-form").on("submit", function (e) {
  e.preventDefault();

  let registrationRequest = {
    fname: $("#fname").val(),
    lname: $("#lname").val(),
    email: $("#registeremail").val(),
    password: $("#registerpassword").val(),
    confirmPassword: $("#confirmpassword").val(),
  };

  $.ajax({
    url: LOGIN_API, //URL of the API
    type: "POST", //GET and POST
    data: "store=" + JSON.stringify(registrationRequest), //auth will be our php variable $_POST['auth']
    //JS JSON.stringify -> PHP json_decode
    //PHP json_encode -> JSON.parse
    //5. Check your API and do the process
    success: function (response) {
      //success yung response
      console.log(response);
      /**
       * 6. Check the response and parse it thru JSON.parse
       */
      let parseResponse = JSON.parse(response);
      $("#container2").html(
        '<h1 class="text-blue-700">' +
          parseResponse.title +
          "</h1>" +
          '<h2 class="text-blue-700">' +
          parseResponse.description +
          "</h2>"
      );

      /**
       * If successful yung login
       */
      if (parseResponse.status == 200) {
        location.reload();

      }
    },

    error: function (xhr, status, error) {
      //error yung response
      alert("Error");
    },
  });
});

sessionCheck();

function sessionCheck() {
  $.ajax({
    url: LOGIN_API, //URL of the API
    type: "POST", //GET and POST
    data: "sessionCheck", //auth will be our php variable $_POST['auth']
    //JS JSON.stringify -> PHP json_decode
    //PHP json_encode -> JSON.parse
    //5. Check you9r API and do the process
    success: function (response) {
      //success yung response
      console.log(response);

      let parseResponse = JSON.parse(response);

      if (parseResponse.description == "isActive") {
        $("#loginbutton").hide();
        $("#loginbutton2").hide();
        $("#logoutBtn").show();
        $("#logoutBtn2").show();
      }
    },

    error: function (xhr, status, error) {
      //error yung response
      alert("Error");
    },
  });
}

function logout() {
  $.ajax({
    url: LOGIN_API, //URL of the API
    type: "POST", //GET and POST
    data: "logout", //auth will be our php variable $_POST['auth']
    //JS JSON.stringify -> PHP json_decode
    //PHP json_encode -> JSON.parse
    //5. Check your API and do the process
    success: function (response) {
      //success yung response
      console.log(response);

      let parseResponse = JSON.parse(response);

      if (parseResponse.description == "Successfully Logout") {
        location.reload();
      }
    },

    error: function (xhr, status, error) {
      //error yung response
      alert("Error");
    },
  });
}

