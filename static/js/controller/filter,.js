import { postWithToken } from "https://jscroot.github.io/api/croot.js";
import  { getValue } from "https://jscroot.github.io/element/croot.js";
import { getLastMonth,  responseFilter } from "./control.js";
import { UrlFilterGaji } from "./template.js";
import { token } from "./cookies.js";

document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("selecttag")
  form.addEventListener("submit", function(event) {
    let src = getValue("searchinput")
    let kelompok = getValue("select2Basic")
    let data = {
      "kelompok": kelompok,
      "email": ""
    }
    console.log(src)
    event.preventDefault();
    postWithToken(UrlFilterGaji + getLastMonth(), 'login', token, data, responseFilter);
  });
});