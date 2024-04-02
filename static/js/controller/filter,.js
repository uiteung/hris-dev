import { postWithToken } from "https://jscroot.github.io/api/croot.js";
import  { getValue } from "https://jscroot.github.io/element/croot.js";
import { getLastMonth, responseSearch } from "./control.js";
import { UrlFilterGaji } from "./template.js";
import { token } from "./cookies.js";

document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("selecttag")
  const kelompok = document.getElementById("select2Basic")
  const data = {
    kelompok: kelompok,
    email: ""
  }
  form.addEventListener("submit", function(event) {
    let src = getValue("searchinput")
    console.log(src)
    event.preventDefault();
    postWithToken(UrlFilterGaji + getLastMonth(), 'login', token, data, responseSearch);
  });
});