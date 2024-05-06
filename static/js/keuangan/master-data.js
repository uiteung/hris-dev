import { token } from "../controller/cookies.js";

let allData = []; // Holds the current page data for filtering
let currentPage = 1; // Start from the first page
const baseUrl = "https://hris_backend.ulbi.ac.id/api/v2/wagemst/masterall";
// export let GetDataValidasi = "https://hris_backend.ulbi.ac.id/api/v2/rkp/raw/";

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

  document
    .getElementById("filterKelompok")
    .addEventListener("change", filterTableByKelompok);
}

function fetchDataFromHRIS(page) {
  const url = `${baseUrl}?page=${page}`;
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
      allData = data.data.data_query; // Update current page data
      filterTableByKelompok(); // Apply filters right after fetching
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
  return `<tr>

  <td class="name-email-cell">${item.nama} <br>${item.email}</td>

        <td>${item.jabatan}</td>
        <td>${item.pokok}</td>
        <td>${item.keluarga}</td>
        <td>${item.pangan}</td>
        <td>${item.kinerja}</td>
        <td>${item.keahlian}</td>
        <td>${struk}</td>
        <td>${item.transportasi}</td>
        <td>${item.kehadiran}</td>
        <td>${item.kopkar}</td>
        <td>${item.bankJabar}</td>
        <td>${item.arisan}</td>
        <td>${item.bpjs}</td>
        <td>${item.bauk}</td>
        <td>${item.lain2}</td>
        <td>${item.pph}</td>
        
        <td>${item.validasi ? "Validated" : "Not Validated"}</td>
        <td><button class="btn btn-primary">Action</button></td>
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
  const selectedKelompok = document.getElementById("filterKelompok").value;
  const filteredData = allData.filter(
    (item) => item.kelompok === selectedKelompok || selectedKelompok === ""
  );
  populateTableWithData(filteredData);
}
