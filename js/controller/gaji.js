import {postWithBearer} from "https://jscroot.github.io/api/croot.js";
import {getValue} from "https://jscroot.github.io/element/croot.js";
import { URLEXPORTGAJI, URLGajiKelompok, URLSLIPGAJI } from "../template/url.js";
import { renderpagingkelompok, rendertablekelompok, currentPage, showSuccessModal } from "../config/configgajikelompok.js";

let token = "emX9£4_pJhEi0ay76Vp8qn&"
document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("formgaji");
  const form2 = document.getElementById("formemail");
  const form3 = document.getElementById("formnotelp");

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

    postWithBearer(URLEXPORTGAJI, token, dataexport, (results) => {
      // Handle results for the second action
      showSuccessModal(results);
    });
  });

  form3.addEventListener("submit", function(event) {
    event.preventDefault();

    let dataexport = {
      phonenum: getValue("telp")
    };

    console.log(dataexport);

    postWithBearer(URLSLIPGAJI, token, dataexport, (results) => {
      // Handle results for the second action
      showSuccessModal(results);
    });
  });
});

