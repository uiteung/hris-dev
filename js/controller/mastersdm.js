import {get} from "https://jscroot.github.io/api/croot.js";
import { URLKARYAWAN } from "../template/url.js";
import { renderPagination, renderTablePage, currentPage } from "../config/config.js";


get(URLKARYAWAN, (results) => {
    console.log(results);
    const data = results.data;
    renderTablePage(currentPage, data);
    renderPagination(data);
  });