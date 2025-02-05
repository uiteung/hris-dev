import { getLastMonth } from "../controller/control.js";
import { token } from "../controller/cookies.js";

const SECRET_KEY = "!uLBi123!"; // Pastikan kunci sama dengan yang digunakan untuk enkripsi

function decryptRole() {
  const encryptedRole = getCookieValue("hris-role");
  if (!encryptedRole) {
    console.error("No encrypted role found in cookies.");
    return null;
  }

  try {
    // Dekripsi nilai dari cookie
    const bytes = CryptoJS.AES.decrypt(encryptedRole, SECRET_KEY);
    const decryptedRole = bytes.toString(CryptoJS.enc.Utf8);

    // Kembalikan role yang didekripsi
    return decryptedRole;
  } catch (error) {
    console.error("Failed to decrypt role:", error);
    return null;
  }
}

// Fungsi untuk membaca cookie
function getCookieValue(cookieName) {
  const cookies = document.cookie.split("; ");
  const cookie = cookies.find((row) => row.startsWith(`${cookieName}=`));
  return cookie ? cookie.split("=")[1] : null;
}

// Dekripsi dan cetak hasilnya
const role = decryptRole();

const tableHeader = document.getElementById("headerTable");

if (role === "DTI" || role === "keuangan") {
  tableHeader.innerHTML = `
   <tr
                            style="text-align: center; vertical-align: middle"
                          >
                            <th
                              class="name-email-header"
                              style="background-color: #2b343d"
                            >
                              Nama
                            </th>
                            <!-- <th id="posisiTh">Jabatan</th> -->
                            <th id="statusTh">Gaji Pokok</th>
                            <th id="tanggalTh">Keluarga</th>
                            <th id="DurasiTh">Pangan</th>
                            <th id="pctDurasiTh">KPI</th>
                            <th id="keteranganTh">Keahlian</th>
                            <!-- <th id="linkDokumenTh">Struktural</th> -->

                            <th id="linkDokumenTh">FGS/Struktural</th>
                            <th id="linkDokumenTh">Transport</th>
                            <th id="linkDokumenTh">Kehadiran</th>
                            <th id="linkDokumenTh">Rapel Gaji</th>

                            <th id="linkDokumenTh">Kopkar</th>
                            <th id="linkDokumenTh">Bank Jabar</th>
                            <th id="linkDokumenTh">Arisan</th>
                            <th id="linkDokumenTh">BPJS TK</th>
                            <th id="linkDokumenTh">BAUK</th>
                            <th id="linkDokumenTh">Lain - lain</th>
                            <th id="linkDokumenTh">PPH</th>
                            <th id="linkDokumenTh">Total Gaji</th>
                            <th id="linkDokumenTh">Total Gaji Bersih</th>
                            <th id="linkDokumenTh">Total Gaji Potongan</th>
                            <th id="linkDokumenTh">Action</th>
                          </tr>`;
} else {
  tableHeader.innerHTML = `
   <tr
                            style="text-align: center; vertical-align: middle"
                          >
                            <th
                              class="name-email-header"
                              style="background-color: #2b343d"
                            >
                              Nama
                            </th>
                            <th id="linkDokumenTh">Total Gaji</th>
                            <th id="linkDokumenTh">Total Gaji Bersih</th>
                            <th id="linkDokumenTh">Total Gaji Potongan</th>
                            <th id="linkDokumenTh">Action</th>
                          </tr>
  `;
}

let allData = []; // Holds the current page data for filtering
let currentPage = 1; // Start from the first page
const baseUrlsearch = "https://hris_backend.ulbi.ac.id/api/v2/rkp/";
// const baseUrl =
//   "https://hris_backend.ulbi.ac.id/api/v2/rkp/raw/" + getLastMonth();
const baseUrl = "https://hris_backend.ulbi.ac.id/api/v2/rkp/histori";
// export let GetDataValidasi = "https://hris_backend.ulbi.ac.id/api/v2/rkp/raw/";
let currentKelompok = "";
document.addEventListener("DOMContentLoaded", () => {
  setupEventListeners();
  fetchDataFromHRIS(currentPage);
  populateDropdownWithMonths();
});

// function populateDropdownWithMonths() {
//   const dropdown = document.getElementById("filterKelompok");
//   const currentYear = new Date().getFullYear(); // Get the current year
//   dropdown.innerHTML = '<option value="">Silahkan Pilih Bulan</option>'; // Reset dropdown

//   // Create an option for each month of the current year
//   for (let month = 1; month <= 12; month++) {
//     const monthValue = month.toString().padStart(2, "0"); // Ensure the month is two digits
//     const optionValue = `${currentYear}${monthValue}`; // Format: YYYYMM
//     const option = document.createElement("option");
//     option.value = optionValue;
//     option.textContent = `${currentYear}-${monthValue}`; // Display as YYYY-MM
//     dropdown.appendChild(option);
//   }
// }

