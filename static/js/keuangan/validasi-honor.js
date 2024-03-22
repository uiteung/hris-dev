// Import function & library yang dibutuhkan
import { CihuyId } from "https://c-craftjs.github.io/element/element.js";
import { CihuyDomReady } from "https://c-craftjs.github.io/table/table.js";
import { UrlDetailHonor, ValidasiHonor } from "../controller/template.js";

// Untuk Autentifikasi Login User Tertentu
import { token } from "../controller/cookies.js";
import { getLastMonth } from "../controller/control.js";
import { getBadgeMarkup } from "../style/badge.js";

var header = new Headers();
header.append("login", token);
header.append("Content-Type", "application/json");

const requestOptions = {
  method: "GET",
  headers: header
};
  
  // Call the function to get the last month
  const date = getLastMonth();
  
  // Print the last month
  console.log("Last Month:", date);


// Untuk Get All data Presensi
CihuyDomReady(() => {
//   const tablebody = CihuyId("tablebody");
  const buttonsebelumnya = CihuyId("prevPageBtn");
  const buttonselanjutnya = CihuyId("nextPageBtn");
  const halamansaatini = CihuyId("currentPage");
  const itemperpage =6;
  let halamannow = 1;
  let filteredData = []; // To store the filtered data for search
  let totalData = 0;
  // Ambil data masuk
  fetch(UrlDetailHonor  + date, requestOptions)
    .then((result) => result.json())
    .then((rekapharian) => {
        let rkp = rekapharian.data

        if (rkp.length === 0 ) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Data Honor Bulan Ini belum ada',
          });
        }

        console.log(rkp)

          // Inisialisasi data tabel
          totalData = rkp.length;
          filteredData = rkp;

          // Untuk Memunculkan Pagination Halamannya
          displayData(halamannow);
          updatePagination();

          // Button Pagination (Sebelumnya)
          buttonsebelumnya.addEventListener("click", () => {
            if (halamannow > 1) {
              halamannow--;
              displayData(halamannow);
              updatePagination();
            }
          });

          // Button Pagination (Selanjutnya)
          buttonselanjutnya.addEventListener("click", () => {
            const totalPages = Math.ceil(totalData / itemperpage);
            if (halamannow < totalPages) {
              halamannow++;
              displayData(halamannow);
              updatePagination();
            }
          })
        //   console.log(rekapharian)
    });

  // Fungsi Untuk Menampilkan Data
  function displayData(page) {
    const mulaiindex = (page - 1) * itemperpage;
    const akhirindex = mulaiindex + itemperpage;
    const rowsToShow = filteredData.slice(mulaiindex, akhirindex);;
    document.getElementById("tablebody").innerHTML = "";

    // Iterasi melalui rowsToShow dan membangun baris tabel
    rowsToShow.forEach((combinedEntry) => {

      // Ekstrak data yang relevan
      const nama = combinedEntry['nama'];
      const pph = combinedEntry['pph'];
      const totalhonor = combinedEntry['total-honor'];
      const totaldibayarkan = combinedEntry['total-dibayarkan'];
      const Validasi = combinedEntry['validasi'];
    //   console.log(struk)

      const barisBaru = document.createElement("tr");
        barisBaru.innerHTML= `
        <td>
            <div class="d-flex align-items-center">
                <div class="ms-3">
                    <p class="fw-bold mb-1">${nama}</p>
                </div>
            </div>
        </td>
        <td style="text-align: center; vertical-align: middle">
          <p class="fw-normal mb-1">${pph}</p>
        </td>
        <td style="text-align: center; vertical-align: middle">
          <p class="fw-normal mb-1"><b>${totalhonor}</b></p>
        </td>
        <td style="text-align: center; vertical-align: middle">
            <p class="fw-normal mb-1">${totaldibayarkan}</p>
        </td>
        <td style="text-align: center; vertical-align: middle">
            <p class="fw-normal mb-1">${getBadgeMarkup(Validasi)}</p>
        </td>
        <td style="text-align: center; vertical-align: middle">
        <a href="#" class="edit" data-email-id="${nama}">
        <svg class="feather feather-check" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
        <polyline points="20 6 9 17 4 12"/>
        </svg>
        </a>
        <a href="#" class="remove" data-email-i="${nama}">
        <svg class="feather feather-x" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
        <line x1="18" x2="6" y1="6" y2="18"/>
        <line x1="6" x2="18" y1="6" y2="18"/>
      </svg>
      </a>
        <a href="#" class="update" data-email-u="${nama}">
          <svg class="feather feather-edit" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg
        </a>
        </td>
      `;


      document.getElementById("tablebody").appendChild(barisBaru);
  });
    updatePagination();

  }


  // Fungsi Untuk Update Pagination
  function updatePagination() {
    halamansaatini.textContent = `Halaman ${halamannow}`;
  }
});