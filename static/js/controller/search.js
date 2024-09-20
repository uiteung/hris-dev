import { postWithToken } from "https://jscroot.if.co.id/api/croot.js";
import  { getValue } from "https://jscroot.if.co.id/element/croot.js";
import { getLastMonth, responseSearch } from "./control.js";
import { UrlSearchGaji } from "./template.js";
import { token } from "./cookies.js";

document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("search")
  form.addEventListener("submit", function(event) {
    let src = getValue("searchinput")
    console.log(src)
    event.preventDefault();
    postWithToken(UrlSearchGaji + getLastMonth() + '/' + src, 'login', token, "", responseSearch);
  });
});