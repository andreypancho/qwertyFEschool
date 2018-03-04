window.onload = function () {
  //homework #1
  $(".cancel").click(function () {
    $("#modal-reg").hide("slow");
  });
  $(".cancel").click(function () {
    $("#modal-login").hide("slow");
  });
  $(".Reg").click(function () {
    $("#modal-reg").show("slow");
  });
  $(".Login").click(function () {
    $("#modal-login").show("slow");
  });

  //homework #2
  $(".sidebar").attr("val", "true");
  $("#burger").click(function () {
    if ($(".sidebar").attr("val") == "false") {
      $(".sidebar").show("slow");
      $(".sidebar").attr("val", "true");
    } else if ($(".sidebar").attr("val") == "true") {
      $(".sidebar").hide("slow");
      $(".sidebar").attr("val", "false");
    }
  });

  $("#fontSize").change(function () {
    var a = $("#fontSize").val();
    if (Math.ceil(a) - a > 0) {
      $("#error").html("Введите целое число!!!");
      return;
    } else {
      $("#error").html("");
    }
    if (a >= 8 && a <= 24) {
      $(".content").css("font-size", "" + a + "px");
    }
  });

  $("#backgroundColor").change(function () {
    var b = $("#backgroundColor option:selected").val();
    $(".content").css("background", "" + b + "");
  });

  $("#fontFamily").change(function () {
    var c = $("#fontFamily option:selected").val();
    $(".content").css("font-family", "" + c + "");
  });

  $("#deleteP").click(function () {
    $("p")
      .last()
      .remove();
  });

  //homework #3
  var errors = document.querySelector("#error");
  var failed = { fail: false, errors: [] };
  var userName = document.querySelector(".name");
  var flag;
  localStorage.setItem("localUser", "false");

  session();

  handleFormRegistration();

  handleFormLogin();

  logOut();

  hideMenu();

  function changeForm(form) {
    form.addEventListener("change", () => {
      errors.innerHTML = "";
      failed.fail = false;
      failed.errors = [];
    });
  }

  function session() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        userName.textContent = "Привет " + user.displayName;
        flag = false;
      } else {
        flag = true;
      }
    });
  }

  function createUser(email, password, name) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        user
          .updateProfile({
            displayName: name
          })
          .then(userName => session());
        hideMenu();
      })
      .catch(err => {
        errors.innerHTML = err.message;
      });
  }

  function handleFormRegistration() {
    var form = document.forms.register;

    changeForm(form);

    form.addEventListener("submit", event => {
      event.preventDefault();
      var { elements } = event.target;
      var name = document.querySelector("#register_login").value.trim();
      var email = document.querySelector("#register_email").value.trim();
      var password = document.querySelector("#register_password").value.trim();
      var repeatPassword = document
        .querySelector("#register_confirmation")
        .value.trim();

      if (password !== repeatPassword) {
        failed.fail = true;
        failed.errors.push("Пароли не совпадают!");
      }

      if (name.length === 0) {
        failed.fail = true;
        failed.errors.push("Введите имя");
      }

      if (!failed.fail) {
        createUser(email, password, name);
        document.querySelector("#register_login").value = "";
        document.querySelector("#register_email").value = "";
        document.querySelector("#register_password").value = "";
        document.querySelector("#register_confirmation").value = "";
      } else {
        errors.innerHTML = failed.errors[length];
      }
    });
  }

  function handleFormLogin() {
    var formLogin = document.forms.login;
    formLogin.addEventListener("submit", event => {
      event.preventDefault();
      var email = document.querySelector("#auth_login").value;
      var password = document.querySelector("#auth_password").value;

      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
          session();
          errors.innerHTML = "";
          document.querySelector("#auth_login").value = "";
          document.querySelector("#auth_password").value = "";
          hideMenu();
        })
        .catch(err => {
          errors.innerHTML = err.message;
        });
    });
  }

  function logOut() {
    const btnLogout = document.querySelector("#logOut");
    btnLogout.addEventListener("click", () => {
      firebase
        .auth()
        .signOut()
        .then(() => {
          userName.innerHTML = "";
          errors.innerHTML = "";
          flag = false;
          hideMenu();
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  function hideMenu() {
    setTimeout(() => {
      if (flag) {
        document.querySelector(".authmenu").style.display = "flex";
        document.querySelector("#logOut").style.display = "none";
        document.querySelector(".sidebar").style.display = "none";
        document.querySelector("#burger").style.display = "none";
      } else {
        document.querySelector(".sidebar").style.display = "block";
        document.querySelector("#burger").style.display = "block";
        document.querySelector(".authmenu").style.display = "none";
        document.querySelector("#modal-reg").style.display = "none";
        document.querySelector("#modal-login").style.display = "none";
        document.querySelector("#logOut").style.display = "block";
      }
    }, 20);
  }
};
