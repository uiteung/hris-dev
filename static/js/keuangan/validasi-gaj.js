// Import function & library yang dibutuhkan
import { CihuyId } from "https://c-craftjs.github.io/element/element.js";
import { CihuyDomReady } from "https://c-craftjs.github.io/table/table.js";
import { getBadgeMarkup } from "../style/badge.js";
import { GetDataValidasi} from "../controller/template.js";

// Untuk Autentifikasi Login User Tertentu
import { token } from "../controller/cookies.js";

var header = new Headers();
header.append("login", token);
header.append("Content-Type", "application/json");

const requestOptions = {
  method: "GET",
  headers: header
};


function getLastMonth() {
    // Get the current date
    const currentTime = new Date();
  
    // Subtract one month from the current date
    currentTime.setMonth(currentTime.getMonth() - 1);
  
    // Format the date as "YYYYMM"
    const year = currentTime.getFullYear();
    const month = (currentTime.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so add 1
    const formattedDate = `${year}${month}`;
  
    return formattedDate;
  }
  
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
  fetch(GetDataValidasi  + getLastMonth(), requestOptions)
    .then((result) => result.json())
    .then((rekapharian) => {
        let rkp = rekapharian.data

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
          console.log(rekapharian)
    });

  // Fungsi Untuk Menampilkan Data
  function displayData(page) {
    const mulaiindex = (page - 1) * itemperpage;
    const akhirindex = mulaiindex + itemperpage;
    const rowsToShow = filteredData.slice(mulaiindex, akhirindex);

    let tableData = "";

    // Iterasi melalui rowsToShow dan membangun baris tabel
    rowsToShow.forEach((combinedEntry) => {

      // Ekstrak data yang relevan
      const nama = combinedEntry.nama;
      const email = combinedEntry.email;
      const waktu = date;
      const pokok = combinedEntry['gaji-pokok'];
      const keluarga = combinedEntry['keluarga'];
      const pangan = combinedEntry['pangan'];
      const kinerja = combinedEntry['kinerja'];
      const keahlian = combinedEntry['keahlian'];
      const struk = combinedEntry['struk'];
      const transportasi = combinedEntry['transportasi'];
      const kehadiran = combinedEntry['kehadiran'];
      const kopkar = combinedEntry['kopkar'];
      const bankJabar = combinedEntry['bankJabar'];
      const bpjs = combinedEntry['bpjs'];
      const bauk = combinedEntry['bauk'];
      const pph = combinedEntry['pph'];
      const lain2 = combinedEntry['lain2'];
      const arisan = combinedEntry['arisan'];
      const totalgaji = combinedEntry['totalgaji'];
      const totalgajibersih = combinedEntry['totalgajibersih'];
      const totalpotongan = combinedEntry['totalpotongan'];
      const statusvalidasi = combinedEntry['validasi'];
      console.log(struk)

      tableData += `
          <tr>
              <td>
                  <div class="d-flex align-items-center">
                      <div class="ms-3">
                          <p class="fw-bold mb-1">${nama}</p>
                          <p class="text-muted mb-0">${email}</p>
                      </div>
                  </div>
              </td>
              <td style="text-align: center; vertical-align: middle">
                <p class="fw-normal mb-1">${waktu}</p>
              </td>
              <td style="text-align: center; vertical-align: middle">
                <p class="fw-normal mb-1"><b>${pokok}</b></p>
              </td>
              <td style="text-align: center; vertical-align: middle">
                  <p class="fw-normal mb-1">${keluarga}</p>
              </td>
              <td style="text-align: center; vertical-align: middle">
                  <p class="fw-normal mb-1">${pangan}</p>
              </td>
              <td style="text-align: center; vertical-align: middle">
                <p class="fw-normal mb-1">${kinerja}</p>
              </td>
              <td style="text-align: center; vertical-align: middle">
                <p class="fw-normal mb-1">${keahlian}</p>
              </td>
              <td style="text-align: center; vertical-align: middle">
                <p class="fw-normal mb-1"><b>${struk}</b></p>
              </td>
              <td style="text-align: center; vertical-align: middle">
              <p class="fw-normal mb-1">${transportasi}</p>
              </td>
                <td style="text-align: center; vertical-align: middle">
                <p class="fw-normal mb-1">${kehadiran}</p>
                </td>
                <td style="text-align: center; vertical-align: middle">
                <p class="fw-normal mb-1">${kopkar}</p>
                </td>
                <td style="text-align: center; vertical-align: middle">
                <p class="fw-normal mb-1">${bankJabar}</p>
                </td>
                <td style="text-align: center; vertical-align: middle">
                <p class="fw-normal mb-1">${arisan}</p>
                </td>
                <td style="text-align: center; vertical-align: middle">
                <p class="fw-normal mb-1">${bpjs}</p>
                </td>
                <td style="text-align: center; vertical-align: middle">
                <p class="fw-normal mb-1">${bauk}</p>
                </td>
                <td style="text-align: center; vertical-align: middle">
                <p class="fw-normal mb-1">${lain2}</p>
                </td>
                <td style="text-align: center; vertical-align: middle">
                <p class="fw-normal mb-1">${pph}</p>
                </td>
                <td style="text-align: center; vertical-align: middle">
                <p class="fw-normal mb-1">${totalgaji}</p>
                </td>
                <td style="text-align: center; vertical-align: middle">
                <p class="fw-normal mb-1">${totalpotongan}</p>
                </td>
                <td style="text-align: center; vertical-align: middle">
                <p class="fw-normal mb-1">${totalgajibersih}</p>
                </td>
                <td style="text-align: center; vertical-align: middle">
                <p class="fw-normal mb-1">${getBadgeMarkup(statusvalidasi)}</p>
                </td>
                <td style="text-align: center; vertical-align: middle">
                <p class="fw-normal mb-1">
                <button type="button" class="btn btn-success">Validasi</button>
                </p>
                </td>
          </tr>
      `;
    });

    document.getElementById("tablebody").innerHTML = tableData;
  }

  // Fungsi Untuk Update Pagination
  function updatePagination() {
    halamansaatini.textContent = `Halaman ${halamannow}`;
  }
});