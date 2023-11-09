import {postWithBearer} from "https://jscroot.github.io/api/croot.js";
import {getValue} from "https://jscroot.github.io/element/croot.js";
import { URLGajiKelompok } from "../template/url.js";
import { renderpagingkelompok, rendertablekelompok, currentPage } from "../config/configgajikelompok.js";

let token = "emX9£4_pJhEi0ay76Vp8qn&"
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("formgaji");
    form.addEventListener("submit", function(event) {
      event.preventDefault();
      let data = {
        kelompok : getValue("selector")
    }
    console.log(data)
      postWithBearer(URLGajiKelompok, token, data, (results) => {
        // console.log(results);
        const data = results.data;
        rendertablekelompok(currentPage, data);
        renderpagingkelompok(data);
      })
    });
    form.addEventListener("submit", function(event) {
      event.preventDefault();
      let dataexport = {
        kelompok : getValue("selector"),
        email : getValue("email")
    }
    console.log(dataexport)
      postWithBearer(URLGajiKelompok, token, data, (results) => {
        showSuccessModal();
      })
    });
  });