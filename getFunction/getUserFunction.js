import { URLGetUser, responseData } from "./tableUser.js";
import { getCookie } from "https://jscroot.github.io/cookie/croot.js";

const CountBelumApprove = (count) => {
  const resultCountElement = document.getElementById("belumApprove");
  resultCountElement.innerHTML = `
    <h3 class="mb-0 me-2">${count}</h3>
  `;
};

const CountApprove = (count) => {
  const resultCountElement = document.getElementById("sudahApprove");
  resultCountElement.innerHTML = `
    <h3 class="mb-0 me-2">${count}</h3>
  `;
};

const get = (target_url, responseFunction) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", getCookie("Authorization"));
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(target_url, requestOptions)
    .then((response) => response.json()) // Ubah ke response.json()
    .then((result) => {
      const jsonData = result; // Perhatikan bahwa result langsung digunakan sebagai jsonData
      responseFunction(jsonData);

      if (Array.isArray(jsonData.data)) { // Pastikan data adalah sebuah array sebelum menggunakan filter
        const sudahApprove = jsonData.data.filter(
          (value) => value.license !== "kosong"
        );
        const belumApprove = jsonData.data.filter(
          (value) => value.license === "kosong"
        );

        CountBelumApprove(belumApprove.length);
        CountApprove(sudahApprove.length);
      } else {
        console.log("Data is not an array");
      }
    })
    .catch((error) => {
      console.log("error", error);
    });
};

get(URLGetUser, responseData);