function populateDropdownWithMonths() {
  const dropdown = document.getElementById("filterKelompok");
  dropdown.innerHTML = '<option value="">Silahkan Pilih Bulan</option>'; // Reset dropdown

  const currentDate = new Date();

  // Iterasi mundur untuk mendapatkan 12 bulan terakhir
  for (let i = 0; i < 12; i++) {
    const pastDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - i,
      1
    );
    const year = pastDate.getFullYear();
    const month = (pastDate.getMonth() + 1).toString().padStart(2, "0"); // Pastikan dua digit

    const optionValue = `${year}${month}`; // Format: YYYYMM
    const option = document.createElement("option");
    option.value = optionValue;
    option.textContent = `${year}-${month}`; // Tampilan sebagai YYYY-MM
    dropdown.appendChild(option);
  }
}

function setupEventListeners() {
  document.getElementById("prevPageBtn").addEventListener("click", () => {
    if (currentPage > 1) {
      fetchDataFromHRIS(currentPage - 1);
    }
  });

  document.getElementById("nextPageBtn").addEventListener("click", () => {
    fetchDataFromHRIS(currentPage + 1);
  });
  // const searchButton = document.querySelector(".btn-primary");
  // const searchInput = document.getElementById("searchinput");

  // searchButton.addEventListener("click", (event) => {
  //   event.preventDefault();
  //   searchFromInput();
  // });

  // Listen for Enter key on the search input
  // searchInput.addEventListener("keypress", (event) => {
  //   if (event.keyCode === 13) {
  //     // 13 is the keycode for Enter
  //     event.preventDefault(); // Prevent form submission
  //     searchFromInput();
  //   }
  // });
  document
    .getElementById("filterKelompok")
    .addEventListener("change", filterTableByKelompok);
}
function searchFromInput() {
  // const searchInput = document
  //   .getElementById("searchinput")
  //   .value.trim()
  //   .replace(/\s+/g, "_");
  const waktu = document.getElementById("filterKelompok").value;

  // if (searchInput) {
  //   fetchDataFromSearch(searchInput, waktu);
  // } else {
  //   // Jika input pencarian kosong, kembali ke dataset awal
  // }
  fetchDataFromHRIS(1); // Asumsi ingin reset ke halaman pertama
}
function fetchDataFromSearch(searchKey, waktu) {
  let url;
  if (waktu) {
    url = `https://hris_backend.ulbi.ac.id/api/v2/rkp/histori/search?waktu=${waktu}&key=${searchKey}`;
  }

  // else {
  //   url = `https://hris_backend.ulbi.ac.id/api/v2/rkp/histori/search?key=${searchKey}`;
  // }

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
    // url =
    //   `https://hris_backend.ulbi.ac.id/api/v2/rkp/filter/${currentKelompok}?waktu ` +
    //   getLastMonth();
    url = `https://hris_backend.ulbi.ac.id/api/v2/rkp/raw/${currentKelompok}?page=${page}`;
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
    console.log("waktu " + item.waktu);
  });
}

function createRow(item) {
  const struk = item["fgs-struk"];
  const gajipokok = item["gaji-pokok"];

  if (role === "DTI" || role === "keuangan") {
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
          <td>${item.totalgajibersih}</td>        
          <td>${item.totalpotongan}</td>  
          <td>
          <button class="btn btn-info btn-sm edit-btn" data-waktu="${item.waktu}" data-email="${item.email}" onclick="printoutitem(this)">
              <i class="mdi mdi-cloud-print-outline"></i>
          </button>
          </td>    
      </tr>`;
  } else {
    return `<tr>
  
    <td class="name-email-cell">${item.nama} <br>${item.email}</td>
          <td>${item.totalgaji}</td>        
          <td>${item.totalgajibersih}</td>        
          <td>${item.totalpotongan}</td>  
          <td>
          <button class="btn btn-info btn-sm edit-btn" data-waktu="${item.waktu}" data-email="${item.email}" onclick="printoutitem(this)">
              <i class="mdi mdi-cloud-print-outline"></i>
          </button>
          </td>    
      </tr>`;
  }
}

window.printoutitem = function (element) {
  const email = element.getAttribute("data-email");
  const waktu = element.getAttribute("data-waktu");

  console.log(waktu);
  // Get the current date and calculate the previous month
  const now = new Date();
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const year = lastMonth.getFullYear();
  const month = (lastMonth.getMonth() + 1).toString().padStart(2, "0");
  const yearMonth = `${year}${month}`;

  // Construct the URL for the GET request
  const url = `https://hris_backend.ulbi.ac.id/api/v2/wage/pdf/${waktu}?email=${encodeURIComponent(
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
      a.download = `SlipGaji_${waktu}_${email}.pdf`;
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

// document
//   .getElementById("exportButton")
//   .addEventListener("click", exportToExcel);
