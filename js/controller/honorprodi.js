import {postWithBearer} from "https://jscroot.github.io/api/croot.js";
import {getValue} from "https://jscroot.github.io/element/croot.js";
import { URLHONORMENGAJARPRODI, URLREKAPHONOR, URLSLIPHONOR } from "../template/url.js";
import { renderpagingprodi, rendertableprodi, currentPage } from "../config/confighonorprodi.js";
import { showSuccessModal } from "../config/configgajikelompok.js";

let token = "emX9£4_pJhEi0ay76Vp8qn&"
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("formhonor");
    const form2 = document.getElementById("formemail");
    const form3 = document.getElementById("formnotelp");
    form.addEventListener("submit", function(event) {
      event.preventDefault();
      let data = {
        kode_jp : parseInt(getValue("selector"))
    }
    console.log(data)
      postWithBearer(URLHONORMENGAJARPRODI, token, data, (results) => {
        // console.log(results);
        const data = results.data;
        rendertableprodi(currentPage, data);
        renderpagingprodi(data);
      })
    });

    form2.addEventListener("submit", function(event) {
      event.preventDefault();
  
      let dataexport = {
        kode_jp: parseInt(getValue("selector")),
        email: getValue("email")
      };
  
      console.log(dataexport);
  
      postWithBearer(URLREKAPHONOR, token, dataexport, (results) => {
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
  
      postWithBearer(URLSLIPHONOR + "/" + getValue("telp"), token, dataexport, (results) => {
        // Handle results for the second action
        showSuccessModal(results);
      });
    });
  });