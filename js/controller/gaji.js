import {postWithBearer} from "https://jscroot.github.io/api/croot.js";
import {getValue} from "https://jscroot.github.io/element/croot.js";
import { URLEXPORTGAJI, URLGajiKelompok } from "../template/url.js";
import { renderpagingkelompok, rendertablekelompok, currentPage, showSuccessModal } from "../config/configgajikelompok.js";

let token = "emX9£4_pJhEi0ay76Vp8qn&"
document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("formgaji");
  const form2 = document.getElementById("formemail");

  form.addEventListener("submit", function(event) {
    event.preventDefault();

    let data = {
      kelompok: getValue("selector")
    };

    console.log(data);

    postWithBearer(URLGajiKelompok, token, data, (results) => {
      // Handle results for the first action
      const data = results.data;
      rendertablekelompok(currentPage, data);
      renderpagingkelompok(data);
    });
  });

  form2.addEventListener("submit", function(event) {
    event.preventDefault();

    let dataexport = {
      kelompok: getValue("selector"),
      email: getValue("email")
    };

    console.log(dataexport);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(dataexport),
      redirect: 'follow'
    };
    
    fetch("http://hris_backend.ulbi.ac.id/wage/csv", requestOptions)
      .then(response => response.text())
      .then(result => showSuccessModal())
      .catch(error => console.log('error', error));
  });
});

