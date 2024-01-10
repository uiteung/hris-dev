import {get} from "https://jscroot.github.io/api/croot.js";
import {getValue} from "https://jscroot.github.io/element/croot.js";
import { URLValidate } from "../template/url.js";
import { renderPagingValidasi, renderTableValidasi, currentPage } from "../config/configvalidasidata.js";

document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("formgaji");

  form.addEventListener("submit", function(event) {
    event.preventDefault();

    get(URLValidate + getValue("selector"), (results) => {
      // Handle results for the first action
      console.log(results)
      const data = results.data;
      renderTableValidasi(currentPage, data);
      renderPagingValidasi(data);

      });
    });
  });