import { getLastMonth } from "../controller/control.js";
import { token } from "../controller/cookies.js";

let allData = []; // Holds the current page data for filtering
let currentPage = 1; // Start from the first page
const baseUrlsearch =
  "https://hris_backend.ulbi.ac.id/api/v2/rkp/" + getLastMonth();
const baseUrl =
  "https://hris_backend.ulbi.ac.id/api/v2/rkp/raw/" + getLastMonth();

// export let GetDataValidasi = "https://hris_backend.ulbi.ac.id/api/v2/rkp/raw/";
let currentKelompok = "";
document.addEventListener("DOMContentLoaded", () => {
  setupEventListeners();
  fetchDataFromHRIS(currentPage);
});

function setupEventListeners() {
  document.getElementById("prevPageBtn").addEventListener("click", () => {
    if (currentPage > 1) {
      fetchDataFromHRIS(currentPage - 1);
    }
  });

  document.getElementById("nextPageBtn").addEventListener("click", () => {
    fetchDataFromHRIS(currentPage + 1);
  });
  const searchButton = document.querySelector(".btn-primary");
  const searchInput = document.getElementById("searchinput");

  searchButton.addEventListener("click", (event) => {
    event.preventDefault();
    searchFromInput();
  });

  // Listen for Enter key on the search input
  searchInput.addEventListener("keypress", (event) => {
    if (event.keyCode === 13) {
      // 13 is the keycode for Enter
      event.preventDefault(); // Prevent form submission
      searchFromInput();
    }
  });
  document
    .getElementById("filterKelompok")
    .addEventListener("change", filterTableByKelompok);
}

function searchFromInput() {
  const searchInput = document
    .getElementById("searchinput")
    .value.trim()
    .replace(/\s+/g, "_");
  if (searchInput) {
    fetchDataFromSearch(searchInput);
  } else {
    // If search input is empty, fetch the initial dataset
    fetchDataFromHRIS(1); // Assuming you want to reset to the first page
  }
}

function fetchDataFromSearch(searchKey) {
  const url =
    "https://hris_backend.ulbi.ac.id/api/v2/rkp/search/" +
    getLastMonth() +
    "?key=" +
    searchKey;

  fetch(url, {
    method: "POST",
    headers: {
      login: `${token}`,
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          "Terjadi kesalahan saat mencari data. Silakan coba lagi."
        );
      }
      return response.json();
    })
    .then((data) => {
      if (!data.data.data_query || data.data.data_query.length === 0) {
        Swal.fire("Informasi", "Tidak ada data yang cocok ditemukan.", "info");
        return;
      }
      allData = data.data.data_query;
      populateTableWithData(allData);
      updatePaginationButtons(data.data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      handlingErrorSearch();
    });
}

function fetchDataFromHRIS(page) {
  let url = `${baseUrl}?page=${page}`;
  if (currentKelompok) {
    url =
      `https://hris_backend.ulbi.ac.id/api/v2/rkp/filter/${currentKelompok}?waktu ` +
      getLastMonth();
  }

  fetch(url, {
    method: "GET",
    headers: {
      login: `${token}`,
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          "Terjadi kesalahan saat mengambil data. Silakan coba lagi."
        );
      }
      return response.json();
    })
    .then((data) => {
      if (!data.data.data_query || data.data.data_query.length === 0) {
        Swal.fire("Informasi", "Tidak ada data lebih lanjut.", "info");
        return;
      }
      allData = data.data.data_query;
      populateTableWithData(allData);
      updatePaginationButtons(data.data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    });
}

function populateTableWithData(data) {
  const tableBody = document.getElementById("tablebody");
  tableBody.innerHTML = ""; // Clear existing table data
  data.forEach((item) => {
    tableBody.innerHTML += createRow(item);
  });
}

function createRow(item) {
  const struk = item["fgs-struk"];
  const gajipokok = item["gaji-pokok"];

  return `<tr>

  <td class="name-email-cell">${item.nama} <br>${item.email}</td>

        <td>${gajipokok}</td>
        <td>${item.keluarga}</td>
        <td>${item.pangan}</td>
        <td>${item.kinerja}</td>
        <td>${item.keahlian}</td>
        <td>${struk}</td>
        <td>${item.transportasi}</td>
        <td>${item.kehadiran}</td>
        <td>${item.rapel_gaji}</td>

        <td>${item.kopkar}</td>
        <td>${item.bankJabar}</td>
        <td>${item.arisan}</td>
        <td>${item.bpjs}</td>
        <td>${item.bauk}</td>
        <td>${item.lain2}</td>
        <td>${item.pph}</td> 
        <td>${item.totalgaji}</td>
        <td>${item.totalpotongan}</td>                
        <td>${item.totalgajibersih}</td>        
         

        
    </tr>`;
}

function updatePaginationButtons(data) {
  document.getElementById(
    "currentPage"
  ).textContent = `Page ${data.current_page}`;
  document.getElementById("prevPageBtn").disabled = !data.prev_page_url;
  document.getElementById("nextPageBtn").disabled = !data.next_page_url;
  currentPage = data.current_page; // Update the current page
}
function filterTableByKelompok() {
  currentKelompok = document
    .getElementById("filterKelompok")
    .value.replace(" ", "_");
  fetchDataFromHRIS(1);
}

function handlingErrorSearch() {
  Swal.fire({
    icon: "warning",
    title: "Oops...",
    text: "Data Tidak Ditemukan.",
  });
}

let allRecords = []; // Holds all records across pages

function exportToExcel() {
  // Start fetching from the first page
  fetchAllPages(1);
}

function fetchAllPages(page) {
  const url =
    `https://hris_backend.ulbi.ac.id/api/v2/rkp/raw/` +
    getLastMonth() +
    `?page=${page}`;
  fetch(url, {
    method: "GET",
    headers: {
      login: `${token}`,
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) throw new Error("Failed to load data");
      return response.json();
    })
    .then((data) => {
      if (data.data.data_query.length === 0) {
        // No more data, generate Excel
        generateExcel(allRecords);
        return;
      }
      // Append current page's data to allRecords
      allRecords = allRecords.concat(data.data.data_query);
      if (data.data.next_page_url) {
        // If there is a next page, fetch it
        fetchAllPages(page + 1);
      } else {
        // No next page, generate Excel
        generateExcel(allRecords);
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      alert("Error fetching data: " + error.message);
    });
}

function generateExcel(data) {
  const ws = XLSX.utils.json_to_sheet(
    data.map((item) => ({
      Nama: item.nama,
      "Gaji Pokok": item.pokok,
      Keluarga: item.keluarga,
      Pangan: item.pangan,
      KPI: item.kinerja,
      Keahlian: item.keahlian,
      "FGS/Struktural": item["fgs-struk"],
      Transport: item.transportasi,
      Kehadiran: item.kehadiran,
      Kopkar: item.kopkar,
      "Bank Jabar": item.bankJabar,
      Arisan: item.arisan,
      "BPJS TK": item.bpjs,
      BAUK: item.bauk,
      "Lain-lain": item.lain2,
      PPH: item.pph,
    }))
  );

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "MasterData");
  XLSX.writeFile(wb, "HRIS_Data_Export.xlsx");
}

document
  .getElementById("exportButton")
  .addEventListener("click", exportToExcel);
