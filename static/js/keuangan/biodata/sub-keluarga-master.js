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
  // document
  //   .getElementById("filterKelompok")
  //   .addEventListener("change", filterTableByKelompok);
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
  const url = `https://hris_backend.ulbi.ac.id/api/v2/master/bio/search?key=${searchKey}`;

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
      if (!data.data.data_query || data.data === 0) {
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
    url = `https://hris_backend.ulbi.ac.id/api/v2/master/bio/filter/${currentKelompok}?page=${page}`;
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
      if (!data.data || data.data === 0) {
        Swal.fire("Informasi", "Tidak ada data lebih lanjut.", "info");
        return;
      }
      allData = data.data;
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
  if (!item || Object.keys(item).length === 0) {
    return `<tr><td colspan="10">No data available</td></tr>`;
  }
  const struk = item["fgs-struk"];
  return `<tr>
    <td class="name-email-cell">${item.jenis} </td>
    <td>${item.nominal || "Tidak Tersedia"}</td>
    <td>${item.persentase || "Tidak Tersedia"}</td>
   
    <td>
            <button class="btn btn-primary btn-sm edit-btn" data-id="${
              item.id
            }" data-id="${item._id}" onclick="editItem(this)">
                    <i class="mdi mdi-table-edit"></i>
            </button>
            <button class="btn btn-danger btn-sm delete-btn" data-id="${
              item.id
            }" data-id="${item._id}" onclick="deleteItem(this)">
                    <i class="mdi mdi-delete"></i>
            </button>
    </td>  
</tr>`;
}
window.editItem = function (element) {
  const email = element.getAttribute("data-id");
  localStorage.setItem("editingEmail", email);
  window.location.href = "tunjangan-edit.html";
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
  const url = `https://hris_backend.ulbi.ac.id/api/v2/master/biodata?page=${page}`;
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

// document
//   .getElementById("exportButton")
//   .addEventListener("click", exportToExcel);

// document.addEventListener("DOMContentLoaded", () => {
//   const generateButton = document.getElementById("generateButton");
//   generateButton.addEventListener("click", () => {
//     Swal.fire({
//       title: "Sebelum Anda Menggenerate Gaji Pastikan Kembali",
//       text: "Apakah Mata Master Sudah Valid?",
//       icon: "question",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Ya, generate!",
//       cancelButtonText: "Batal",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         generateGaji();
//       }
//     });
//   });
// });

// function generateGaji() {
//   const url = "https://hris_backend.ulbi.ac.id/api/v2/wagemst/generate";

//   fetch(url, {
//     method: "POST",
//     headers: {
//       login: token,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({}),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       if (data.success) {
//         Swal.fire({
//           title: "Success",
//           text: "Gaji berhasil digenerate!",
//           icon: "success",
//           confirmButtonText: "OK",
//         }).then((result) => {
//           if (result.value) {
//             window.location.reload(true);
//           }
//         });
//       } else {
//         Swal.fire(
//           "Failed",
//           "Gagal menggenerate gaji: " + data.message,
//           "error"
//         );
//       }
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//       Swal.fire("Error", "Error: " + error.message, "error");
//     });
// }
window.deleteItem = function (element) {
  const _id = element.getAttribute("data-id"); // Mengambil email dari attribute

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
      sendDeleteRequest(_id); // Melakukan request penghapusan
    }
  });
};
function sendDeleteRequest(_id) {
  const url = `https://hris_backend.ulbi.ac.id/api/v2/master/komponenkeluarga/delete?_id=${_id}`;
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

function postData() {
  const url =
    "https://hris_backend.ulbi.ac.id/api/v2/master/komponenkeluarga/insert";

  const jenis = document.getElementById("jenis");
  const nominal = parseFloat(document.getElementById("nominal"));
  const persentase = parseFloat(document.getElementById("persentase"));

  const data = {
    jenis: jenis,
    nominal: nominal,
    persentase: persentase,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      login: token,
    },
    body: JSON.stringify(data),
  };
  Swal.fire({
    title: "Anda Yakin?",
    text: "Kamu ingin mengirim data!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, submit it!",
  }).then((result) => {
    if (result.isConfirmed) {
      // Only proceed with fetch if user confirms
      fetch(url, options)
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          Swal.fire("Submitted!", "Your data has been submitted.", "success");
        })
        .catch((error) => {
          console.error("Error:", error);
          Swal.fire(
            "Failed!",
            "There was an issue submitting your data.",
            "error"
          );
        });
    }
  });
}

document.getElementById("updatebutton").addEventListener("click", postData);
