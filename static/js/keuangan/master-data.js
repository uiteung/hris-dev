import { token } from "../controller/cookies.js";
let allRecords = [];
let allData = []; // Holds the current page data for filtering
let currentPage = 1; // Start from the first page
const baseUrl = "https://hris_backend.ulbi.ac.id/api/v2/wagemst/masterall";
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
    fetchDataFromHRIS(1); // Assuming you want to reset to the first page
  }
}

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
    <td>${item.pokok}</td>
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
    <td>
        <button class="btn btn-primary btn-sm edit-btn" data-id="${item.id}" data-email="${item.email}" onclick="editItem(this)">
            <i class="mdi mdi-table-edit"></i>
        </button>
         <button class="btn btn-info btn-sm edit-btn" data-id="${item.id}" data-email="${item.email}" onclick="printoutitem(this)">
            <i class="mdi mdi-cloud-print-outline"></i>
        </button>
        <button class="btn btn-danger btn-sm delete-btn" data-id="${item.id}" data-email="${item.email}" onclick="deleteItem(this)">
            <i class="mdi mdi-delete"></i>
        </button>
    </td>  
</tr>`;
}
window.editItem = function (element) {
  const email = element.getAttribute("data-email");
  localStorage.setItem("editingEmail", email);
  window.location.href = "master-data-edit.html";
};
window.printoutitem = function (element) {
  const email = element.getAttribute("data-email");

  // Get the current date and calculate the previous month
  const now = new Date();
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const year = lastMonth.getFullYear();
  const month = (lastMonth.getMonth() + 1).toString().padStart(2, "0");
  const yearMonth = `${year}${month}`;

  // Construct the URL for the GET request
  const url = `https://hris_backend.ulbi.ac.id/api/v2/wage/pdf/${yearMonth}?email=${encodeURIComponent(
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
      a.download = `SlipGaji_${yearMonth}_${email}.pdf`;
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

function getExportUrl() {
  const kelompok = document.getElementById("filterKelompok").value;
  let url;

  switch (kelompok) {
    case "Struktural":
      url = "https://hris_backend.ulbi.ac.id/api/v2/rpt/Struktural";
      break;
    case "Staff ADM":
      url = "https://hris_backend.ulbi.ac.id/api/v2/rpt/pegawai/Staff_ADM";
      break;
    case "TKK":
      url = "https://hris_backend.ulbi.ac.id/api/v2/rpt/pegawai/TKK";
      break;
    case "Dosen Tetap":
      url = "https://hris_backend.ulbi.ac.id/api/v2/rpt/dosen/Dosen_Tetap";
      break;
    case "Dosen Kontrak":
      url = "https://hris_backend.ulbi.ac.id/api/v2/rpt/dosen/Dosen_Kontrak";
      break;
    case "Tenaga Lepas":
      url = "https://hris_backend.ulbi.ac.id/api/v2/rpt/tenagalepas";
      break;
    default:
      url = "https://hris_backend.ulbi.ac.id/api/v2/wagemst/masterall";
  }

  return url;
}

function downloadExcel() {
  const url = getExportUrl();
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

document.getElementById("exportButton").addEventListener("click", function () {
  const kelompok = document.getElementById("filterKelompok").value;
  if (kelompok === "" || kelompok === "default") {
    // If no specific group is selected or default is to use authenticated request
    exportToExcel();
  } else {
    // If a specific group is selected and direct download is applicable
    downloadExcel();
  }
});
function exportToExcel() {
  allRecords = [];
  fetchAllPages(1);
}
function fetchAllPages(page) {
  const baseUrl = getExportUrl(); // Get the correct URL based on the dropdown selection
  const url = `${baseUrl}?page=${page}`;
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
        if (allRecords.length > 0) {
          generateExcel(allRecords); // Generate the Excel file if there are records
        } else {
          Swal.fire("Informasi", "No data to download.", "info"); // Inform user if no data
        }
        return;
      }
      allRecords = allRecords.concat(data.data.data_query);
      if (data.data.next_page_url) {
        fetchAllPages(page + 1);
      } else {
        generateExcel(allRecords); // Generate the Excel file once all data is fetched
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      Swal.fire("Error", "Error fetching data: " + error.message, "error");
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

document.addEventListener("DOMContentLoaded", () => {
  const generateButton = document.getElementById("generateButton");
  generateButton.addEventListener("click", () => {
    Swal.fire({
      title: "Sebelum Anda Menggenerate Gaji Pastikan Kembali",
      text: "Apakah Mata Master Sudah Valid?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, generate!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        generateGaji();
      }
    });
  });
});

function generateGaji() {
  const url = "https://hris_backend.ulbi.ac.id/api/v2/wagemst/generate";

  fetch(url, {
    method: "POST",
    headers: {
      login: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        Swal.fire({
          title: "Success",
          text: "Gaji berhasil digenerate!",
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
          "Gagal menggenerate gaji: " + data.message,
          "error"
        );
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      Swal.fire("Error", "Error: " + error.message, "error");
    });
}
window.deleteItem = function (element) {
  const email = element.getAttribute("data-email"); // Mengambil email dari attribute

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
      sendDeleteRequest(email); // Melakukan request penghapusan
    }
  });
};
function sendDeleteRequest(email) {
  const url = `https://hris_backend.ulbi.ac.id/api/v2/wagemst/delete?email=${encodeURIComponent(
    email
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
