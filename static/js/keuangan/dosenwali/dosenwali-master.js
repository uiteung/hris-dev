import { token } from "../../controller/cookies.js";
let allRecords = [];
let allData = []; // Holds the current page data for filtering
let currentPage = 1; // Start from the first page
const baseUrl = "https://hris_backend.ulbi.ac.id/api/v2/dosenwali";
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
    .getElementById("filterBulan")
    .addEventListener("change", filterTableByMonth);
}

function searchFromInput() {
  const searchInput = document
    .getElementById("searchinput")
    .value.trim()
    .replace(/\s+/g, "_");
  const selectedMonth = document
    .getElementById("filterBulan")
    .value.replace(" ", "_");

  if (searchInput) {
    fetchDataFromSearch(searchInput, selectedMonth);
  } else {
    fetchDataFromHRIS(1); // Assuming you want to reset to the first page
  }
}

function fetchDataFromSearch(searchKey, month) {
  const url = `https://hris_backend.ulbi.ac.id/api/v2/dosenwali/search?key=${searchKey}`;

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
  const selectedMonth = document.getElementById("filterBulan").value;
  let url;

  // Check if the default option "Pilih Bulan" is selected
  if (selectedMonth === "" || selectedMonth === "Pilih Bulan") {
    url = `${baseUrl}/get?page=${page}`; // URL without month filter
  } else {
    url = `${baseUrl}/filter/${selectedMonth.replace(" ", "_")}?page=${page}`; // URL with month filter
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
    //   console.log(allData)
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
  let mataKuliahHtml = item.kelas
  .map(
    (mk) => `
    <tr>
      <td>${mk.angkatan}</td>
      <td>${mk.semester}</td>
      <td>${mk.kelas}</td>
      <td>${mk.prodi}</td>
      <td>${mk.tahapan.tahap1}</td>
      <td>${mk.honor}</td>
    </tr>
  `
  )
  .join("");
  return `<tr>
    <td class="name-email-cell">${item.nama}
        <td>
        <table class="nested-table">
          <thead>
            <tr>
              <th style="background-color: #495057; color: white;">Angkatan</th>
              <th style="background-color: #495057; color: white;">Semester</th>
              <th style="background-color: #495057; color: white;">Kelas</th>
              <th style="background-color: #495057; color: white;">Prodi</th>
              <th style="background-color: #495057; color: white;">Laporan</th>
              <th style="background-color: #495057; color: white;">Honor</th>
            </tr>
          </thead>
          <tbody>${mataKuliahHtml}</tbody>
        </table>
      </td>
    <td>${item.total_honor}</td>
    <td>${item.pph}</td>
    <td>${item.jumlahdibayarkan}</td>
    <td>${item.masa_perolehan}</td>
    <td>
        <button class="btn btn-primary btn-sm edit-btn" data-id="${item.id}" data-email="${item.nama}" onclick="editItem(this)">
            <i class="mdi mdi-table-edit"></i>
        </button>
        <button class="btn btn-info btn-sm edit-btn" data-id="${item.id}" data-email="${item.nama}" data-bulan="${item.nama}" onclick="printoutitem(this)">
        <i class="mdi mdi-cloud-print-outline"></i>
    </button>
        <button class="btn btn-danger btn-sm delete-btn" data-id="${item.id}" data-email="${item.nama}" onclick="deleteItem(this)">
            <i class="mdi mdi-delete"></i>
        </button>
    </td>  
</tr>`;
}
window.editItem = function (element) {
  const id = element.getAttribute("data-id");
  localStorage.setItem("editingid", id);
  window.location.href = "dosenwali-edit.html";
};

window.printoutitem = function (element) {
  const email = element.getAttribute("data-email");
  const monthStr = element.getAttribute("data-bulan")

  // // Get the current date and calculate the previous month
  // const now = new Date();
  // const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  // const year = lastMonth.getFullYear();
  // const month = (lastMonth.getMonth() + 1).toString().padStart(2, "0");
  // const yearMonth = `${year}${month}`;

  // Construct the URL for the GET request
  const url = `https://hris_backend.ulbi.ac.id/api/v2/master/doktor/pdf/${monthStr}?email=${encodeURIComponent(
    email
  )}`;

  fetch(url, {
    method: "GET",
    headers: {
      login: `${token}`,
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok: " + response.statusText);
      }
      return response.blob();
    })
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `SlipDoktor_${monthStr}_${email}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    })
    .catch((error) => {
      console.error("Error fetching PDF:", error);
      Swal.fire("Error", "Failed to fetch PDF: " + error.message, "error");
    });
};

function updatePaginationButtons(data) {
  document.getElementById(
    "currentPage"
  ).textContent = `Page ${data.current_page}`;
  document.getElementById("prevPageBtn").disabled = !data.prev_page_url;
  document.getElementById("nextPageBtn").disabled = !data.next_page_url;
  currentPage = data.current_page;
}
function filterTableByMonth() {
  const selectedMonth = document
    .getElementById("filterBulan")
    .value.replace(" ", "_");
  fetchDataFromHRIS(selectedMonth, 1);
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

document.addEventListener("DOMContentLoaded", () => {
  const generateButton = document.getElementById("deleteButton");
  generateButton.addEventListener("click", () => {
    Swal.fire({
      title: "Sebelum Anda Menghapus Honor Pastikan Kembali",
      text: "Apakah Anda Yakin Ingin Menghapus Semuanya?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        DeleteDoswal();
      }
    });
  });
});

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

  // Adjust column widths
  const colWidths = [
    { wch: 30 }, // Nama
    { wch: 15 }, // Gaji Pokok
    { wch: 15 }, // Keluarga
    { wch: 15 }, // Pangan
    { wch: 15 }, // KPI
    { wch: 15 }, // Keahlian
    { wch: 20 }, // FGS/Struktural
    { wch: 15 }, // Transport
    { wch: 15 }, // Kehadiran
    { wch: 15 }, // Kopkar
    { wch: 15 }, // Bank Jabar
    { wch: 15 }, // Arisan
    { wch: 15 }, // BPJS TK
    { wch: 15 }, // BAUK
    { wch: 15 }, // Lain-lain
    { wch: 15 }, // PPH
  ];

  ws["!cols"] = colWidths;

  // Set header style
  const range = XLSX.utils.decode_range(ws["!ref"]);
  for (let C = range.s.c; C <= range.e.c; ++C) {
    const address = XLSX.utils.encode_col(C) + "1"; // Target the first row
    if (!ws[address]) continue;
    ws[address].s = {
      font: { bold: true },
      alignment: { horizontal: "center" },
      fill: { fgColor: { rgb: "FFFFAA00" } },
    };
  }

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "MasterData");
  XLSX.writeFile(wb, "HRIS_Master_Data_Export.xlsx");
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
  const url = `https://hris_backend.ulbi.ac.id/api/v2/dosenwali/delete?_id=${encodeURIComponent(
    id
  )}`;
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

document.getElementById("exportButton").addEventListener("click", function () {
    downloadExcel();
});

function downloadExcel() {
  const url = "https://hris_backend.ulbi.ac.id/api/v2/rpt/honor/tunjangandoktor ";
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function DeleteDoswal() {
  const url = "https://hris_backend.ulbi.ac.id/api/v2/dosenwali/deleteall";

  fetch(url, {
    method: "DELETE",
    headers: {
      login: token,
      "Content-Type": "application/json",
    }
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        Swal.fire({
          title: "success",
          text: "Honor berhasil Dihapus!",
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.value) {
            window.location.reload(true);
          }
        });
      } else {
        Swal.fire(
          "Failed",
          "Gagal menghapus Honor: " + data.message,
          "error"
        );
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      Swal.fire("Error", "Error: " + error.message, "error");
    });
}