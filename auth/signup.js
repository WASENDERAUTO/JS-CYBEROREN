import { getValue } from "https://jscroot.github.io/element/croot.js";

function postSignUp(target_url, datajson, responseFunction) {
  var raw = JSON.stringify(datajson);

  var requestOptions = {
    method: "POST",
    body: raw,
    redirect: "follow",
  };

  fetch(target_url, requestOptions)
    .then((response) => response.text())
    .then((result) => responseFunction(JSON.parse(result)))
    .catch((error) => console.log("error", error));
}

const SignUp = () => {
  const target_url =
    "https://asia-southeast2-marjuniati-putri.cloudfunctions.net/wasenderauto-signup";

  const datainjson = {
      email: getValue("email"),
      password: getValue("password"),
      phone_number: getValue("phone_number"),
      name : getValue("name"),
      username : getValue("username")
  };
  console.log(datainjson);
  postSignUp(target_url, datainjson, responseData);
};

const responseData = (result) => {
  if (result.status) {
    Swal.fire({
      icon: "success",
      title: "Sign Up Successful",
      text: result.message,
    }).then(() => {
      window.location.href = "./login.html";
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Sign Up Failed",
      text: result.message,
    });
  }
};

window.SignUp = SignUp;