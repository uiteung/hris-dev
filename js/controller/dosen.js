import { URLDOSEN } from "../template/url.js";
import {renderpagingdosen, rendertabledosen, currentPage } from "../config/configmstdosen.js";
import {postWithBearer} from "https://jscroot.github.io/api/croot.js";
import {getValue} from "https://jscroot.github.io/element/croot.js";

let token = "emX9£4_pJhEi0ay76Vp8qn&"
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("formhonor");
    form.addEventListener("submit", function(event) {
      event.preventDefault();
      let data = {
        kode_jp : parseInt(getValue("selector"))
    }
    console.log(data)
      postWithBearer(URLDOSEN, token, data, (results) => {
        console.log(results);
        const data = results.data;
        rendertabledosen(currentPage, data);
        renderpagingdosen(data);
      })
    });
  });