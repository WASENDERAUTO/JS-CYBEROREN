import { getValue } from "https://jscroot.github.io/element/croot.js";
import { setCookieWithExpireHour } from "https://jscroot.github.io/cookie/croot.js";

function postWithToken(target_url, datajson, responseFunction) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify(datajson);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(target_url, requestOptions)
    .then((response) => response.text())
    .then((result) => responseFunction(JSON.parse(result)))
    .catch((error) => console.log("error", error));
}

const PostSignIn = () => {
  const target_url =
    "https://asia-southeast2-marjuniati-putri.cloudfunctions.net/wasenderauto-login";
  const datainjson = {
    email: getValue("email"),
    password: getValue("password"),
  };

  postWithToken(target_url, datainjson, responseData);
};

const responseData = (result) => {
  if (result.status == 200) {
    setCookieWithExpireHour("Authorization", result.data.token, 2)

    Swal.fire({
      icon: "success",
      title: "Login Successful",
      text: "You have successfully logged in.",
    }).then(() => {
      if (result.data.username === "admin") {
        window.location.href = "./admin/index.html";
      }else{
        window.location.href = "./user/index.html"
      }
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Login Failed",
      text: result.message,
    });
  }
};

window.PostSignIn = PostSignIn;