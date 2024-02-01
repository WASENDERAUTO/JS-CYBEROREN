import { getCookie } from "https://jscroot.github.io/cookie/croot.js";

export function postWithToken(target_url,tokenkey,tokenvalue,responseFunction){
    var myHeaders = new Headers();
    myHeaders.append(tokenkey, tokenvalue);
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow'
    };

    fetch(target_url, requestOptions)
    .then(response => response.text())
    .then(result => responseFunction(JSON.parse(result)))
    .catch(error => console.log('error', error));
}

const PostApprove = (APPROVE) => {
  const target_url =
    "https://asia-southeast2-marjuniati-putri.cloudfunctions.net/wasenderauto-users?username=" + APPROVE;
  const tokenvalue = getCookie("Authorization");
  const tokenkey = "Authorization";
  postWithToken(target_url, tokenkey, tokenvalue, responseData);
//   console.log(datainjson);
};

const responseData = (result) => {
  if (result.status === 200) {
    Swal.fire({
      icon: "success",
      title: "Approve Successful",
      text: result.message,
    }).then(() => {
      window.location.reload();
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Post Failed",
      text: result.message,
    });
  }
};

window.PostApprove = PostApprove;