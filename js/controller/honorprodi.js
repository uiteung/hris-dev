import {postWithBearer} from "https://jscroot.github.io/api/croot.js";
import {getValue} from "https://jscroot.github.io/element/croot.js";
import { URLHONORMENGAJARPRODI } from "../template/url.js";
import { ResponseData } from "../config/config.js";

let token = "emX9£4_pJhEi0ay76Vp8qn&"
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("formhonor");
    form.addEventListener("submit", function(event) {
      event.preventDefault();
      let data = {
        kode_jp : parseInt(getValue("selector"))
    }
    console.log(data)
      postWithBearer(URLHONORMENGAJARPRODI, token, data, ResponseData)
    });
  });