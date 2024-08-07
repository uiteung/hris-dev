import { token } from "../../controller/cookies.js";
let allRecords = [];
let allData = []; // Holds the current page data for filtering
let currentPage = 1; // Start from the first page
const baseUrl = "https://hris_backend.ulbi.ac.id/api/v2/honour/dikjar";
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
}

function fetchDataFromHRIS(page) {
  let url = `${baseUrl}/get?page=${page}`;
//   if (currentKelompok) {
//     url = `https://hris_backend.ulbi.ac.id/api/v2/wagemst/filter/${currentKelompok}?page=${page}`;
//   }

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
      if (!data.success) {
        // Assuming success flag is present in the response
        throw new Error("Failed to retrieve data. Please try again.");
      }
      if (!data.data || data.data.length === 0) {
        Swal.fire("Informasi", "Tidak ada data lebih lanjut.", "info");
        return;
      }
      allData = data.data.data_query;
      populateTableWithData(allData);
      updatePaginationButtons(data);
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
  return `<tr>
    <td>${item.id_masdikjar}</td>
    <td>${item.jenjang_jabatan}</td>
    <td>${item.kategori_jabatan}</td>
    <td>${item.ewmp_struktural}</td>
    <td>${item.maksimal_dikjar}</td>
    <td>${item.wajib_dikjar}</td>
    <td>${item.kelebihan_dikjar}</td>
    <td>${item.bonus_jam}</td>

    <td>
        <button class="btn btn-primary btn-sm edit-btn" data-id="${item.id_masdikjar}" data-id="${item.id_masdikjar}" onclick="editItem(this)">
            <i class="mdi mdi-table-edit"></i>
        </button>
        <button class="btn btn-danger btn-sm delete-btn" data-id="${item.id_masdikjar}" data-id="${item.id_masdikjar}" onclick="deleteItem(this)">
            <i class="mdi mdi-delete"></i>
        </button>
    </td>  
</tr>`;
}
window.editItem = function (element) {
  const id = element.getAttribute("data-id");
  localStorage.setItem("editingid", id);
  window.location.href = "dikjar-edit.html";
};

function updatePaginationButtons(data) {
  document.getElementById(
    "currentPage"
  ).textContent = `Page ${data.data.current_page}`;
  document.getElementById("prevPageBtn").disabled = !data.data.prev_page_url;
  document.getElementById("nextPageBtn").disabled = !data.data.next_page_url;
  currentPage = data.data.current_page;
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

// function exportToExcel() {
//   fetchAllPages(1);
// }

function fetchAllPages(page) {
  const url = `https://hris_backend.ulbi.ac.id/api/v2/wagemst/masterall?page=${page}`;
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
        generateExcel(allRecords);
        return;
      }
      allRecords = allRecords.concat(data.data.data_query);
      if (data.data.next_page_url) {
        fetchAllPages(page + 1);
      } else {
        generateExcel(allRecords);
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      alert("Error fetching data: " + error.message);
    });
}

window.deleteItem = function (element) {
  const id = element.getAttribute("data-id"); // Mengambil id dari attribute

  Swal.fire({
    title: "Apakah Anda yakin?",
    text: "Data tidak dapat dikembalikan setelah dihapus!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Hapus",
    cancelButtonText: "Batal",
  }).then((result) => {
    if (result.isConfirmed) {
      sendDeleteRequest(id); // Melakukan request penghapusan
    }
  });
};
function sendDeleteRequest(id) {
  const url = `https://hris_backend.ulbi.ac.id/api/v2/honour/dikjar/delete?id=${id}`;
  fetch(url, {
    method: "DELETE",
    headers: {
      login: token, // Pastikan token tersedia
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        Swal.fire("Deleted!", "Data berhasil dihapus.", "success").then(() => {
          window.location.reload();
        });
      } else {
        Swal.fire("Failed!", "Gagal menghapus data: " + data.message, "error");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      Swal.fire("Error", "Kesalahan: " + error.message, "error");
    });
}
