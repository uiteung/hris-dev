import {get} from "https://jscroot.github.io/api/croot.js";
import { URLMAKSIMALMENGAJAR } from "../template/url.js";
import {renderpagingdikjar, rendertabledikjar, currentPage } from "../config/configdikjar.js";

get(URLMAKSIMALMENGAJAR,  (results) => {
    console.log(results);
    const data = results.data;
    rendertabledikjar(currentPage, data);
    renderpagingdikjar(data);
  })