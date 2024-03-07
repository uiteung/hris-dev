import { postWithToken } from "https://jscroot.github.io/api/croot.js";
import { getLastMonth, responseSearch } from "./control.js";
import { UrlSearchGaji } from "./template.js";
import { token } from "./cookies.js";

document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("search");
  form.addEventListener("submit", function(event) {
    src = document.getElementById("searchinput").value
    event.preventDefault();
    postWithToken(UrlSearchGaji + getLastMonth + '/' + src, 'login', token, "", responseSearch);
  });
});