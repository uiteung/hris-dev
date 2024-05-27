import { token } from "../../controller/cookies.js";
let allRecords = [];
let allData = []; // Holds the current page data for filtering
let currentPage = 1; // Start from the first page
const baseUrl =
  "https://hris_backend.ulbi.ac.id/api/v2/master/komponenkeluarga";
// export let GetDataValidasi = "https://hris_backend.ulbi.ac.id/api/v2/rkp/raw/";
let currentKelompok = "";
document.addEventListener("DOMContentLoaded", () => {
  setupEventListeners();
  fetchDataFromHRIS(allData);
});

function setupEventListeners() {
  // document.getElementById("prevPageBtn").addEventListener("click", () => {
  //   if (currentPage > 1) {
  //     fetchDataFromHRIS(currentPage - 1);
  //   }
  // });
  // document.getElementById("nextPageBtn").addEventListener("click", () => {
  //   fetchDataFromHRIS(currentPage + 1);
  // });
  // const searchButton = document.querySelector(".btn-primary");
  // const searchInput = document.getElementById("searchinput");
  // searchButton.addEventListener("click", (event) => {
  //   event.preventDefault();
  //   searchFromInput();
  // });
  // // Listen for Enter key on the search input
  // searchInput.addEventListener("keypress", (event) => {
  //   if (event.keyCode === 13) {
  //     // 13 is the keycode for Enter
  //     event.preventDefault(); // Prevent form submission
  //     searchFromInput();
  //   }
  // });
}

// function searchFromInput() {
//   const searchInput = document
//     .getElementById("searchinput")
//     .value.trim()
//     .replace(/\s+/g, "_");
//   if (searchInput) {
//     fetchDataFromSearch(searchInput);
//   } else {
//     fetchDataFromHRIS(1); // Assuming you want to reset to the first page
//   }
// }

function fetchDataFromSearch(searchKey) {
  const url = `https://hris_backend.ulbi.ac.id/api/v2/wagemst/search?key=${searchKey}`;

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
    url = `https://hris_backend.ulbi.ac.id/api/v2/wagemst/filter/${currentKelompok}?page=${page}`;
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
      // updatePaginationButtons(data.data);
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
  data.forEach((item, index) => {
    tableBody.innerHTML += createRow(item, index);
  });
}

function createRow(item, index) {
  // const struk = item["fgs-struk"];
  index++;
  return `<tr>
  <td >${index}</td>
  <td >${item.jenis}</td>
  <td >${item.nominal}</td>
  <td >${item.persentase}</td>

    <td>
        <button class="btn btn-primary btn-sm edit-btn" data-id="${item._id}" data-id="${item._id}" onclick="editItem(this)">
            <i class="mdi mdi-table-edit"></i>
        </button>
        <button class="btn btn-danger btn-sm delete-btn" data-id="${item._id}" data-id="${item._id}" onclick="deleteItem(this)">
            <i class="mdi mdi-delete"></i>
        </button>
    </td>  
</tr>`;
}
window.editItem = function (element) {
  const email = element.getAttribute("data-id");
  localStorage.setItem("editingId", email);
  window.location.href = "status-keluarga-edit.html";
};

function updatePaginationButtons(data) {
  document.getElementById(
    "currentPage"
  ).textContent = `Page ${data.current_page}`;
  document.getElementById("prevPageBtn").disabled = !data.prev_page_url;
  document.getElementById("nextPageBtn").disabled = !data.next_page_url;
  currentPage = data.current_page;
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

function exportToExcel() {
  fetchAllPages(1);
}

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
  const id = element.getAttribute("data-id"); // Mengambil _id dari attribute

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
      sendDeleteRequest(id);
    }
  });
};
function sendDeleteRequest(id) {
  const url = `https://hris_backend.ulbi.ac.id/api/v2/master/komponenkeluarga/delete?_id=${id}`;
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
        Swal.fire("Deleted!", "Data berhasil dihapus.", "success").then(
          (result) => {
            setTimeout(
              () =>
                (window.location.href =
                  "https://euis.ulbi.ac.id/hris-dev/app/Biodata/keluarga-master.html"),
              1000
            );
          }
        );
      } else {
        Swal.fire("Failed!", "Gagal menghapus data: " + data.message, "error");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      Swal.fire("Error", "Kesalahan: " + error.message, "error");
    });
}
